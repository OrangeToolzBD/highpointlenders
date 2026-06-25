#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# build-upload-s3.sh — BUILD the site and publish it into a directory (prefix) of
# an R2 bucket using R2's S3-COMPATIBLE API (no wrangler). The prefix is made to
# EXACTLY MATCH the new build:
#   • changed files  → overwritten
#   • new files      → added
#   • removed files  → deleted (no stale leftovers)
#
# Unlike the wrangler version, the S3 API can LIST objects, so `aws s3 sync
# --delete` handles upload + stale-cleanup natively — no manifest object needed.
#
# Scope — this script ONLY touches R2 objects under the chosen prefix. It does NOT:
#   • deploy/update any Worker   • change routes   • touch DNS   • create/delete buckets
#
# Auth — uses R2 S3 API credentials (NOT wrangler login). Create them at
# Cloudflare dashboard → R2 → Manage API Tokens → Create API Token (Object Read
# & Write), then put them in .deploy.env:
#   R2_ACCESS_KEY_ID=...
#   R2_SECRET_ACCESS_KEY=...
#   CF_ACCOUNT_ID=...           # used to build the S3 endpoint
#
# Usage:
#   ./build-upload-s3.sh                          # interactive prompts
#   ./build-upload-s3.sh <bucket> <dir>           # prompts only for site URL
#   ./build-upload-s3.sh <bucket> <dir> <siteUrl> # fully non-interactive
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail
cd "$(dirname "$0")"
export PATH="$HOME/.bun/bin:$PATH"

BUCKET="${1:-}"
PREFIX="${2:-}"
SITE_ARG="${3:-}"

# Defaults for VITE_SITE_URL / VITE_INDEXABLE and R2 creds come from .deploy.env.
[ -f .deploy.env ] && { set -a; source .deploy.env; set +a; }

# ── Inputs ──────────────────────────────────────────────────────────────────
[ -z "$BUCKET" ] && read -rp "R2 bucket name: " BUCKET
[ -z "$PREFIX" ] && read -rp "Directory (prefix) in bucket: " PREFIX
: "${BUCKET:?bucket name required}"
: "${PREFIX:?directory (prefix) required}"
PREFIX="${PREFIX#/}"; PREFIX="${PREFIX%/}"   # strip leading/trailing slashes

DEF_URL="${VITE_SITE_URL:-}"
if [ -n "$SITE_ARG" ]; then
  VITE_SITE_URL="$SITE_ARG"
else
  read -rp "VITE_SITE_URL [${DEF_URL}]: " IN
  VITE_SITE_URL="${IN:-$DEF_URL}"
fi
export VITE_SITE_URL
echo "Baking VITE_SITE_URL=${VITE_SITE_URL:-<unset>}  VITE_INDEXABLE=${VITE_INDEXABLE:-<unset>}"

# ── Preflight: aws CLI + credentials ─────────────────────────────────────────
command -v aws >/dev/null 2>&1 || { echo "✗ aws CLI not found. Install it: brew install awscli"; exit 1; }

: "${CF_ACCOUNT_ID:?CF_ACCOUNT_ID required — set it in .deploy.env}"
: "${R2_ACCESS_KEY_ID:?R2_ACCESS_KEY_ID required — set it in .deploy.env (R2 → Manage API Tokens)}"
: "${R2_SECRET_ACCESS_KEY:?R2_SECRET_ACCESS_KEY required — set it in .deploy.env (R2 → Manage API Tokens)}"

# Map R2 S3 credentials into the env the aws CLI expects.
export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"
export AWS_DEFAULT_REGION=auto
# aws-cli v2.23+ sends CRC32 checksums by default, which R2 may reject — only
# send/validate checksums when the operation actually requires them.
export AWS_REQUEST_CHECKSUM_CALCULATION=when_required
export AWS_RESPONSE_CHECKSUM_VALIDATION=when_required

ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"
aws() { command aws "$@" --endpoint-url "$ENDPOINT"; }

echo "▶ Target account id: ${CF_ACCOUNT_ID}"
echo "▶ S3 endpoint: ${ENDPOINT}"

# ── Read-only guard: bucket must already exist (we never create it) ──────────
if ! aws s3api head-bucket --bucket "$BUCKET" >/dev/null 2>&1; then
  echo "✗ bucket '$BUCKET' not reachable in account ${CF_ACCOUNT_ID}."
  echo "  • Wrong account? Check CF_ACCOUNT_ID in .deploy.env."
  echo "  • Bad credentials? Check R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY (Object Read & Write)."
  echo "  • Missing bucket? Create it in the dashboard (R2 → Create bucket)."
  exit 1
fi

# ── Build ────────────────────────────────────────────────────────────────────
echo "▶ Building…"
rm -rf dist
bun run build
OUT=dist/client
test -f "$OUT/index.html" || { echo "✗ build failed (no $OUT/index.html)"; exit 1; }
HTML=$(find "$OUT" -name '*.html' | wc -l | tr -d ' ')
FILES=$(find "$OUT" -type f | wc -l | tr -d ' ')
echo "▶ Built $HTML HTML pages ($FILES total files)"

# ── Confirm ──────────────────────────────────────────────────────────────────
if [ "${CI:-}" = "true" ] || [ "${ASSUME_YES:-}" = "1" ]; then
  ok=y
else
  read -rp "Proceed? [y/N] " ok
fi
[ "$ok" = y ] || [ "$ok" = Y ] || { echo "aborted"; exit 1; }

# ── Sync (uploads new/changed, deletes stale; Content-Type auto-detected) ────
echo "▶ Syncing…"
aws s3 sync "$OUT/" "s3://$BUCKET/$PREFIX/" --delete --no-progress

echo "✓ Published to s3://$BUCKET/$PREFIX/  (prefix now matches the build; no Worker/DNS changed)"
