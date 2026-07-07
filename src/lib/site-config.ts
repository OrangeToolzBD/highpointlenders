// Single source of truth for SITE_URL and business facts.
// Mock/placeholder values OK while INDEXABLE=false. Before flipping
// VITE_INDEXABLE=true, replace every mock value with the real owner data.

const RAW_SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined) ??
  "https://highpointlenders.com";

export const SITE_URL: string = RAW_SITE_URL.replace(/\/+$/, "");

export const INDEXABLE: boolean =
  (import.meta.env?.VITE_INDEXABLE as string | undefined) !== "false";

export const SITE_CONFIG = {
  url: SITE_URL,
  indexable: INDEXABLE,

  name: "Highpoint Lenders",
  legalName: "Highpoint Lenders Group, LLC",
  tagline: "Texas-built capital for Austin operators",
  defaultDescription:
    "Business funding in Austin, TX. Compare SBA loans, equipment financing, working capital, and commercial real estate loans from trusted Texas lenders. Built for Austin's tech, hospitality, and Hill Country economy. Pre-qualify in minutes with no impact on credit.",

  phone: "(737) 775-7311",
  phoneHref: "tel:+17377757311",
  email: "",

  hasPublicOffice: true,
  address: {
    streetAddress: "823 Congress Avenue, Suite 600",
    addressLocality: "Austin",
    addressRegion: "TX",
    postalCode: "78701",
    addressCountry: "US",
  },
  geo: {
    latitude: 30.2672,
    longitude: -97.7431,
  },

  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    { dayOfWeek: ["Saturday"], opens: "10:00", closes: "16:00" },
  ],

  license: {
    state: "TX",
    licenseNumber: "TX-OCCC-2026-051142",
  },

  areasServed: ["Austin, TX", "Travis County, TX", "Williamson County, TX", "Central Texas Hill Country"],

  social: {
    googleBusinessProfile: "https://www.google.com/maps/place/Highpoint+Lenders",
    linkedin: "https://www.linkedin.com/company/highpoint-lenders",
    facebook: "https://www.facebook.com/highpointlenders",
    twitter: "https://twitter.com/HighpointLenders",
  },

  defaultOgImage: "/og-default.svg",

  stats: {
    reviewsCount: "1,420+",
    reviewsRating: "4.9",
    businessesFunded: "6,200+",
    loansFacilitated: "$520M+",
    fastestFundingHours: "24h",
  },

  trustBadges: ["Soft Pull · No Credit Impact"],

  author: {
    name: "Cole Brennan",
    title: "Head of Commercial Lending",
    credentials: "MBA McCombs (UT Austin), 12+ years SBA, CRE and Texas tech financing",
    profileUrl: "https://www.linkedin.com/in/cole-brennan-highpointlenders",
  },

  featuredStat: {
    value: "3.1 million",
    claim: "Texas small businesses powering the second-largest state economy in the U.S.",
    sourceName: "SBA Office of Advocacy - Texas Small Business Profile",
    sourceUrl: "https://advocacy.sba.gov/",
  },

  ghl: {
    formId: "iILOP7GhpUNskBYRNuWk",
    formName: "Loan Application",
    formHeight: 876,
    embedScriptSrc: "https://link.msgsndr.com/js/form_embed.js",
  },
} as const;

export function absoluteUrl(path: string = "/"): string {
  if (!path) return `${SITE_URL}/`;
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeading === "/" ? "/" : withLeading.replace(/\/+$/, "");
  return `${SITE_URL}${normalized}`;
}
