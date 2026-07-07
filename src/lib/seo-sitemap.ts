import { INDEXABLE, absoluteUrl } from "./site-config";
import { INDUSTRIES } from "./industries-data";
import { PILLARS, TOP_MONEY_PILLARS } from "./pillars-data";
import { SUBURBS } from "./suburbs-data";

// Date each URL was last generated. Bump when page content is regenerated.
const LASTMOD = "2026-07-07";
const CHANGEFREQ = "monthly";

function collectUrls(): string[] {
  const staticPaths = ["/", "/contact", "/apply-now", "/austin"];
  const industryPaths = INDUSTRIES.map((i) => `/industry/${i.slug}`);
  const pillarPaths = PILLARS.map((p) => `/pillar/${p.slug}`);
  const suburbPaths = SUBURBS.map((s) => `/austin/${s.slug}`);
  // Suburb x pillar SEO pages: 10 suburbs * 8 top money pillars = 80 pages.
  const suburbPillarPaths = SUBURBS.flatMap((s) =>
    TOP_MONEY_PILLARS.map((p) => `/austin/${s.slug}/${p.slug}`),
  );

  return [
    ...staticPaths,
    ...industryPaths,
    ...pillarPaths,
    ...suburbPaths,
    ...suburbPillarPaths,
  ].map(absoluteUrl);
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(): string {
  const urls = collectUrls();
  const body = urls
    .map(
      (u) =>
        `  <url><loc>${escapeXml(u)}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${CHANGEFREQ}</changefreq></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function sitemapXmlResponse(): Response {
  if (!INDEXABLE) {
    return new Response("", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(buildSitemapXml(), {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
