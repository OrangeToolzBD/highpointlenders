import { INDEXABLE, absoluteUrl } from "./site-config";
import { INDUSTRIES } from "./industries-data";
import { PILLARS, TOP_MONEY_PILLARS } from "./pillars-data";
import { SUBURBS } from "./suburbs-data";

// Last-generated date for every URL; resolves to the build/deploy date.
const LASTMOD = new Date().toISOString().slice(0, 10);

const CITY = "austin";

function collectUrls(): string[] {
  const staticPaths = ["/", "/contact", "/apply-now", `/${CITY}`];
  const industryPaths = INDUSTRIES.map((i) => `/industry/${i.slug}`);
  const pillarPaths = PILLARS.map((p) => `/pillar/${p.slug}`);
  const suburbPaths = SUBURBS.map((s) => `/${CITY}/${s.slug}`);
  // Suburb x top-money-pillar SEO pages.
  const suburbPillarPaths = SUBURBS.flatMap((s) =>
    TOP_MONEY_PILLARS.map((p) => `/${CITY}/${s.slug}/${p.slug}`),
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
        `  <url><loc>${escapeXml(u)}</loc><lastmod>${LASTMOD}</lastmod></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export function sitemapXmlResponse(): Response {
  // Always return 200 so the TanStack Start prerender step never fails. When
  // the site is not indexable, emit an empty (but valid) urlset so no URLs
  // leak into the build - robots.txt disallows crawling under the same flag.
  const body = INDEXABLE
    ? buildSitemapXml()
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}