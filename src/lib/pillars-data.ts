// Highpoint Lenders - SEO pillar pages for Austin, TX.
// 18 Money Pillars + 20 Vertical Pillars = 38 total.

export type PillarKind = "money" | "vertical";

export type Pillar = {
  slug: string;
  title: string;
  kind: PillarKind;
  tagline: string;
  description: string;
  bullets: string[];
  highlight: string;
  /** Approximate national monthly search volume - used for SEO ordering. */
  volume?: number;
};

export const MONEY_PILLARS: Pillar[] = [
  {
    slug: "sba-loans",
    title: "SBA Loans",
    kind: "money",
    tagline: "Government-backed funding for Austin businesses",
    description:
      "SBA 7(a) and 504 loans offer some of the lowest rates and longest terms available to Austin small businesses, backed by the U.S. Small Business Administration through a network of SBA Preferred lenders active across Central Texas.",
    bullets: ["Up to $5,000,000", "Terms up to 25 years on real estate", "10% down typical on acquisitions"],
    highlight: "From 8.5% APR",
    volume: 500000,
  },
  {
    slug: "business-line-of-credit",
    title: "Business Line of Credit",
    kind: "money",
    tagline: "Revolving credit, draw funds when you need them",
    description:
      "Keep capital ready for inventory builds, payroll cycles, and SXSW or ACL revenue spikes. Only pay interest on what you draw.",
    bullets: ["Lines from $25K-$500K", "Same-day draws", "Soft-pull pre-qualification"],
    highlight: "From 9.9% APR",
    volume: 50000,
  },
  {
    slug: "working-capital-loans",
    title: "Working Capital Loans",
    kind: "money",
    tagline: "Cover payroll, inventory and seasonal gaps",
    description:
      "Operating capital sized to your monthly revenue and bridged to your real cash cycle - built for Austin restaurants, music venues, tech services and Hill Country hospitality.",
    bullets: ["$10K-$2M", "Daily, weekly or monthly payments", "No collateral options"],
    highlight: "Funded in 24 hrs",
    volume: 50000,
  },
  {
    slug: "short-term-business-loans",
    title: "Short Term Business Loans",
    kind: "money",
    tagline: "Fast funding with 3-24 month terms",
    description:
      "Bridge a slow stretch, fund a marketing push around SXSW, or jump on a purchase order with short-term loans built around predictable fixed payments.",
    bullets: ["3-24 month terms", "Funded same week", "No prepayment penalty"],
    highlight: "$10K-$1M",
    volume: 50000,
  },
  {
    slug: "sba-7a-loan",
    title: "SBA 7(a) Loan",
    kind: "money",
    tagline: "The SBA's flagship working capital program",
    description:
      "Austin's most popular SBA program - flexible use of proceeds for working capital, equipment, acquisition or refinance across Downtown, the Domain, Westlake and the broader Central Texas market.",
    bullets: ["Up to $5M", "Up to 10-year working capital terms", "Real estate up to 25 years"],
    highlight: "From 8.5% APR",
    volume: 50000,
  },
  {
    slug: "small-business-loans",
    title: "Small Business Loans",
    kind: "money",
    tagline: "Funding tailored to Austin small businesses",
    description:
      "Compare every major small business loan product - term loans, lines of credit, SBA, equipment, factoring and more - through a single soft-pull application sized for Texas operators.",
    bullets: ["$5K-$5M", "75+ lender network", "Soft credit pull only"],
    highlight: "Funded in 24 hrs",
  },
  {
    slug: "merchant-cash-advance",
    title: "Merchant Cash Advance",
    kind: "money",
    tagline: "Capital based on future card sales",
    description:
      "An advance against your future card and platform revenue, funded quickly and repaid as a small percentage of daily sales. Useful around festival spikes when card volume is verifiable.",
    bullets: ["24-hour funding", "Bad credit considered", "No fixed payments"],
    highlight: "$10K-$1M",
  },
  {
    slug: "unsecured-business-loans",
    title: "Unsecured Business Loans",
    kind: "money",
    tagline: "No collateral required",
    description:
      "Cash-flow underwritten loans with no UCC blanket lien or hard collateral - for established Austin services firms, SaaS operators and asset-light professional practices.",
    bullets: ["Up to $500K", "Terms 1-5 years", "Funded in 1-3 days"],
    highlight: "Soft pull pre-qual",
  },
  {
    slug: "startup-business-loans",
    title: "Startup Business Loans",
    kind: "money",
    tagline: "Funding for new Austin ventures",
    description:
      "Capital for businesses as young as 3 months, including SBA microloans and revenue-friendly products for early-stage operators in Austin's tech, hospitality and creative economy.",
    bullets: ["From 3 months in business", "SBA microloan options", "Personal credit-based options"],
    highlight: "$5K-$250K",
  },
  {
    slug: "business-acquisition-loans",
    title: "Business Acquisition Loans",
    kind: "money",
    tagline: "Buy an existing Austin business",
    description:
      "SBA-backed acquisition financing for partner buyouts, succession purchases, and bolt-on deals across Travis and Williamson counties - particularly active in suburban professional services, hospitality and trades.",
    bullets: ["10% down with SBA 7(a)", "Goodwill financing", "Earn-out friendly"],
    highlight: "Up to $5M",
  },
  {
    slug: "accounts-receivable-financing",
    title: "Accounts Receivable Financing",
    kind: "money",
    tagline: "Borrow against open A/R",
    description:
      "A revolving facility secured by your receivables - perfect for SH-130 corridor freight forwarders, Domain B2B SaaS, staffing firms and creative agencies with consistent invoice volume.",
    bullets: ["Up to 90% AR advance", "Lines $250K-$20M", "Reporting-friendly"],
    highlight: "Revolving",
  },
  {
    slug: "invoice-factoring",
    title: "Invoice Factoring",
    kind: "money",
    tagline: "Turn outstanding invoices into cash today",
    description:
      "Sell your invoices for immediate liquidity. Non-recourse and recourse options popular among Central Texas trucking, freight-forwarding and Samsung/Tesla supplier-chain operators.",
    bullets: ["Advance rates up to 95%", "Non-recourse available", "24-hour funding"],
    highlight: "Same-day cash",
  },
  {
    slug: "revenue-based-financing",
    title: "Revenue Based Financing",
    kind: "money",
    tagline: "Repay as a % of monthly revenue",
    description:
      "Non-dilutive capital priced as a fixed multiple and repaid as a percentage of monthly revenue. Fits East Austin SaaS, Domain ecommerce brands and creative agencies. No equity, no fixed installments.",
    bullets: ["$50K-$5M", "No equity dilution", "Flexible repayment"],
    highlight: "Pay as you earn",
  },
];

export const VERTICAL_PILLARS: Pillar[] = [
  {
    slug: "auto-repair-shop-financing",
    title: "Auto Repair Shop Financing",
    kind: "vertical",
    tagline: "Bays, lifts and diagnostics",
    description:
      "Equipment and real estate financing for independent shops, collision centers and quick-lube operators across Travis, Williamson and Hays counties.",
    bullets: ["Lifts, alignment & ADAS", "Real estate purchase", "Up to 7-year terms"],
    highlight: "Rates from 7.5%",
    volume: 500000,
  },
  {
    slug: "farm-credit-financing",
    title: "Farm Credit Financing",
    kind: "vertical",
    tagline: "Operating lines for Hill Country agriculture",
    description:
      "Seasonal-friendly operating lines and equipment financing for Central Texas ranchers, vineyard operators in the Hill Country, peach orchards, and Texas specialty ag.",
    bullets: ["Seasonal payment options", "New & used equipment", "Trade-in friendly"],
    highlight: "Same-week funding",
    volume: 50000,
  },
  {
    slug: "dental-practice-loans",
    title: "Dental Practice Loans",
    kind: "vertical",
    tagline: "Equipment, expansion & acquisition",
    description:
      "Finance chairs, CBCT imaging, build-outs or a full practice purchase with structures designed for DSOs and solo practices across Westlake, the Domain, Round Rock and Cedar Park.",
    bullets: ["Chairs, imaging & software", "Practice acquisition", "Refinance existing debt"],
    highlight: "Rates from 7.25%",
    volume: 500,
  },
  {
    slug: "medical-practice-loans",
    title: "Medical Practice Loans",
    kind: "vertical",
    tagline: "Clinics & physician groups",
    description:
      "Acquisition, partner buy-in, expansion and working capital tailored to insurance reimbursement timing - sized for Austin's dense pediatric, aesthetics, dermatology and primary-care market.",
    bullets: ["Up to 100% project financing", "Terms up to 10 years", "Deferred payment options"],
    highlight: "$50K-$7M",
    volume: 500,
  },
  {
    slug: "restaurant-loans",
    title: "Restaurant Loans",
    kind: "vertical",
    tagline: "Fit-out, expansion & equipment",
    description:
      "Open the second location, refresh the dining room, or weather a slow season with capital structured for Austin hospitality cash flow - SoCo cafes to East Austin breweries.",
    bullets: ["Daily, weekly or monthly payments", "Same-day approvals", "No equity required"],
    highlight: "$25K-$2M",
    volume: 500,
  },
  {
    slug: "trucking-business-loans",
    title: "Trucking Business Loans",
    kind: "vertical",
    tagline: "Owner-operators to fleet expansion",
    description:
      "Capital to add tractors, cover insurance down payments and bridge slow-pay receivables - built for SH-130, I-35 and the freight corridors feeding Samsung, Tesla and the broader Texas Triangle.",
    bullets: ["DOT-friendly underwriting", "Factoring + term combos", "Fuel & maintenance reserves"],
    highlight: "Funded in 24 hrs",
  },
  {
    slug: "commercial-construction-loan",
    title: "Commercial Construction Loan",
    kind: "vertical",
    tagline: "Ground-up & renovation projects",
    description:
      "Multi-draw financing aligned to your construction schedule with interest-only periods during the build phase - sized for Austin mid-rise residential, Domain mixed-use and Hill Country hospitality builds.",
    bullets: ["Up to 80% LTC", "12-36 month terms", "Convertible to permanent financing"],
    highlight: "$250K-$25M",
  },
  {
    slug: "hotel-loans",
    title: "Hotel Loans",
    kind: "vertical",
    tagline: "Acquisition & PIP renovation",
    description:
      "Capital for flagged and independent properties across Central Texas hospitality - Downtown convention hotels, SoCo boutiques, Domain corporate hotels, and Hill Country resort properties.",
    bullets: ["SBA 7(a) & 504", "Bridge to perm", "Up to 90% LTV"],
    highlight: "$500K-$25M",
  },
  {
    slug: "salon-business-loans",
    title: "Salon Business Loans",
    kind: "vertical",
    tagline: "Beauty, wellness & medical aesthetics",
    description:
      "Chair rentals, suite build-outs, product inventory and marketing - plus medical aesthetics financing for the laser, injectables and body-contouring market growing across the Austin metro.",
    bullets: ["Equipment & build-out", "Med-spa & aesthetics", "Suite operators welcome"],
    highlight: "Quick pre-qual",
  },
  {
    slug: "retail-business-loans",
    title: "Retail Business Loans",
    kind: "vertical",
    tagline: "Inventory & storefront capital",
    description:
      "Stock up for the season, open a second location, or refresh your Austin storefront with capital sized to retail cash flow cycles - SoCo boutiques to Domain flagships.",
    bullets: ["Seasonal payment structures", "Inventory financing", "POS-integrated underwriting"],
    highlight: "$15K-$1M",
  },
  {
    slug: "ecommerce-business-funding",
    title: "Ecommerce Business Funding",
    kind: "vertical",
    tagline: "Inventory & ad spend capital",
    description:
      "Capital sized to your AOV, repeat rate and marketing payback, purpose-built for Shopify, Amazon and DTC brands shipping out of Central Texas fulfillment centers.",
    bullets: ["Integrates with Shopify & Amazon", "Daily or weekly remittance", "Scales with revenue"],
    highlight: "$25K-$3M",
  },
  {
    slug: "food-truck-financing",
    title: "Food Truck Financing",
    kind: "vertical",
    tagline: "Mobile food business funding",
    description:
      "Finance the truck, the build-out and the commissary kitchen - Austin pioneered the modern food-truck scene and the financing infrastructure runs deep here.",
    bullets: ["New & used trucks", "100% financing", "Startup-friendly"],
    highlight: "Approvals in 24 hrs",
  },
  {
    slug: "loan-for-gym-business",
    title: "Loan For Gym Business",
    kind: "vertical",
    tagline: "Equipment & build-out",
    description:
      "Outfit the floor, expand into recovery and group fitness, or refinance higher-rate equipment leases - Austin is one of the most active fitness markets in the country.",
    bullets: ["Cardio + strength bundles", "Recovery & spa add-ons", "Refinance options"],
    highlight: "Up to $500K",
  },
];

export const PILLARS: Pillar[] = [...MONEY_PILLARS, ...VERTICAL_PILLARS];

/** Top 8 money pillars used to build the suburb x pillar SEO pages (10 suburbs * 8 = 80 pages). */
export const TOP_MONEY_PILLARS: Pillar[] = MONEY_PILLARS.slice(0, 8);

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
