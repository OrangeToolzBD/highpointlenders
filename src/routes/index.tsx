import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
const siteLogoUrl = "/austlogo.png";
const heroVideoUrl = "/austin-bg-video.mp4";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildHead } from "@/lib/seo";
import { buildGraph, faqNode } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Banknote,
  Building2,
  Truck,
  Stethoscope,
  UtensilsCrossed,
  ShoppingBag,
  Factory,
  Home,
  Briefcase,
  Cpu,
  Globe,
  Star,
  PhoneCall,
  CheckCircle2,
  Lock,
  Users,
  TrendingUp,
  FileText,
  HandCoins,
  CreditCard,
  Wrench,
  Receipt,
  LineChart,
  Sparkles,
  Menu,
  MapPin,
  Calculator as CalcIcon,
  HelpCircle,
  BookOpen,
  Scissors,
  Hotel,
  Car,
  Dumbbell,
  Hammer,
  Pizza,
  Smile,
  Leaf,
  Tractor,
  Landmark,
  HeartPulse,
  Scale,
  Package,
  HardHat,
  Gem,
  Cog,
  Code2,
  ShoppingCart,
} from "lucide-react";

type MegaItemProps = Readonly<{
  icon: LucideIcon;
  label: string;
  desc: string;
  href?: string;
  slug?: string;
  homeHash?: string;
}>;

const CITY = "Austin";
const STATE = "Texas";
const CITY_STATE = `${CITY}, TX`;

const HOME_FAQS = [
  {
    q: `What loan products can ${CITY} businesses apply for?`,
    a: `Our lender network covers SBA 7(a) and 504 loans, business lines of credit, equipment financing, working capital advances, commercial real estate and merchant cash advances - sized for ${CITY} operators from solo founders to growth-stage companies.`,
  },
  {
    q: "How long does approval take?",
    a: `Most qualified ${CITY} files see an initial decision inside 48 hours, with funding wired in 2-5 business days. Same-day funding is available for short-term loans and merchant cash advances.`,
  },
  {
    q: "Does pre-qualifying impact my credit?",
    a: "No. We run a soft inquiry to match you with the right lenders. Your FICO is untouched until you formally accept an offer and the chosen lender runs a hard pull.",
  },
  {
    q: "Is there a minimum credit score requirement?",
    a: "Most of our partner lenders work with scores starting at 600 FICO. SBA programs typically expect 650+, while revenue-based products may accept lower scores when cash flow is strong.",
  },
  {
    q: "What documents do I need to apply?",
    a: "Usually 4-6 months of business bank statements, a brief business profile and a valid ID. SBA and CRE deals also call for tax returns, P&Ls and a debt schedule.",
  },
  {
    q: `Are early-stage ${CITY} startups eligible?`,
    a: `Yes. We work with lenders that fund ${CITY} companies with 12 months or more of operating history, plus SBA microloan and startup programs for newer ventures.`,
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => {
    const title = `Business Loans in ${CITY_STATE}`;
    const description = `Fast business funding in ${CITY_STATE}. Compare SBA loans, business line of credit, equipment financing, working capital and same-day business loans from trusted ${CITY} lenders. Pre-qualify in minutes, no impact on credit.`;
    return buildHead({
      title,
      description,
      path: "/",
      schema: buildGraph({
        title,
        description,
        path: "/",
        extraNodes: [faqNode({ path: "/", faqs: HOME_FAQS })],
      }),
    });
  },
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustRow />
        <WhyUs />
        <CityIntro />
        <CityHubCTA />
        <LoanTypes />
        <HowItWorks />
        <Industries />
        <SuccessStories />
        <CityData />
        <Security />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------- Scroll Reveal ---------------- */
function useScrollReveal() {
  useEffect(() => {
    if (globalThis.window === undefined) return;
    const sections = Array.from(document.querySelectorAll("main > section"));
    const targets: Element[] = [];
    sections.forEach((section) => {
      // Mark direct children (skip absolutely-positioned decorative shapes)
      Array.from(section.children).forEach((child) => {
        const el = child as HTMLElement;
        if (el.classList.contains("pointer-events-none")) return;
        if (el.tagName === "SVG") return;
        // Stagger children inside the wrapper for a nicer effect
        const inner = Array.from(el.children).filter(
          (c) => !(c as HTMLElement).classList.contains("pointer-events-none"),
        ) as HTMLElement[];
        if (inner.length > 1 && inner.length <= 8) {
          inner.forEach((c, i) => {
            c.classList.add("reveal");
            if (i > 0 && i <= 5) c.classList.add(`reveal-delay-${i}`);
            targets.push(c);
          });
        } else {
          el.classList.add("reveal");
          targets.push(el);
        }
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Header ---------------- */

const LOAN_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Working Capital & Credit",
    items: [
      { icon: HandCoins, label: "Small Business Loans", desc: "Compare every funding product in one place", slug: "small-business-loans" },
      { icon: CreditCard, label: "Business Line of Credit", desc: "Revolving credit, draw what you need", slug: "business-line-of-credit" },
      { icon: LineChart, label: "Working Capital Loans", desc: "Cover payroll, inventory, seasonal gaps", slug: "working-capital-loans" },
      { icon: Clock, label: "Short-Term Business Loans", desc: "Fast funding, 3-24 month terms", slug: "short-term-business-loans" },
      { icon: ShieldCheck, label: "Unsecured Business Loans", desc: "No collateral, no UCC blanket", slug: "unsecured-business-loans" },
      { icon: Banknote, label: "Merchant Cash Advance", desc: "Advance against future card sales", slug: "merchant-cash-advance" },
      { icon: Banknote, label: "Revenue Based Financing", desc: "Repay as a % of monthly revenue", slug: "revenue-based-financing" },
    ],
  },
  {
    heading: "SBA & Term Loans",
    items: [
      { icon: FileText, label: "SBA Loans", desc: "Government-backed funding programs", slug: "sba-loans" },
      { icon: FileText, label: "SBA 7(a) Loan", desc: "The SBA's flagship working capital loan", slug: "sba-7a-loan" },
      { icon: Briefcase, label: "Business Acquisition Loans", desc: "Buy an existing Austin business", slug: "business-acquisition-loans" },
      { icon: Sparkles, label: "Startup Business Loans", desc: "Funding for new Austin ventures", slug: "startup-business-loans" },
    ],
  },
  {
    heading: "Equipment & Receivables",
    items: [
      { icon: Truck, label: "Trucking Business Loans", desc: "Owner-operators to fleet expansion", slug: "trucking-business-loans" },
      { icon: Hammer, label: "Commercial Construction Loan", desc: "Ground-up & renovation projects", slug: "commercial-construction-loan" },
      { icon: Receipt, label: "Invoice Factoring", desc: "Turn invoices into cash today", slug: "invoice-factoring" },
      { icon: Receipt, label: "Accounts Receivable Financing", desc: "Revolving line against open A/R", slug: "accounts-receivable-financing" },
    ],
  },
];

const INDUSTRY_GROUPS: {
  heading: string;
  items: MegaItemProps[];
}[] = [
  {
    heading: "Healthcare & Professional",
    items: [
      { icon: Stethoscope, label: "Medical Practice Loans", desc: "Funding for clinics & physician groups", slug: "medical-practice-loans" },
      { icon: Smile, label: "Dental Practice Loans", desc: "Equipment, expansion and acquisition", slug: "dental-practice-loans" },
      { icon: Briefcase, label: "Professional Services", desc: "Law, accounting, consulting firms", href: "/industry/professional-services" },
    ],
  },
  {
    heading: "Hospitality & Retail",
    items: [
      { icon: UtensilsCrossed, label: "Restaurant Loans", desc: "Fit-out, expansion and equipment", slug: "restaurant-loans" },
      { icon: Pizza, label: "Food Truck Financing", desc: "Mobile food business funding", slug: "food-truck-financing" },
      { icon: Hotel, label: "Hotel Loans", desc: "Property acquisition & renovation", slug: "hotel-loans" },
      { icon: ShoppingBag, label: "Retail Business Loans", desc: "Inventory and storefront capital", slug: "retail-business-loans" },
      { icon: Scissors, label: "Salon Business Loans", desc: "Beauty & wellness expansion", slug: "salon-business-loans" },
      { icon: Dumbbell, label: "Loan for Gym Business", desc: "Equipment and build-out", slug: "loan-for-gym-business" },
    ],
  },
  {
    heading: "Trades, Auto & Agriculture",
    items: [
      { icon: Hammer, label: "Commercial Construction Loan", desc: "Ground-up and renovation projects", slug: "commercial-construction-loan" },
      { icon: Car, label: "Auto Repair Shop Financing", desc: "Bays, lifts and diagnostics", slug: "auto-repair-shop-financing" },
      { icon: Tractor, label: "Farm Credit Financing", desc: "Operating lines for farms", slug: "farm-credit-financing" },
      { icon: Globe, label: "Ecommerce Business Funding", desc: "Inventory and ad spend capital", slug: "ecommerce-business-funding" },
    ],
  },
];

const SERVICE_AREAS: { region: string; suburbs: { name: string; slug: string }[] }[] = [
  {
    region: "Central Austin",
    suburbs: [
      { name: "Downtown Austin", slug: "downtown-austin" },
      { name: "South Congress (SoCo)", slug: "south-congress" },
      { name: "East Austin", slug: "east-austin" },
    ],
  },
  {
    region: "North & Tech Corridor",
    suburbs: [
      { name: "The Domain", slug: "the-domain" },
      { name: "Mueller", slug: "mueller" },
      { name: "Pflugerville", slug: "pflugerville" },
    ],
  },
  {
    region: "Williamson County",
    suburbs: [
      { name: "Round Rock", slug: "round-rock" },
      { name: "Cedar Park", slug: "cedar-park" },
    ],
  },
  {
    region: "West & Hill Country",
    suburbs: [
      { name: "Westlake", slug: "westlake" },
      { name: "Lakeway", slug: "lakeway" },
    ],
  },
];

function MegaItem({
  icon: Icon,
  label,
  desc,
  href,
  slug,
  homeHash,
}: MegaItemProps) {
  const itemClass = "flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-secondary";
  const inner = (
    <>
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{desc}</span>
      </span>
    </>
  );
  if (homeHash) {
    return (
      <NavigationMenuLink asChild>
        <Link to="/" hash={homeHash} className={itemClass}>
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  if (slug) {
    return (
      <NavigationMenuLink asChild>
        <Link
          to="/pillar/$slug"
          params={{ slug }}
          className={itemClass}
        >
          {inner}
        </Link>
      </NavigationMenuLink>
    );
  }
  return (
    <NavigationMenuLink asChild>
      <a
        href={href ?? "#"}
        className={itemClass}
      >
        {inner}
      </a>
    </NavigationMenuLink>
  );
}

export function Header() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-white/90 text-foreground backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <a href="/" className="-ml-2 flex items-center font-semibold">
          <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="-my-2 h-[88px] w-auto" />
          <span className="sr-only">{SITE_CONFIG.name}</span>
        </a>

        {/* Desktop nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Financing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[min(900px,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-6 text-popover-foreground">
                  <div className="grid grid-cols-3 gap-6 min-w-[852px]">
                    {LOAN_GROUPS.map((g) => (
                      <div key={g.heading}>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                          {g.heading}
                        </div>
                        <div className="space-y-1">
                          {g.items.map((it) => (
                            <MegaItem key={it.label} {...it} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-secondary/60 p-4">
                    <div className="text-sm">
                      <div className="font-semibold">Not sure which loan fits?</div>
                      <div className="text-muted-foreground">
                        Talk to an Austin banker - no obligation.
                      </div>
                    </div>
                    <Button asChild size="sm" className="bg-[image:var(--gradient-cta)] text-white">
                      <a href={SITE_CONFIG.phoneHref}>
                        <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Sectors</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[min(1100px,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-6 text-popover-foreground">
                  <div className="grid grid-cols-4 gap-6 min-w-[1052px]">
                    {INDUSTRY_GROUPS.map((g) => (
                      <div key={g.heading}>
                        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                          {g.heading}
                        </div>
                        <div className="space-y-1">
                          {g.items.map((it) => (
                            <MegaItem key={it.label} {...it} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Locations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[min(760px,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-6 text-popover-foreground">
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-[color:var(--brand-blue)]" />
                    Funding businesses across the greater {CITY_STATE} metro
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
                    {SERVICE_AREAS.map((sa) => (
                      <div key={sa.region}>
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                          {sa.region}
                        </div>
                        <ul className="space-y-1.5">
                          {sa.suburbs.map((s) => (
                            <li key={s.slug}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to="/austin/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="block rounded px-2 py-1 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-secondary focus:bg-secondary data-[state=open]:bg-secondary">Insights</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="light w-[min(520px,calc(100vw-2rem))] max-h-[calc(100vh-5rem)] overflow-auto bg-popover p-4 text-popover-foreground">
                  <div className="grid gap-1">
                    <MegaItem icon={BookOpen} label="How It Works" desc="Our 4-step funding process" homeHash="how" />
                    <MegaItem icon={Star} label="Success Stories" desc="Real Austin businesses we funded" homeHash="stories" />
                    <MegaItem icon={HelpCircle} label="FAQs" desc="Answers to common funding questions" homeHash="faq" />
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/10 focus:bg-white/10`}>
                <Link to="/contact">Reach Us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden bg-[image:var(--gradient-cta)] text-white shadow-[var(--shadow-elegant)] hover:opacity-95 sm:inline-flex"
            asChild
          >
            <a href={SITE_CONFIG.phoneHref}>
              <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
            </a>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
              <SheetHeader className="border-b border-border px-5 py-4 text-left">
                <SheetTitle className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground">
                    <HandCoins className="h-3.5 w-3.5" />
                  </span>
                  {SITE_CONFIG.name} · {CITY_STATE}
                </SheetTitle>
              </SheetHeader>
              <div className="px-3 py-3">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="loans">
                    <AccordionTrigger className="px-2 text-base font-semibold">Financing</AccordionTrigger>
                    <AccordionContent>
                      {LOAN_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ind">
                    <AccordionTrigger className="px-2 text-base font-semibold">Sectors</AccordionTrigger>
                    <AccordionContent>
                      {INDUSTRY_GROUPS.map((g) => (
                        <div key={g.heading} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                            {g.heading}
                          </div>
                          <ul className="mt-1">
                            {g.items.map((it) => (
                              <li key={it.label}>
                                <SheetClose asChild>
                                  {it.slug ? (
                                    <Link
                                      to="/pillar/$slug"
                                      params={{ slug: it.slug }}
                                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                                    >
                                      {it.label}
                                    </Link>
                                  ) : (
                                    <a href={it.href ?? "#"} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                      {it.label}
                                    </a>
                                  )}
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="areas">
                    <AccordionTrigger className="px-2 text-base font-semibold">Locations</AccordionTrigger>
                    <AccordionContent>
                      {SERVICE_AREAS.map((sa) => (
                        <div key={sa.region} className="mb-3">
                          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[color:var(--brand-blue)]">
                            {sa.region}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1.5 px-2">
                            {sa.suburbs.map((s) => (
                              <SheetClose asChild key={s.slug}>
                                <Link
                                  to="/austin/$suburb"
                                  params={{ suburb: s.slug }}
                                  className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  {s.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="res">
                    <AccordionTrigger className="px-2 text-base font-semibold">Insights</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {[
                          { label: "How It Works", hash: "how" },
                          { label: "Success Stories", hash: "stories" },
                          { label: "FAQs", hash: "faq" },
                        ].map((l) => (
                          <li key={l.label}>
                            <SheetClose asChild>
                              <Link to="/" hash={l.hash} className="block rounded-md px-2 py-1.5 text-sm hover:bg-secondary">
                                {l.label}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-4 space-y-2 border-t border-border px-2 pt-4">
                  <SheetClose asChild>
                    <Button asChild className="w-full bg-[image:var(--gradient-cta)] text-white">
                      <a href={SITE_CONFIG.phoneHref}>
                        <PhoneCall className="h-4 w-4" /> Call {SITE_CONFIG.phone}
                      </a>
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </header>
      <div aria-hidden className="h-16" />
    </>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={heroVideoUrl}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.24 0.05 55 / 0.78), oklch(0.16 0.04 50 / 0.92))" }}
        aria-hidden="true"
      />
      {/* Single subtle sunburst accent + horizon arches */}
      <SunShape className="pointer-events-none absolute -top-40 -right-32 h-80 w-80 text-[color:var(--brand-gold)] opacity-25" />
      <OceanWaves className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-[color:var(--brand-gold)] md:h-32" />
      {/* Top deco pinstripe */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-28">
        <div className="flex flex-wrap items-center gap-2">
        </div>

        <h1 className="mt-6 text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl lg:text-[5.5rem]">
          Business Loans, Built for{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, oklch(0.85 0.13 85), oklch(0.78 0.13 85), oklch(0.72 0.17 30))" }}
          >
            Austin Operators
          </span>
          <span className="block text-[color:var(--brand-gold)]/80 text-sm font-medium tracking-[0.4em] uppercase mt-3 md:text-base">
            SBA · Working Capital · Equipment · CRE
          </span>
        </h1>

        {/* Gold deco divider with diamond ornament */}
        <div className="mt-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-12 bg-[color:var(--brand-gold)]/70" />
          <DiamondMark className="h-2.5 w-2.5 text-[color:var(--brand-gold)]" />
          <span className="h-px w-24 bg-[color:var(--brand-gold)]/40" />
          <DiamondMark className="h-2 w-2 text-[color:var(--brand-gold)]/70" />
          <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-[color:var(--brand-gold)]/30 to-transparent" />
        </div>

        <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
          Capital structured for Austin operators. Get matched with trusted
          lenders in {CITY_STATE} and receive offers in as little as{" "}
          <strong className="text-[color:var(--brand-gold)]">24 hours</strong>.
        </p>

        <ul className="mt-7 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-white/85 sm:grid-cols-2">
          {[
            "No impact on credit score",
            "75+ lender network",
            "Bilingual EN/ES specialists",
            "Funding from $5K to $5M",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[color:var(--brand-gold)]/40 bg-white/5">
                <CheckCircle2 className="h-3 w-3 text-[color:var(--brand-gold)]" />
              </span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            size="lg"
            asChild
            className="group relative w-full overflow-hidden bg-[image:var(--gradient-cta)] text-white shadow-[var(--shadow-glow)] hover:opacity-95 sm:w-auto"
          >
            <Link to="/apply-now">
              Get My Loan Options
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full border-[color:var(--brand-gold)]/50 bg-transparent text-white hover:bg-[color:var(--brand-gold)]/15 hover:text-white sm:w-auto"
          >
            <Link to="/apply-now">Talk to a Banker</Link>
          </Button>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/65">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3 w-3 text-[color:var(--brand-gold)]" /> 256-bit SSL
          </span>
          <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
          <span>Soft credit pull</span>
          <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]/60" />
          <span>No obligation</span>
        </div>
      </div>
    </section>
  );
}

/** Small Lone Star ornament used inline in dividers and uppercase chip text.
 *  Kept under the original `DiamondMark` name so every call site still resolves
 *  without churn - the visual is now a five-point star, the unmistakable Texas
 *  stamp. */
function DiamondMark({ className = "" }: { className?: string }) {
  // 5-point star inside a 10x10 viewBox, centered at (5, 5).
  const cx = 5;
  const cy = 5;
  const outer = 4.6;
  const inner = 1.85;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const isOuter = i % 2 === 0;
    const r = isOuter ? outer : inner;
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    pts.push(`${(cx + Math.cos(angle) * r).toFixed(2)},${(cy + Math.sin(angle) * r).toFixed(2)}`);
  }
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden="true">
      <polygon points={pts.join(" ")} fill="currentColor" />
    </svg>
  );
}


/* ---------------- Decorative SVG shapes - Texas star + Hill Country motifs ---------------- */

/**
 * OceanWaves → Art Deco horizon arches.
 * Three concentric arches across the width, evocative of MiMo grille work and
 * the curved façades on Lincoln Road and Ocean Drive.
 */
function OceanWaves({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={{ opacity: 0.3 }}
    >
      <path d="M0 200 Q 600 30 1200 200" opacity="0.85" />
      <path d="M0 200 Q 600 75 1200 200" opacity="0.65" />
      <path d="M0 200 Q 600 120 1200 200" opacity="0.45" />
      <path d="M0 200 Q 600 165 1200 200" opacity="0.3" />
    </svg>
  );
}

/**
 * SunShape → Texas Lone Star with a soft halo.
 * A bold 5-point star centered in the frame, with a few thin radial sparks and
 * a faint ring to evoke a brand stamp or saddle conch.
 */
function SunShape({ className }: Readonly<{ className?: string }>) {
  // 5-point star centered at (100, 100) with outer radius 64, inner radius 26.
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const isOuter = i % 2 === 0;
    const r = isOuter ? 64 : 26;
    const angle = (i * Math.PI) / 5 - Math.PI / 2; // pointing up
    const x = 100 + Math.cos(angle) * r;
    const y = 100 + Math.sin(angle) * r;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 12 + Math.PI / 12;
    return {
      x1: 100 + Math.cos(angle) * 78,
      y1: 100 + Math.sin(angle) * 78,
      x2: 100 + Math.cos(angle) * 94,
      y2: 100 + Math.sin(angle) * 94,
    };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {/* Faint outer ring */}
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      {/* Radiating sparks */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5">
        {sparks.map((s, i) => (
          <line key={`spark-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
        ))}
      </g>
      {/* The Lone Star body */}
      <polygon points={points.join(" ")} fill="currentColor" opacity="0.85" />
    </svg>
  );
}

/**
 * PalmLeaf → Monstera leaf silhouette.
 * (Currently unused in the layout, kept exported for future placement.)
 */
function PalmLeaf({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="currentColor">
      <g transform="rotate(-12 100 100)">
        <path d="M100 18 C 55 28 30 65 28 115 C 28 162 60 188 100 182 C 140 188 172 162 172 115 C 170 65 145 28 100 18 Z" />
        {/* Vein */}
        <rect x="98.5" y="40" width="3" height="140" rx="1.5" opacity="0.45" />
        {/* Monstera-style perforations (white-ish to suggest cutouts against the body) */}
        <g fill="#ffffff" opacity="0.55">
          <ellipse cx="68" cy="78" rx="9" ry="14" />
          <ellipse cx="132" cy="78" rx="9" ry="14" />
          <ellipse cx="62" cy="118" rx="11" ry="16" />
          <ellipse cx="138" cy="118" rx="11" ry="16" />
          <ellipse cx="72" cy="158" rx="7" ry="11" />
          <ellipse cx="128" cy="158" rx="7" ry="11" />
        </g>
      </g>
    </svg>
  );
}

/**
 * WavyLines → Art Deco grille (chevron stripes).
 * Replaces the horizontal wavy lines with stacked chevrons, the signature
 * Western-stitch chevron motif, evoking saddle leather and ranch fence lines.
 */
function WavyLines({
  className,
  color = "currentColor",
  opacity = 0.18,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  const rows = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
      style={{ opacity }}
    >
      {rows.map((i) => {
        const y = 25 + i * 20;
        return (
          <path
            key={`chevron-${i}`}
            d={`M 20 ${y + 12} L 200 ${y - 6} L 380 ${y + 12}`}
          />
        );
      })}
    </svg>
  );
}

/**
 * DotGrid → Lone Star + denim weave grid.
 * Rhombus tessellation, the Art Deco terrazzo / breeze-block pattern.
 */
function DotGrid({
  className,
  color = "currentColor",
  opacity = 0.2,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id="diamondgrid-pat" width="22" height="22" patternUnits="userSpaceOnUse">
          <path
            d="M 11 1 L 21 11 L 11 21 L 1 11 Z"
            fill="none"
            stroke={color}
            strokeWidth="0.9"
          />
          <circle cx="11" cy="11" r="0.9" fill={color} />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#diamondgrid-pat)" />
    </svg>
  );
}

/**
 * BlobShape → Stylized monstera/banana leaf.
 * Stylized longhorn silhouette, slightly off-axis - a Texas botanical/livestock accent for hero corners
 * and background flourishes.
 */
function BlobShape({
  className,
  color = "currentColor",
  opacity = 0.1,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" style={{ opacity }} fill={color}>
      <g transform="rotate(-18 100 100)">
        {/* Leaf body */}
        <path d="M100 22 C 58 32 32 70 30 118 C 28 162 62 186 100 180 C 138 186 172 162 170 118 C 168 70 142 32 100 22 Z" />
        {/* Central vein */}
        <rect x="98.5" y="40" width="3" height="142" rx="1.4" opacity="0.55" />
        {/* Side veins suggesting monstera splits */}
        <g stroke={color} strokeWidth="1.6" fill="none" opacity="0.65">
          <path d="M100 70 Q 78 78 56 92" />
          <path d="M100 70 Q 122 78 144 92" />
          <path d="M100 110 Q 72 120 46 136" />
          <path d="M100 110 Q 128 120 154 136" />
          <path d="M100 150 Q 80 156 64 170" />
          <path d="M100 150 Q 120 156 136 170" />
        </g>
      </g>
    </svg>
  );
}

/**
 * RingShape → Art Deco fan.
 * A half-fan composed of alternating radial wedges, the classic
 * "Texas sunset" fan motif over the Hill Country horizon.
 */
function RingShape({
  className,
  color = "currentColor",
  opacity = 0.2,
}: Readonly<{
  className?: string;
  color?: string;
  opacity?: number;
}>) {
  const wedges = Array.from({ length: 11 }, (_, i) => {
    const start = Math.PI + (i * Math.PI) / 11;
    const end = Math.PI + ((i + 1) * Math.PI) / 11;
    const r = 88;
    return {
      x1: 100 + Math.cos(start) * r,
      y1: 100 + Math.sin(start) * r,
      x2: 100 + Math.cos(end) * r,
      y2: 100 + Math.sin(end) * r,
      filled: i % 2 === 0,
    };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" style={{ opacity }}>
      <g>
        {wedges.map((w, i) => (
          <path
            key={`fan-${i}`}
            d={`M 100 100 L ${w.x1} ${w.y1} A 88 88 0 0 1 ${w.x2} ${w.y2} Z`}
            fill={w.filled ? color : "none"}
            stroke={color}
            strokeWidth="1.1"
          />
        ))}
      </g>
      {/* Centerpiece */}
      <circle cx="100" cy="100" r="6" fill={color} />
      <path
        d="M 12 100 A 88 88 0 0 1 188 100"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ---------------- Trust Row ---------------- */
function TrustRow() {
  const items = [
    { icon: Star, value: `${SITE_CONFIG.stats.reviewsRating}/5`, label: `${SITE_CONFIG.stats.reviewsCount} reviews`, stars: true },
    { icon: Users, value: SITE_CONFIG.stats.businessesFunded, label: "Businesses funded" },
    { icon: HandCoins, value: SITE_CONFIG.stats.loansFacilitated, label: "Loans facilitated" },
    { icon: ShieldCheck, value: "Bank-Level", label: "Secure & encrypted" },
  ];
  const badges = SITE_CONFIG.trustBadges;
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {items.map((i) => (
              <div key={i.label} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-[color:var(--brand-blue)]">
                  <i.icon className={`h-4 w-4 ${i.stars ? "fill-amber-400 text-amber-400" : ""}`} />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold tracking-tight text-foreground">{i.value}</span>
                  <span className="block text-[11px] text-muted-foreground">{i.label}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="hidden h-8 w-px bg-border lg:block" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-muted-foreground">
            {badges.map((b) => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-[color:var(--accent-success)]" />
                {b}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          There are <strong className="font-semibold text-foreground">{SITE_CONFIG.featuredStat.value}</strong> {SITE_CONFIG.featuredStat.claim}. <a
            href={SITE_CONFIG.featuredStat.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Source: {SITE_CONFIG.featuredStat.sourceName}
          </a>.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Why us ---------------- */
function WhyUs() {
  const cards = [
    {
      icon: Clock,
      title: "Fast Decisions",
      desc: `Pre-qualify in minutes. Same-day funding available for qualified ${CITY} files.`,
      stat: "Less than 48 hours",
      statLabel: "Average funding time",
    },
    {
      icon: Banknote,
      title: "Flexible Funding",
      desc: "From $10,000 working capital to $3,000,000 SBA acquisitions - sized to the deal.",
      stat: "$10K-$3M",
      statLabel: "Funding range",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Terms",
      desc: "Clear APR disclosure, no prepayment penalties, no hidden fees, no surprises.",
      stat: "0 hidden fees",
      statLabel: "Clear pricing, every deal",
    },
    {
      icon: PhoneCall,
      title: "Dedicated Banker",
      desc: `A ${CITY}-based banker who reviews your file, packages it, and shops 75+ lenders for you.`,
      stat: "1:1 advisor",
      statLabel: "Downtown-based team",
    },
    {
      icon: Users,
      title: "Local Expertise",
      desc: `Downtown, East Austin, Westlake, Domain - Central Texas underwriting that knows each submarket.`,
      stat: "75+",
      statLabel: "Lending partners",
    },
    {
      icon: Briefcase,
      title: "Every Industry",
      desc: "Hospitality, healthcare, real estate, logistics, professional services and more.",
      stat: "All sectors",
      statLabel: "Tailored programs",
    },
  ];
  const [hero, ...rest] = cards;
  return (
    <section className="relative overflow-hidden bg-[color:var(--brand-sand)]/40 py-20 text-foreground md:py-24">
      <SunShape
        className="pointer-events-none absolute -right-40 -top-32 h-80 w-80 text-[color:var(--brand-gold)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Left-aligned heading with vertical accent bar */}
        <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-end md:gap-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[color:var(--brand-gold)]" />
              The Austin Edge
            </div>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Why Austin operators choose us
            </h2>
          </div>
          <p className="text-base text-muted-foreground md:text-lg">
            Built for {CITY_STATE} businesses - fast decisions, transparent terms,
            and a banker who knows the difference between a Domain deal and a
            Round Rock deal.
          </p>
        </div>

        {/* Hero panel (left) + ledger rows (right) */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_1.4fr]">
          {/* Hero stat panel */}
          <article
            className="relative overflow-hidden rounded-3xl p-8 text-white shadow-[var(--shadow-elegant)]"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Feature
            </span>
            <div className="mt-6 flex items-baseline gap-3">
              <div className="text-6xl font-bold leading-none text-[color:var(--brand-gold)] md:text-7xl">
                {hero.stat}
              </div>
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/60">
              {hero.statLabel}
            </div>
            <h3 className="mt-8 text-2xl font-semibold tracking-tight">
              {hero.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {hero.desc}
            </p>
          </article>

          {/* Ledger rows */}
          <ul className="divide-y divide-[color:var(--brand-gold)]/15 rounded-3xl border border-[color:var(--brand-gold)]/20 bg-card">
            {rest.map(({ icon: Icon, title, desc, stat, statLabel }, i) => (
              <li
                key={title}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 px-5 py-5 transition-colors hover:bg-[color:var(--brand-sand)]/60 sm:px-7"
              >
                <span className="font-mono text-xs text-[color:var(--brand-gold)]">
                  0{i + 2}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-gold)]/10 text-[color:var(--brand-gold)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="text-xl font-bold text-[color:var(--brand-blue)]">
                    {stat}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
                    {statLabel}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Intro (SEO) ---------------- */
function CityIntro() {
  const neighborhoods = [
    "Downtown Austin", "South Congress", "East Austin", "The Domain",
    "Westlake", "Mueller", "Round Rock", "Cedar Park", "Pflugerville", "Lakeway",
  ];
  const uses = ["Expansion", "Payroll", "Inventory", "Equipment", "Marketing", "Cash Flow"];
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-10 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-start">
          {/* Left rail - pill stack */}
          <aside className="hidden md:block">
            <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Common Uses
            </div>
            <ul className="mt-5 space-y-2.5">
              {uses.map((u) => (
                <li
                  key={u}
                  className="flex items-center gap-2.5 rounded-lg border-l-2 border-[color:var(--brand-gold)] bg-card px-3 py-2 text-sm text-foreground shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--accent-success)]" />
                  {u}
                </li>
              ))}
            </ul>
          </aside>

          {/* Divider rule (desktop only) */}
          <span aria-hidden className="hidden h-full w-px bg-border md:block" />

          {/* Main copy */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Business Loans for {CITY} Companies
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you operate in {neighborhoods.slice(0, 5).join(", ")} or anywhere across
              Travis and Williamson counties and the broader Central Texas Hill Country, our lending network helps local businesses secure the capital
              they need to grow. From <strong>SBA 7(a) loans</strong> and{" "}
              <strong>business lines of credit</strong> to <strong>equipment financing</strong>,{" "}
              <strong>working capital loans</strong> and <strong>invoice factoring</strong>,
              we connect {CITY} owners with the right funding product, fast.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our marketplace works with short-term lenders, SBA preferred banks, equipment
              financiers and merchant cash advance providers, so you can compare{" "}
              <strong>fast business loans</strong>, <strong>startup business loans</strong>{" "}
              and <strong>same-day business funding</strong> in one place.
            </p>
          </div>
        </div>

        {/* Neighborhood ribbon */}
        <div className="mt-10 rounded-2xl border border-border bg-card/70 px-5 py-5 backdrop-blur">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--brand-gold)]">
              <MapPin className="h-3.5 w-3.5" /> Neighborhoods
            </span>
            <span aria-hidden className="h-4 w-px bg-border" />
            {neighborhoods.map((n) => (
              <span
                key={n}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Mobile uses list */}
        <ul className="mt-8 grid grid-cols-2 gap-3 md:hidden">
          {uses.map((u) => (
            <li
              key={u}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm"
            >
              <CheckCircle2 className="h-4 w-4 text-[color:var(--accent-success)]" /> {u}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- City Hub CTA ---------------- */
function CityHubCTA() {
  const highlights = [
    "10 neighborhoods & adjacent cities",
    "38 loan programs mapped locally",
    "Direct links to every suburb × service page",
  ];
  return (
    <section className="relative overflow-hidden py-10 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="overflow-hidden rounded-3xl border border-border p-6 text-white sm:p-8 md:p-14"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                <MapPin className="h-3.5 w-3.5" /> Explore the Austin Hub
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                Every neighborhood. Every loan program. One directory.
              </h2>
              <p className="mt-3 max-w-xl text-white/80">
                Jump into the Austin city hub to browse all suburbs we serve and the
                services available in each. Every combination opens its own locally written page.
              </p>
              <ul className="mt-6 space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="h-4 w-4 text-[color:var(--accent-success)]" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-[color:var(--primary)] hover:bg-white/90 sm:w-auto"
                >
                  <Link to="/austin">
                    Visit the Austin Hub <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  <Link to="/apply-now">Apply Now</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur sm:p-6">
              <div className="text-xs uppercase tracking-wider text-white/70">Inside the hub</div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">12</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Suburbs</div>
                </div>
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">45</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Programs</div>
                </div>
                <div className="rounded-xl bg-white/10 p-2.5 sm:p-4">
                  <div className="text-base font-bold sm:text-2xl">95+</div>
                  <div className="mt-1 whitespace-nowrap text-[9px] uppercase tracking-wide text-white/70 sm:text-[11px] sm:tracking-wider">Local Pages</div>
                </div>
              </div>
              <Link
                to="/austin"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white hover:underline"
              >
                Browse the full directory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Loan Types ---------------- */
function LoanTypes() {
  const loans = [
    { icon: FileText, title: "SBA Loans", tagline: "From 8.5% APR", desc: "SBA 7(a) and 504 - the lowest rates and longest terms available to Austin small businesses.", popular: true },
    { icon: LineChart, title: "Working Capital Loans", tagline: "Funded in 24 hrs", desc: "Cover payroll, inventory and seasonal gaps with capital sized to your real cash cycle.", popular: true },
    { icon: CreditCard, title: "Business Line of Credit", tagline: "From 9.9% APR", desc: "Revolving capital you draw when you need it. Only pay interest on what you use.", popular: false },
    { icon: Wrench, title: "Equipment Financing", tagline: "From 6.99%", desc: "Equipment serves as collateral. Easy approvals for trucking, construction and medical.", popular: false },
    { icon: Home, title: "Commercial Real Estate", tagline: "Up to 25-yr amort.", desc: "SBA 504 and conventional CRE for Downtown, the Domain, SH-130 and the Austin corridor.", popular: false },
    { icon: Receipt, title: "Invoice Factoring & AR", tagline: "Same-day cash", desc: "Turn outstanding invoices into liquidity. Built for SH-130 freight and Samsung/Tesla supplier flows.", popular: false },
  ];
  const featured = loans.filter((l) => l.popular);
  const more = loans.filter((l) => !l.popular);
  return (
    <section id="loans" className="relative overflow-hidden bg-background py-20 md:py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Left-aligned heading */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Capital Menu
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Loan programs for {CITY_STATE}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Every major funding product, compared through one soft-pull application.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="hidden border-[color:var(--brand-gold)]/40 text-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)]/10 hover:text-[color:var(--brand-gold)] md:inline-flex"
          >
            <Link to="/apply-now">
              Pre-qualify in 60s <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Featured pair */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featured.map(({ icon: Icon, title, tagline, desc }) => (
            <Link
              to="/apply-now"
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-[color:var(--primary)] p-8 text-white shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-1"
            >
              <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-gold)]/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-gold)] ring-1 ring-[color:var(--brand-gold)]/40">
                <Sparkles className="h-2.5 w-2.5" /> Most Requested
              </div>
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[color:var(--brand-gold-foreground)] shadow-sm"
                style={{ background: "var(--gradient-cta)" }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{title}</h3>
              <div className="mt-1 text-sm font-medium text-[color:var(--brand-gold)]">
                {tagline}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{desc}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-gold)]">
                Apply now
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* Rest as compact list rows */}
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {more.map(({ icon: Icon, title, tagline, desc }) => (
            <li key={title}>
              <Link
                to="/apply-now"
                className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-[color:var(--brand-gold)]/60 hover:bg-[color:var(--brand-sand)]/50"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-gold)]/10 text-[color:var(--brand-gold)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="truncate text-base font-semibold tracking-tight">
                      {title}
                    </h3>
                    <span className="shrink-0 text-xs font-medium text-[color:var(--brand-gold)]">
                      {tagline}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                    {desc}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-[color:var(--brand-gold)]" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- How it works (Art Deco numbered timeline) ---------------- */
function HowItWorks() {
  const steps = [
    { title: "Complete Application", desc: "Tell us about your business in 60 seconds. Soft pull only.", icon: FileText },
    { title: "Get Matched",          desc: "We package your file and shop 75+ lenders for you.",          icon: Users },
    { title: "Compare Offers",       desc: "Review rates, terms and monthly payments side by side.",     icon: LineChart },
    { title: "Receive Funding",      desc: "Sign and get funded - often in as little as 24 hours.",       icon: HandCoins },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-[color:var(--primary)] py-20 text-white md:py-28">
      <SunShape className="pointer-events-none absolute -right-40 -bottom-32 h-80 w-80 text-[color:var(--brand-gold)] opacity-25" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header - left aligned */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
            The Process
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Funding made simple
          </h2>
          <p className="mt-4 text-white/75 md:text-lg">
            Four steps from first call to wired funds. No surprises, no scripts.
          </p>
        </div>

        {/* Vertical staggered timeline */}
        <ol className="relative mt-16 space-y-10 md:space-y-0">
          {/* Vertical rail (desktop) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-8 top-2 hidden h-[calc(100%-1rem)] w-px bg-[color:var(--brand-gold)]/30 md:block"
          />
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <li
              key={title}
              className={`relative md:grid md:grid-cols-[4rem_1fr] md:gap-6 md:py-8 ${
                i !== steps.length - 1 ? "md:border-b md:border-white/10" : ""
              }`}
            >
              {/* Number badge */}
              <div className="relative flex items-center gap-4 md:block">
                <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--brand-gold)] text-[color:var(--brand-gold-foreground)] shadow-[0_0_30px_color-mix(in_oklab,var(--brand-gold)_40%,transparent)]">
                  <span className="text-2xl font-bold">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)] md:hidden">
                  Step {i + 1}
                </span>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
                  <Icon className="h-3.5 w-3.5" /> Step {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Industries (Art Deco tiles + monstera accents) ---------------- */
function Industries() {
  const inds = [
    { icon: Landmark,         label: "Real Estate",         slug: "real-estate",          micro: "CRE · 1031 · Bridge" },
    { icon: Hotel,            label: "Hospitality",         slug: "restaurants",          micro: "Hotels · Restaurants" },
    { icon: HeartPulse,       label: "Healthcare",          slug: "healthcare",           micro: "Med-spa · Dental · MD" },
    { icon: Scale,            label: "Professional",        slug: "professional-services",micro: "Law · Accounting" },
    { icon: Package,          label: "Logistics",           slug: "transportation",       micro: "SH-130 · ABIA" },
    { icon: HardHat,          label: "Construction",        slug: "construction",         micro: "GC · Subs · Yards" },
    { icon: Gem,              label: "Retail & Luxury",     slug: "retail",               micro: "SoCo · Domain" },
    { icon: Cog,              label: "Manufacturing",       slug: "manufacturing",        micro: "SH-130 · Taylor" },
    { icon: Code2,            label: "Technology",          slug: "technology",           micro: "SaaS · Fintech" },
    { icon: ShoppingCart,     label: "E-Commerce",          slug: "e-commerce",           micro: "DTC · Cross-border" },
  ];
  const [feat1, feat2, ...rest] = inds;
  return (
    <section id="industries" className="relative overflow-hidden bg-[color:var(--brand-sand)]/30 py-20 md:py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading + CTA */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Sectors
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Industries we fund in {CITY}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
              Specialty programs for the sectors that drive Central Texas - built by bankers who know each one cold.
            </p>
          </div>
          <Button
            asChild
            className="hidden bg-[image:var(--gradient-cta)] text-white md:inline-flex"
          >
            <Link to="/austin" className="flex items-center gap-2">
              <span>Browse Austin directory</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>

        {/* Bento layout: 2 featured + 8 compact */}
        <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {/* Featured tile 1 - large */}
          <Link
            to="/industry/$slug"
            params={{ slug: feat1.slug }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[color:var(--primary)] p-6 text-white shadow-[var(--shadow-elegant)] transition-all hover:-translate-y-1 md:col-span-2 md:row-span-2"
          >
            <SunShape className="pointer-events-none absolute -right-24 -bottom-20 h-72 w-72 text-[color:var(--brand-gold)] opacity-25" />
            <div className="relative">
              <span
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-[color:var(--brand-gold-foreground)] shadow-sm"
                style={{ background: "var(--gradient-cta)" }}
              >
                <feat1.icon className="h-6 w-6" />
              </span>
              <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
                {feat1.micro}
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight">{feat1.label}</h3>
              <p className="mt-3 max-w-sm text-sm text-white/70">
                Programs tuned to the {feat1.label.toLowerCase()} sector across the {CITY} metro.
              </p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--brand-gold)]">
              Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Featured tile 2 - wide */}
          <Link
            to="/industry/$slug"
            params={{ slug: feat2.slug }}
            className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-[color:var(--brand-gold)]/30 bg-[image:var(--gradient-cta)] p-6 text-white shadow-sm transition-all hover:-translate-y-1 md:col-span-2"
          >
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-current">
              <feat2.icon className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <h3 className="text-xl font-semibold tracking-tight">{feat2.label}</h3>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] opacity-80">
                {feat2.micro}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Remaining 8 compact tiles */}
          {rest.map(({ icon: Icon, label, slug, micro }) => (
            <Link
              key={slug}
              to="/industry/$slug"
              params={{ slug }}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-[color:var(--brand-gold)]/60 hover:bg-[color:var(--brand-sand)]/60"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color:var(--brand-gold)]/10 text-[color:var(--brand-gold)] transition-transform group-hover:scale-110">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold tracking-tight">
                  {label}
                </div>
                <div className="truncate text-[10px] uppercase tracking-[0.18em] text-muted-foreground/80">
                  {micro}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button
            asChild
            className="bg-[image:var(--gradient-cta)] text-white"
          >
            <Link to="/austin" className="flex items-center gap-2">
              <span>Browse Austin directory</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Calculator ---------------- */
function Calculator() {
  const [amount, setAmount] = useState(100_000);
  const [term, setTerm] = useState(60); // months
  const [rate, setRate] = useState(10.5); // %

  const { monthly, total, interest } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = term;
    const m = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const t = m * n;
    return { monthly: m, total: t, interest: t - amount };
  }, [amount, term, rate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <section id="calculator" className="relative overflow-hidden bg-background py-20 md:py-24">
      <DotGrid className="pointer-events-none absolute inset-0 h-full w-full text-[color:var(--brand-gold)]" opacity={0.06} />
      <SunShape className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 text-[color:var(--brand-gold)] opacity-25" />

      {/* Heading */}
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="flex items-center justify-center gap-3 text-[color:var(--brand-gold)]">
          <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
          <DiamondMark className="h-2.5 w-2.5" />
          <span className="text-xs font-semibold uppercase tracking-[0.32em]">The Numbers</span>
          <DiamondMark className="h-2.5 w-2.5" />
          <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
          Estimate your {CITY} business loan
        </h2>
        <p className="mt-5 text-muted-foreground md:text-lg">
          Adjust amount, term and rate. Real offers from our lender network may price lower based on your business profile.
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid min-w-0 max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1.1fr_1fr]">
        {/* Sliders panel - deco frame */}
        <div className="relative overflow-hidden rounded-3xl border border-[color:var(--brand-gold)]/40 bg-card p-6 shadow-[var(--shadow-elegant)] sm:p-8">
          {/* Frame pinstripes */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)] to-transparent" />
          <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand-gold)]/50 to-transparent" />
          <DiamondMark className="pointer-events-none absolute left-3 top-3 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-3 top-3 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute left-3 bottom-3 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-3 bottom-3 h-2 w-2 text-[color:var(--brand-gold)]" />

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
            <TrendingUp className="h-3 w-3" /> Adjust your terms
          </div>

          <div className="mt-8 space-y-8">
            <Field label="Loan amount" value={fmt(amount)}>
              <Slider
                value={[amount]}
                min={5000}
                max={1_000_000}
                step={5000}
                onValueChange={(v) => setAmount(v[0] ?? amount)}
              />
            </Field>
            <Field label="Term" value={`${term} months`}>
              <Slider
                value={[term]}
                min={6}
                max={120}
                step={6}
                onValueChange={(v) => setTerm(v[0] ?? term)}
              />
            </Field>
            <Field label="Interest rate" value={`${rate.toFixed(1)}%`}>
              <Slider
                value={[rate]}
                min={5}
                max={30}
                step={0.5}
                onValueChange={(v) => setRate(v[0] ?? rate)}
              />
            </Field>
          </div>
        </div>

        {/* Result panel - Art Deco poster */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-[color:var(--brand-gold)] bg-[color:var(--primary)] p-6 text-white shadow-[var(--shadow-glow)] sm:p-8">
          {/* Sunburst behind the headline number */}
          <SunShape className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 text-[color:var(--brand-gold)] opacity-40" />
          {/* Inner gold frame */}
          <span className="pointer-events-none absolute inset-3 rounded-2xl border border-[color:var(--brand-gold)]/40" />
          <DiamondMark className="pointer-events-none absolute left-5 top-5 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-5 top-5 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute left-5 bottom-5 h-2 w-2 text-[color:var(--brand-gold)]" />
          <DiamondMark className="pointer-events-none absolute right-5 bottom-5 h-2 w-2 text-[color:var(--brand-gold)]" />

          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              <DiamondMark className="h-1.5 w-1.5" /> Your estimate
            </div>

            {/* Hero monthly payment number */}
            <div className="mt-6 text-center">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/70">Monthly payment</div>
              <div
                className="mt-2 bg-clip-text font-serif text-5xl font-bold tracking-tight text-transparent sm:text-6xl"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, oklch(0.95 0.13 85), oklch(0.72 0.16 50))",
                }}
              >
                {fmt(monthly)}
              </div>
              <div className="mt-3 flex items-center justify-center gap-3" aria-hidden="true">
                <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
                <DiamondMark className="h-1.5 w-1.5 text-[color:var(--brand-gold)]" />
                <span className="h-px w-12 bg-[color:var(--brand-gold)]/60" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Total cost</div>
                <div className="mt-1.5 text-lg font-semibold">{fmt(total)}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">Interest paid</div>
                <div className="mt-1.5 text-lg font-semibold">{fmt(interest)}</div>
              </div>
            </div>

            <Button
              size="lg"
              asChild
              className="mt-7 w-full bg-[image:var(--gradient-cta)] text-white shadow-[var(--shadow-glow)]"
            >
              <Link to="/apply-now">
                Get real offers in {CITY} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <p className="mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-white/55">
              Estimate only · Real terms set by lender at close
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, children }: Readonly<{ label: string; value: string; children: React.ReactNode }>) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className="text-sm font-semibold text-[color:var(--brand-blue)]">{value}</span>
      </div>
      {children}
    </div>
  );
}

/* ---------------- Success Stories ---------------- */
function SuccessStories() {
  const stories = [
    { name: "Congress Avenue Wealth Advisors", amount: "$1,400,000", result: "Funded a partner buy-in and Downtown office build-out.", type: "SBA 7(a) Loan" },
    { name: "East Sixth Tortilla Co.", amount: "$320,000", result: "Acquired second location plus working capital for opening.", type: "SBA 7(a) + Working Capital" },
    { name: "SH-130 Freight Forwarders", amount: "$2,100,000", result: "Purchased a Pflugerville flex warehouse and added two reefer trucks.", type: "SBA 504 + Equipment" },
  ];
  const [feature, ...others] = stories;
  return (
    <section id="stories" className="relative overflow-hidden px-6 py-10 sm:py-20">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[2fr_3fr] md:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Funded
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              {CITY} businesses we've funded
            </h2>
          </div>
          <p className="text-muted-foreground">
            Real outcomes from local owners in our funding network.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.4fr_1fr]">
          {/* Featured large story */}
          <article className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-cta)] p-8 text-white shadow-[var(--shadow-elegant)]">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-black/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                Featured story
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={`feat-star-${i}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <div className="mt-10 text-6xl font-bold tracking-tight md:text-7xl">
              {feature.amount}
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
              {feature.type}
            </div>
            <h3 className="mt-8 text-2xl font-semibold">{feature.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed opacity-90">
              {feature.result}
            </p>
          </article>

          {/* Smaller stories stacked */}
          <div className="grid gap-5">
            {others.map((s) => (
              <article
                key={s.name}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[color:var(--brand-gold)]/40"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-2xl font-bold text-[color:var(--brand-gold)]">
                    {s.amount}
                  </div>
                  <div className="flex items-center gap-0.5 text-[color:var(--accent-success)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={`star-${s.name}-${i}`} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="mt-3 text-base font-semibold">{s.name}</h3>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.type}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.result}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- City Data ---------------- */
function CityData() {
  const stats = [
    { k: "$10K-$3M", v: "Funding range" },
    { k: "48 hrs", v: "Fastest funding" },
    { k: "600+", v: "Minimum FICO" },
    { k: "12 mo+", v: "Time in business" },
  ];
  return (
    <section className="relative overflow-hidden bg-secondary/40 py-10 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              The {CITY} Market
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Why businesses in {CITY} need flexible financing
            </h2>
            <p className="mt-5 text-muted-foreground">
              From freight forwarders along SH-130 and ABIA cargo to restaurants on South Congress, medical
              practices in Westlake and Cedar Park, and contractors expanding across the Domain and the
              industrial corridor. Growing labor costs, equipment upgrades,
              inventory demands, seasonal fluctuations and new contracts often require quick access to
              capital. Our lending marketplace helps {CITY_STATE} businesses secure{" "}
              <strong>SBA loans</strong>, <strong>business lines of credit</strong> and{" "}
              <strong>working capital</strong> tailored to local market conditions.
            </p>
          </div>

          {/* Vertical stat list */}
          <ul className="space-y-3">
            {stats.map((s) => (
              <li
                key={s.v}
                className="flex items-baseline justify-between border-b border-border pb-3"
              >
                <span className="text-sm text-muted-foreground">{s.v}</span>
                <span className="text-2xl font-bold text-[color:var(--brand-gold)]">
                  {s.k}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security ---------------- */
function Security() {
  const items = [
    { icon: Lock, title: "SSL Secured" },
    { icon: ShieldCheck, title: "Bank-Level Encryption" },
    { icon: Users, title: "Privacy Protected" },
    { icon: CheckCircle2, title: "Licensed Lending Partners" },
  ];
  return (
    <section className="relative px-6 py-12">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-border py-6">
          {items.map(({ icon: Icon, title }, idx) => (
            <div key={title} className="flex items-center gap-2.5">
              <Icon className="h-5 w-5 text-[color:var(--accent-success)]" />
              <span className="text-sm font-medium tracking-tight">{title}</span>
              {idx !== items.length - 1 && (
                <span aria-hidden className="ml-6 hidden h-4 w-px bg-border md:inline-block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQSection() {
  return (
    <section id="faq" className="relative px-6 py-10 sm:py-20">
      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start">
          <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
            FAQ
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything {CITY} business owners want to know before applying.
          </p>
          <Button
            asChild
            variant="outline"
            className="mt-6 border-[color:var(--brand-gold)]/40 text-[color:var(--brand-gold)] hover:bg-[color:var(--brand-gold)]/10 hover:text-[color:var(--brand-gold)]"
          >
            <Link to="/contact">
              Still have questions? <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {HOME_FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {f.q}
              </AccordionTrigger>
              <AccordionContent forceMount className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-14 sm:py-20 text-white"
      style={{ backgroundImage: "var(--gradient-hero)" }}
    >
      <SunShape
        className="pointer-events-none absolute -right-40 -top-32 h-80 w-80 text-[color:var(--brand-gold)] opacity-25"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Get Started
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
              Ready to explore your loan options in {CITY}?
            </h2>
            <p className="mt-4 max-w-xl text-white/80">
              Get matched with lenders serving businesses in {CITY_STATE}. No impact on credit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                asChild
                className="bg-[image:var(--gradient-cta)] text-white shadow-[var(--shadow-glow)]"
              >
                <Link to="/apply-now">
                  Get my loan options <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/contact">Talk to a banker</Link>
              </Button>
            </div>
          </div>

          {/* Phone callout card */}
          <a
            href={SITE_CONFIG.phoneHref}
            className="group relative flex flex-col gap-3 rounded-3xl border border-[color:var(--brand-gold)]/40 bg-white/5 p-6 backdrop-blur transition-colors hover:bg-white/10 md:p-8"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[color:var(--brand-gold)]">
              Speak to a banker
            </span>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--brand-gold)]/20 text-[color:var(--brand-gold)]">
                <PhoneCall className="h-5 w-5" />
              </span>
              <div className="text-2xl font-bold tracking-tight md:text-3xl">
                {SITE_CONFIG.phone}
              </div>
            </div>
            <p className="text-sm text-white/70">
              {CITY_STATE} bankers available now. No obligation.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-border bg-[color:var(--brand-sand)] text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        <div>
          <div className="-ml-2 -mt-2 flex items-center font-semibold">
            <img src={siteLogoUrl} alt={SITE_CONFIG.name} className="h-[96px] w-auto" />
          </div>
          
          <address className="mt-4 not-italic space-y-1 text-sm text-muted-foreground">
            <div className="font-semibold text-foreground">{SITE_CONFIG.name}</div>
            {SITE_CONFIG.hasPublicOffice ? (
              <div>
                {SITE_CONFIG.address.streetAddress}
                <br />
                {SITE_CONFIG.address.addressLocality}, {SITE_CONFIG.address.addressRegion}{" "}
                {SITE_CONFIG.address.postalCode}
              </div>
            ) : (
              <div>Serving {SITE_CONFIG.areasServed.join(" · ")}</div>
            )}
            <div>
              <a href={SITE_CONFIG.phoneHref} className="hover:text-foreground">
                {SITE_CONFIG.phone}
              </a>
            </div>
            {SITE_CONFIG.license.state && SITE_CONFIG.license.licenseNumber && (
              <div className="pt-1 text-xs">
                {SITE_CONFIG.license.state} license #{SITE_CONFIG.license.licenseNumber}
              </div>
            )}
          </address>
        </div>
        <FooterCol
          title="Financing"
          links={[
            { label: "SBA Loans", pillar: "sba-loans" },
            { label: "Business Line of Credit", pillar: "business-line-of-credit" },
            { label: "Short-Term Business Loans", pillar: "short-term-business-loans" },
            { label: "Working Capital Loans", pillar: "working-capital-loans" },
            { label: "Merchant Cash Advance", pillar: "merchant-cash-advance" },
            { label: "Invoice Factoring", pillar: "invoice-factoring" },
          ]}
        />
        <FooterCol
          title="Sectors"
          links={[
            { label: "Construction", industry: "construction" },
            { label: "Healthcare", industry: "healthcare" },
            { label: "Restaurants", industry: "restaurants" },
            { label: "Transportation", industry: "transportation" },
            { label: "Manufacturing", industry: "manufacturing" },
            { label: "E-Commerce", industry: "e-commerce" },
          ]}
        />
        <FooterCol
          title="About Us"
          links={[
            { label: "Apply Now", to: "/apply-now" },
            { label: "Contact", to: "/contact" },
            { label: "Service Areas", to: "/austin" },
            { label: "How It Works", to: "/", hash: "how" },
            { label: "Success Stories", to: "/", hash: "stories" },
            { label: "FAQs", to: "/", hash: "faq" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl space-y-3 px-6 py-6 text-xs text-muted-foreground">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}, {CITY_STATE}. All rights reserved.</p>
            <p>
              Reviewed by{" "}
              <a
                href={SITE_CONFIG.author.profileUrl}
                rel="author"
                className="font-medium text-foreground hover:underline"
              >
                {SITE_CONFIG.author.name}
              </a>
              , {SITE_CONFIG.author.title} ({SITE_CONFIG.author.credentials}).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLink =
  | { label: string; pillar: string }
  | { label: string; industry: string }
  | { label: string; to: "/" | "/apply-now" | "/contact" | "/austin"; hash?: string };

function FooterCol({ title, links }: Readonly<{ title: string; links: FooterLink[] }>) {
  const linkClass = "hover:text-foreground text-left";
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            {"pillar" in l ? (
              <Link to="/pillar/$slug" params={{ slug: l.pillar }} className={linkClass}>
                {l.label}
              </Link>
            ) : "industry" in l ? (
              <Link to="/industry/$slug" params={{ slug: l.industry }} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <Link to={l.to} hash={l.hash} className={linkClass}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
