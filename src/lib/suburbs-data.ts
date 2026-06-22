// Austin Capital — Austin metro neighborhood pages.
// Unique local content per neighborhood — never a city-page find/replace.

export type Suburb = {
  slug: string;
  name: string;
  /** "City of Austin" | "Travis County" | "Williamson County" | etc. */
  county: string;
  /** Short tagline / sub-heading. */
  tagline: string;
  /** First paragraph — unique local intro (700+ word pages should expand on this). */
  intro: string;
  /** Local landmarks and notable spots — used in body copy. */
  landmarks: string[];
  /** Notable local industries / business types. */
  industries: string[];
  /** Sample local businesses (fictional but plausible) used in case study callouts. */
  sampleBusinesses: { name: string; type: string; useCase: string }[];
  /** ZIP codes served. */
  zips: string[];
};

export const SUBURBS: Suburb[] = [
  {
    slug: "downtown-austin",
    name: "Downtown Austin",
    county: "City of Austin",
    tagline: "Capitol-corridor finance, law, conference hospitality and tech HQs",
    intro:
      "Downtown Austin runs from Lady Bird Lake north to the Texas State Capitol and concentrates the city's legal, financial, government and conference economy. Congress Avenue and the Second Street District anchor retail and dining; the warehouse district holds bar and music venues; and Class A office towers along Cesar Chavez, Sixth Street and Brazos house law firms, accounting practices, tech HQs and the financial advisors who serve them. Austin Capital works with downtown operators to finance partner buy-ins, build-outs, condo office purchases and working capital sized to Capitol-corridor rent.",
    landmarks: ["Texas State Capitol", "Congress Avenue", "Second Street District", "Lady Bird Lake", "Frost Tower"],
    industries: ["Law & accounting", "Hospitality & restaurants", "Tech HQs & venture", "Government services"],
    sampleBusinesses: [
      { name: "Congress Avenue Law Group", type: "Law firm", useCase: "SBA 7(a) for senior associate buy-in" },
      { name: "Second Street Tasting Co.", type: "Restaurant & wine bar", useCase: "Equipment financing + working capital for expansion" },
      { name: "Brazos Tower Wealth Partners", type: "Wealth management", useCase: "Unsecured line of credit for lateral hires" },
    ],
    zips: ["78701", "78703"],
  },
  {
    slug: "south-congress",
    name: "South Congress (SoCo)",
    county: "City of Austin",
    tagline: "Boutique retail, food trucks, hotels and the original Austin vibe",
    intro:
      "South Congress, known locally as SoCo, runs south from the river through one of the most iconic commercial strips in the country: independent boutiques, leather and Western wear, the food-truck culture that made Austin famous, boutique hotels (Hotel San Jose, Hotel Magdalena, the Austin Motel), and music venues that bridge the East Austin scene with the downtown tourist trail. Rents here have climbed steadily, and operators run a mix of long-tenured locals and newer concepts. Austin Capital finances SoCo owners with equipment loans, working capital for tourist seasonality, SBA acquisitions and buildouts sized for SoCo lease economics.",
    landmarks: ["Hotel San Jose", "Allens Boots", "South Congress Books", "Continental Club", "Long Center"],
    industries: ["Boutique retail", "Restaurants & food trucks", "Boutique hospitality", "Live music venues"],
    sampleBusinesses: [
      { name: "SoCo Leather Co.", type: "Western retail", useCase: "Inventory line for SXSW and ACL seasons" },
      { name: "Texas Honey Bakery", type: "Bakery & cafe", useCase: "SBA 7(a) for second-location buildout" },
      { name: "South 1st Boutique Hotel", type: "Boutique hospitality", useCase: "SBA 504 for FF&E and PIP renovation" },
    ],
    zips: ["78704"],
  },
  {
    slug: "east-austin",
    name: "East Austin",
    county: "City of Austin",
    tagline: "Creative class, breweries, restaurants, art galleries and the new economy",
    intro:
      "East Austin extends east of I-35 through a corridor that has transformed from working-class to one of the densest creative and entrepreneurial submarkets in the country. East Sixth, East Cesar Chavez, Manor Road and the Mueller-adjacent blocks now hold breweries, distilleries, design-forward restaurants, third-wave coffee, tattoo studios, music venues, art galleries and a growing concentration of remote-first SaaS founders. Austin Capital works with East Austin operators on equipment financing for breweries, SBA buildouts for restaurants, revenue-based financing for ecommerce and creative agencies, and acquisitions of established Eastside concepts.",
    landmarks: ["East Sixth Street", "Cheer Up Charlies", "Hops & Grain Brewery", "Mueller (adjacent)", "Springdale General"],
    industries: ["Craft breweries & distilleries", "Restaurants & coffee", "Creative agencies & tech", "Art galleries & retail"],
    sampleBusinesses: [
      { name: "Manor Road Brewing", type: "Craft brewery & taproom", useCase: "Equipment financing for canning line + SBA 504 building purchase" },
      { name: "East Sixth Tortilla Co.", type: "Tex-Mex restaurant", useCase: "SBA 7(a) for buildout and equipment package" },
      { name: "Cesar Chavez Studios", type: "Creative agency", useCase: "Revenue-based financing for hiring and growth" },
    ],
    zips: ["78702", "78721", "78722"],
  },
  {
    slug: "the-domain",
    name: "The Domain",
    county: "City of Austin",
    tagline: "North Austin's second downtown — tech HQs, retail, multifamily and conference hospitality",
    intro:
      "The Domain anchors North Austin and operates as the metro's second downtown: Apple, IBM, Indeed, Facebook and a long list of tech HQs occupy the surrounding office product, paired with the open-air retail center, JW Marriott, Westin and Archer hotels, multifamily towers and the densest concentration of national-flag restaurants in the metro. Austin Capital finances Domain-area operators with SBA acquisitions, working capital for hospitality and retail, equipment financing for restaurants and fitness, and CRE bridge loans tied to the active Domain real estate cycle.",
    landmarks: ["Apple HQ", "IBM Campus", "The Domain shopping center", "JW Marriott Domain", "Q2 Stadium (adjacent)"],
    industries: ["Tech HQs", "Multifamily real estate", "National retail & hospitality", "Corporate hospitality"],
    sampleBusinesses: [
      { name: "Domain Northside Bistro", type: "Fine-dining restaurant", useCase: "Equipment financing + SBA 7(a) for second location" },
      { name: "North Austin Pediatric Dental", type: "Pediatric dental practice", useCase: "SBA 504 for medical condo purchase" },
      { name: "Burnet Road Marketing", type: "B2B marketing agency", useCase: "Working capital line against enterprise receivables" },
    ],
    zips: ["78758", "78759"],
  },
  {
    slug: "westlake",
    name: "Westlake",
    county: "Travis County",
    tagline: "Affluent professional services, Hill Country real estate and family offices",
    intro:
      "Westlake sits west of MoPac along the Colorado River and Hill Country edge, anchoring the metro's most affluent residential and professional-services submarket. Bee Cave Road and Westlake Drive host law firms, family offices, wealth advisors, medical and dental specialty practices and the boutique retail that serves the surrounding residential base. Austin Capital finances Westlake operators with SBA 7(a) for partner buy-ins, SBA 504 for office condo purchases on the Bee Cave corridor, working capital lines, and equipment financing for specialty medical and aesthetic practices.",
    landmarks: ["Westlake High School", "Davenport Village", "Bee Cave Road corridor", "Lake Austin", "Westlake Drive"],
    industries: ["Law & wealth management", "Medical & dental specialty", "Family offices", "Boutique retail & services"],
    sampleBusinesses: [
      { name: "Bee Cave Aesthetic Medicine", type: "Medical aesthetics", useCase: "Equipment financing for laser + body-contouring suite" },
      { name: "Davenport Wealth Partners", type: "Wealth management", useCase: "Unsecured business line for hiring & tech investment" },
      { name: "Westlake Smiles", type: "Orthodontic practice", useCase: "SBA 7(a) for practice acquisition" },
    ],
    zips: ["78746"],
  },
  {
    slug: "mueller",
    name: "Mueller",
    county: "City of Austin",
    tagline: "Master-planned mixed-use, Dell Children's, creative tech and family services",
    intro:
      "Mueller occupies the former Robert Mueller Municipal Airport site east of Hyde Park and operates as one of the most successful master-planned mixed-use redevelopments in the country. Dell Children's Medical Center anchors the healthcare cluster; Aldrich Street and the Mueller retail corridor hold restaurants, the Alamo Drafthouse, neighborhood services and family-friendly retail; and a growing concentration of creative tech firms occupies the surrounding office product. Austin Capital finances Mueller operators with SBA buildouts for restaurants and clinics, equipment financing for medical and dental practices, working capital for family services, and revenue-based financing for the area's tech operators.",
    landmarks: ["Dell Children's Medical Center", "Aldrich Street", "Alamo Drafthouse Mueller", "Mueller Lake Park", "Thinkery"],
    industries: ["Healthcare & pediatric", "Family services & retail", "Creative tech & startups", "Hospitality"],
    sampleBusinesses: [
      { name: "Aldrich Street Pediatrics", type: "Pediatric medical", useCase: "SBA 7(a) for partner buy-in + EMR rollout" },
      { name: "Mueller Family Dental", type: "Dental practice", useCase: "Equipment financing for CBCT + CAD/CAM" },
      { name: "Thinkery District Cafe", type: "Family restaurant", useCase: "Working capital + buildout loan" },
    ],
    zips: ["78723"],
  },
  {
    slug: "round-rock",
    name: "Round Rock",
    county: "Williamson County",
    tagline: "Dell HQ, suburban tech, retail, healthcare and family services",
    intro:
      "Round Rock sits north of Austin in Williamson County and anchors one of the metro's most established suburban submarkets. Dell Technologies' global headquarters drives a substantial corporate-services economy; the IKEA, Round Rock Premium Outlets and SH-130 retail corridors anchor consumer commerce; St. David's Round Rock and Baylor Scott & White Round Rock anchor healthcare; and a wide base of family-services, automotive, hospitality and light-industrial operators serve the residential population. Austin Capital finances Round Rock operators with SBA acquisitions, real estate purchases, equipment financing for medical and dental, and working capital across retail and hospitality.",
    landmarks: ["Dell Technologies HQ", "Round Rock Premium Outlets", "St. David's Round Rock Medical Center", "Old Settlers Park", "Kalahari Resort"],
    industries: ["Tech (Dell)", "Suburban retail & hospitality", "Healthcare", "Auto & family services"],
    sampleBusinesses: [
      { name: "Round Rock Auto Body", type: "Collision repair", useCase: "SBA 504 for shop real estate purchase" },
      { name: "Kalahari Catering Group", type: "Event catering", useCase: "Equipment financing for commissary expansion" },
      { name: "Williamson Family Dental", type: "Family dental practice", useCase: "SBA 7(a) for acquisition + chair upgrades" },
    ],
    zips: ["78664", "78665", "78681"],
  },
  {
    slug: "cedar-park",
    name: "Cedar Park",
    county: "Williamson County",
    tagline: "Growing tech corridor, healthcare, retail and family-services suburb",
    intro:
      "Cedar Park sits northwest of Austin along US-183 and has grown into one of the fastest-expanding submarkets in the metro. The 1890 Ranch and Lakeline retail corridors anchor consumer commerce; St. David's Surgical Hospital and Cedar Park Regional Medical Center anchor healthcare; and a growing roster of tech, professional services and hospitality operators serve the dense residential population that has moved into the corridor. Austin Capital finances Cedar Park operators with SBA acquisitions, equipment financing for medical and dental, working capital for retail and restaurants, and SBA 504 for owner-occupied office and flex space.",
    landmarks: ["1890 Ranch shopping center", "Lakeline Mall", "Cedar Park Regional Medical Center", "H-E-B Center at Cedar Park", "Austin FC Training Facility"],
    industries: ["Healthcare", "Retail & restaurants", "Tech & professional services", "Family services"],
    sampleBusinesses: [
      { name: "1890 Ranch Veterinary", type: "Veterinary clinic", useCase: "SBA 7(a) for clinic acquisition" },
      { name: "Lakeline Restaurant Group", type: "Multi-unit restaurant", useCase: "Equipment financing for fourth location" },
      { name: "Cedar Park Pediatric Dental", type: "Pediatric dental", useCase: "SBA 504 for owner-occupied medical condo" },
    ],
    zips: ["78613"],
  },
  {
    slug: "pflugerville",
    name: "Pflugerville & North Tech Corridor",
    county: "Travis County",
    tagline: "Samsung, Tesla-adjacent manufacturing, logistics and the SH-130 corridor",
    intro:
      "Pflugerville and the broader North Austin tech-manufacturing corridor along SH-130 hold one of the most consequential industrial submarkets in Central Texas. Samsung's Taylor and existing Pflugerville-adjacent fab plants, Tesla's Gigafactory just to the south in Travis County, the surrounding semiconductor supply chain, freight-forwarding operators, and the family-services economy that supports the workforce all run through this corridor. Austin Capital finances corridor operators with SBA 504 for industrial real estate, equipment financing for manufacturing and logistics fleets, AR lines and factoring for freight, and working capital for the supplier base feeding the chip industry.",
    landmarks: ["Samsung Austin Semiconductor", "Tesla Gigafactory (adjacent)", "SH-130 corridor", "Pflugerville Lake", "Stone Hill Town Center"],
    industries: ["Semiconductor manufacturing", "Logistics & freight forwarding", "Light industrial", "Family services"],
    sampleBusinesses: [
      { name: "SH-130 Freight Forwarders", type: "Freight forwarder", useCase: "Invoice factoring + SBA 504 for warehouse" },
      { name: "Pflugerville Precision Machining", type: "CNC manufacturer", useCase: "Equipment financing for new 5-axis CNC" },
      { name: "Stone Hill Cafe Group", type: "Multi-unit cafe", useCase: "Working capital line for fourth location" },
    ],
    zips: ["78660", "78664"],
  },
  {
    slug: "lakeway",
    name: "Lakeway & Bee Cave",
    county: "Travis County",
    tagline: "Hill Country real estate, hospitality, healthcare and lake-tourism economy",
    intro:
      "Lakeway and Bee Cave anchor the southwestern Hill Country edge of the Austin metro along Lake Travis and the surrounding limestone hills. The Hill Country Galleria retail center, Lakeway Resort and the lakefront marinas, Lake Travis-area boatyards and the medical, dental and aesthetic practices that serve the affluent surrounding residential base all run through this corridor. Austin Capital finances Lakeway and Bee Cave operators with SBA 7(a) for practice acquisitions, SBA 504 for office and medical condo purchases, equipment financing for marine services, and working capital for tourist-driven hospitality.",
    landmarks: ["Lake Travis", "Hill Country Galleria", "Lakeway Resort & Spa", "Bee Cave Road", "Mansfield Dam"],
    industries: ["Hill Country real estate", "Hospitality & marina services", "Healthcare & aesthetics", "Boutique retail"],
    sampleBusinesses: [
      { name: "Lake Travis Marine Services", type: "Marina & boat service", useCase: "Equipment loan for lift and service vessel expansion" },
      { name: "Hill Country Dermatology", type: "Dermatology & aesthetics", useCase: "SBA 504 for medical condo + laser equipment financing" },
      { name: "Bee Cave Family Dental", type: "Family dental practice", useCase: "SBA 7(a) for acquisition and CBCT upgrade" },
    ],
    zips: ["78734", "78738"],
  },
];

export function getSuburb(slug: string): Suburb | undefined {
  return SUBURBS.find((s) => s.slug === slug);
}
