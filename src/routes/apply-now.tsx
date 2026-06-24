import { createFileRoute } from "@tanstack/react-router";
import { Header, Footer } from "./index";
import { buildHead } from "@/lib/seo";
import { buildGraph } from "@/lib/seo-schema";
import { SITE_CONFIG } from "@/lib/site-config";
import { GHLForm } from "@/components/GHLForm";
import {
  CheckCircle2,
  Clock,
  Lock,
  Phone,
  ShieldCheck,
  FileText,
  Search,
  Banknote,
} from "lucide-react";

const CITY = "Austin";
const CITY_STATE = "Austin, TX";

export const Route = createFileRoute("/apply-now")({
  head: () => {
    const title = "Apply Now";
    const description = `Apply for a business loan in ${CITY_STATE}. Soft credit pull only, no impact to your credit score. Get matched with funding programs in 60 seconds.`;
    return buildHead({
      title,
      description,
      path: "/apply-now",
      noindex: true,
      schema: buildGraph({ title, description, path: "/apply-now" }),
    });
  },
  component: ApplyNowPage,
});

function ApplyNowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section
        className="relative overflow-hidden border-b border-border py-12 text-white"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> Soft pull · No credit impact
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Apply for funding in minutes
          </h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Tell us about your business and we'll match you with funding programs you actually qualify
            for, across {CITY_STATE} and beyond.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Funds in 24-72 hrs
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5" /> 256-bit SSL secured
            </span>
            <span>•</span>
            <span>$10K-$3M available</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 sm:grid-cols-3">
          {[
            { n: "1", icon: FileText, title: "Apply", desc: "Fill the form in 60 seconds." },
            { n: "2", icon: Search, title: "Match", desc: "We shop 75+ Texas lenders." },
            { n: "3", icon: Banknote, title: "Fund", desc: "Choose an offer, get funded in 24-72 hrs." },
          ].map((s) => (
            <div key={s.n} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <div className="relative inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[color:var(--brand-blue)]/10 text-[color:var(--brand-blue)]">
                <s.icon className="h-5 w-5" />
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--brand-blue)] text-[10px] font-bold text-primary-foreground">
                  {s.n}
                </span>
              </div>
              <div>
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="mx-auto grid min-w-0 max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
        <div className="relative min-w-0 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div
            className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          <GHLForm />
        </div>

        <aside className="min-w-0 space-y-4 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-[color:var(--accent-success)]" /> Why it's safe
            </div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--accent-success)]" />
                Soft credit pull, never affects your score
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--accent-success)]" />
                Bank-level 256-bit encryption
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[color:var(--accent-success)]" />
                No obligation, compare offers freely
              </li>
            </ul>
          </div>
          <div
            className="rounded-2xl p-5 text-white"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="text-xs uppercase tracking-wide text-white/70">By the numbers</div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-2xl font-bold">{SITE_CONFIG.stats.businessesFunded}</div>
                <div className="text-white/70">Businesses funded</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{SITE_CONFIG.stats.loansFacilitated}</div>
                <div className="text-white/70">Loans facilitated</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{SITE_CONFIG.stats.reviewsRating}★</div>
                <div className="text-white/70">{SITE_CONFIG.stats.reviewsCount} reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{SITE_CONFIG.stats.fastestFundingHours}</div>
                <div className="text-white/70">Fastest funding</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm">
            <div className="flex items-center gap-2 font-semibold">
              <Phone className="h-4 w-4 text-[color:var(--brand-blue)]" />
              Need help?
            </div>
            <p className="mt-1 text-muted-foreground">
              Talk to a {CITY} funding advisor.
            </p>
            <a
              href={SITE_CONFIG.phoneHref}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--brand-blue)]/40 bg-card px-3 py-2 font-semibold text-[color:var(--brand-blue)] transition-colors hover:bg-[color:var(--brand-blue)]/10"
            >
              <Phone className="h-4 w-4" /> {SITE_CONFIG.phone}
            </a>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
