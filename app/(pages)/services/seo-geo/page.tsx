'use client';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";
import {
  BadgeCheck,
  GaugeCircle,
  Globe2,
  LayoutDashboard,
  MapPin,
  Search,
  SignalHigh,
  Sparkles,
} from "lucide-react";

const detail = serviceDetails["seo-geo"];

const scopeItems = [
  {
    title: "Technical SEO audit",
    benefit: "Crawl analysis, index health, and schema checks to uncover hidden gaps.",
    icon: Search,
  },
  {
    title: "Site performance & crawlability",
    benefit: "Core Web Vitals and site architecture tuned for speed and clarity.",
    icon: GaugeCircle,
  },
  {
    title: "Content architecture & intent",
    benefit: "Topic clusters, internal linking, and page templates built for conversion.",
    icon: LayoutDashboard,
  },
  {
    title: "Local and geo expansion",
    benefit: "Location pages, listings, and hreflang setups for new markets.",
    icon: MapPin,
  },
  {
    title: "Authority & link strategy",
    benefit: "Digital PR and backlink planning aligned to your growth goals.",
    icon: BadgeCheck,
  },
  {
    title: "Reporting & experimentation",
    benefit: "Dashboards, rank tracking, and testing loops that prove impact.",
    icon: SignalHigh,
  },
];

const methodologyPillars = [
  {
    title: "Technical foundation",
    points: [
      "Crawl budgets, indexing strategy, and schema markup tuned for scale.",
      "Performance fixes mapped to conversion and visibility gains.",
    ],
  },
  {
    title: "Content and intent mapping",
    points: [
      "Search intent analysis tied to product funnels and conversion goals.",
      "Cluster strategy that consolidates authority and guides internal links.",
    ],
  },
  {
    title: "Measurement and iteration",
    points: [
      "Dashboards with rankings, traffic, and revenue attribution updates.",
      "Experiment logs and quarterly reviews to keep momentum compounding.",
    ],
  },
];

const deliveryRail = [
  { phase: "Audit", caption: "Technical review, crawl data, and baseline metrics" },
  { phase: "Strategy", caption: "Keyword mapping, content plan, and priority fixes" },
  { phase: "Implement", caption: "Technical remediation and on-page optimisation" },
  { phase: "Expand", caption: "Location pages, translations, and market rollouts" },
  { phase: "Optimize", caption: "Reporting, tests, and ongoing improvements" },
];

const differentiators = [
  {
    title: "Engineering-led SEO",
    body: "We pair technical fixes with product and analytics teams so changes ship fast and stick.",
  },
  {
    title: "Geo expansion built in",
    body: "Local pages, listings, and localization plans are part of the roadmap, not an afterthought.",
  },
  {
    title: "Content aligned to conversion",
    body: "Search intent informs landing pages and onboarding so organic traffic converts.",
  },
  {
    title: "Transparent reporting",
    body: "Weekly dashboards and experiment logs show exactly where gains are coming from.",
  },
];

const trustSignals = [
  { value: "30%", label: "Traffic lift target" },
  { value: "90d", label: "Roadmap cadence" },
  { value: "50+", label: "Pages optimised" },
  { value: "12", label: "Markets supported" },
];

const journeyPhases = [
  {
    label: "1. Audit & baselining",
    description: "Review crawl data, rankings, and technical health to define priorities.",
    deliverable: "Technical audit and crawl report",
  },
  {
    label: "2. Strategy & roadmap",
    description: "Align keyword opportunities with content plans and product goals.",
    deliverable: "90-day SEO roadmap",
  },
  {
    label: "3. Implementation & fixes",
    description: "Ship technical improvements and optimize priority landing pages.",
    deliverable: "Remediation backlog and implementation checklist",
  },
  {
    label: "4. Content & geo expansion",
    description: "Publish new pages, local listings, and translated experiences.",
    deliverable: "Optimized pages and geo templates",
  },
  {
    label: "5. Reporting & iteration",
    description: "Measure impact, run experiments, and update the roadmap.",
    deliverable: "Performance dashboards and experiment log",
  },
];

const maintenanceHighlights = [
  "Monthly rank tracking and visibility reporting.",
  "Content refresh cycles and internal linking updates.",
  "Technical health checks for indexing and Core Web Vitals.",
  "Local listing updates and review response guidance.",
  "Algorithm update monitoring and rapid response plans.",
];

const faqItems = [
  {
    question: "How soon will we see SEO results?",
    answer:
      "Early signals typically appear within 6-12 weeks, with compounding gains as technical and content work mature.",
  },
  {
    question: "Do you handle technical fixes or just strategy?",
    answer:
      "We do both. Our team can implement technical SEO fixes or collaborate with your engineering team to ship them.",
  },
  {
    question: "Will you write the content?",
    answer:
      "We can provide content briefs, outlines, and writing support, or work alongside your internal content team.",
  },
  {
    question: "Can you support international or multi-language SEO?",
    answer:
      "Yes. We plan hreflang setups, localized content, and market-specific page templates.",
  },
  {
    question: "Do you manage local listings?",
    answer:
      "We handle location pages and listings strategy, and can coordinate review management with your team.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We track rankings, organic traffic, conversions, and revenue attribution tied to your KPIs.",
  },
  {
    question: "Can you work with our in-house developers?",
    answer:
      "Absolutely. We slot into your workflow using Jira, Linear, or GitHub for transparent execution.",
  },
  {
    question: "What does engagement look like?",
    answer:
      "Most engagements run on a quarterly roadmap with monthly reporting and continuous optimisation sprints.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const SeoGeo = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  return (
    <>
      <PageHero {...detail} />

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Scope at a glance</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              SEO coverage that compounds visibility
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              We align technical fixes, content strategy, and geo expansion so you capture demand at every stage of the
              funnel.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scopeItems.map(({ title, benefit, icon: Icon }) => (
              <article
                key={title}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_32px_90px_-45px_rgba(56,189,248,0.55)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,var(--spotlight-accent,rgba(56,189,248,0.14))_0%,rgba(15,23,42,0)_70%)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out group-hover:before:opacity-100 translate-y-0"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-theme theme-card-muted text-cyan-300 transition-all duration-500 ease-out group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_18px_36px_-24px_rgba(56,189,248,0.75)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-theme-primary">{title}</h3>
                  <p className="text-sm leading-relaxed text-theme-muted">{benefit}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section border-y border-theme/60 bg-slate-950/50 px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Strategy &amp; methodology</span>
              <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">How we grow organic visibility</h2>
              <p className="text-base leading-relaxed text-theme-muted">
                We blend technical SEO, content architecture, and analytics so your growth is measurable and repeatable.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Technical SEO", "Schema", "Hreflang", "Local SEO", "Content clusters", "Reporting"].map(
                  (keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-theme px-3 py-1 text-xs uppercase tracking-[0.3em] text-theme-muted"
                    >
                      {keyword}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="grid gap-6">
              {methodologyPillars.map(({ title, points }) => (
                <article
                  key={title}
                  className="group rounded-3xl border border-theme/70 theme-card p-6 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)] translate-y-0"
                >
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-theme-primary">
                    <BadgeCheck className="h-5 w-5 text-cyan-400" aria-hidden />
                    {title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-theme-muted">
                    {points.map((point) => (
                      <li key={point} className="flex gap-2 transition-colors duration-300 group-hover:text-theme-primary">
                        <Sparkles className="mt-1 h-4 w-4 text-cyan-400" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-theme theme-card p-6 shadow-theme">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-theme-primary">Download our SEO roadmap template</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-theme-muted">
                  Get the audit checklist, keyword mapping framework, and reporting cadence we use to build compounding
                  growth.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs uppercase tracking-[0.6em] text-theme-muted">Our SEO rail</span>
                <span className="text-xs uppercase tracking-[0.3em] text-theme-muted opacity-80 sm:text-right">
                  Swipe to explore each delivery phase
                </span>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm transition-theme md:p-8">
                <span className="pointer-events-none absolute left-8 right-8 top-14 hidden h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/45 to-violet-500/0 lg:block" />
                <div className="flex gap-6 overflow-x-auto pb-3 pt-2 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:p-0">
                  {deliveryRail.map(({ phase, caption }, index) => (
                    <div
                      key={phase}
                      className="group relative flex min-w-[200px] flex-col gap-4 rounded-2xl border border-transparent bg-transparent p-4 transition-all duration-500 ease-out hover:border-cyan-400/40 hover:bg-theme-primary/5 lg:min-w-0 lg:flex-1 lg:border-none lg:bg-transparent lg:p-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-theme/70 theme-card text-sm font-semibold uppercase tracking-[0.2em] text-theme-primary transition-all duration-500 group-hover:border-cyan-400/70 group-hover:text-cyan-200">
                          {phase.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-theme-primary transition-colors duration-500 group-hover:text-cyan-200">
                          {phase}
                        </span>
                      </div>
                      <p className="text-xs uppercase tracking-[0.28em] text-theme-muted leading-relaxed transition-colors duration-500 group-hover:text-theme-primary">
                        {caption}
                      </p>
                      {index < deliveryRail.length - 1 ? (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute right-[-28px] top-12 hidden h-px w-[56px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/45 to-violet-500/0 lg:block"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Why choose us</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              SEO partners focused on measurable outcomes
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              We align with your product, marketing, and engineering teams to deliver search gains you can trace to
              revenue.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map(({ title, body }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_32px_90px_-50px_rgba(56,189,248,0.55)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/0 before:via-cyan-500/10 before:to-violet-500/10 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 translate-y-0"
              >
                <h3 className="text-xl font-semibold text-theme-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-theme-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section border-y border-theme/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-20 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Proof you can trust</span>
            <h2 className="text-2xl font-semibold text-theme-primary md:text-3xl">Search performance highlights</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col rounded-3xl border border-theme theme-card-muted px-5 py-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/60 translate-y-0"
              >
                <span className="text-3xl font-semibold text-theme-primary">{value}</span>
                <span className="mt-2 text-xs uppercase tracking-[0.3em] text-theme-muted">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-theme-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Search className="h-4 w-4 text-cyan-400" aria-hidden />
              Technical SEO coverage
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Globe2 className="h-4 w-4 text-cyan-400" aria-hidden />
              Geo expansion strategy
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <SignalHigh className="h-4 w-4 text-cyan-400" aria-hidden />
              Transparent reporting
            </span>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Process / journey</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              The journey from audit to compounding growth
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Each milestone keeps your team aligned and ensures search gains are documented.
            </p>
          </div>
          <ol className="relative grid gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
            <span className="pointer-events-none absolute left-1/2 top-12 hidden h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 xl:inline-block" />
            {journeyPhases.map(({ label, description, deliverable }, index) => (
              <li
                key={label}
                className="group relative overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_32px_90px_-50px_rgba(56,189,248,0.55)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/0 before:via-cyan-500/10 before:to-violet-500/10 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 translate-y-0"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-theme text-sm font-semibold text-theme-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-theme-primary">{label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-theme-muted">{description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-cyan-400">Deliverable: {deliverable}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="theme-section border-y border-theme/60 bg-slate-950/50 px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Maintenance &amp; growth</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              We keep SEO healthy as algorithms evolve
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Organic performance requires constant attention. We stay on top of updates and keep your roadmap fresh.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-start">
            <div className="rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)] translate-y-0">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-theme-primary">
                <GaugeCircle className="h-5 w-5 text-cyan-400" aria-hidden />
                Ongoing engagement snapshot
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-theme-muted">
                We align monthly reporting and optimization sprints to keep rankings stable and traffic growing.
              </p>
            </div>
            <ul className="space-y-3 rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:border-cyan-400/60">
              {maintenanceHighlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 text-sm leading-relaxed text-theme-muted transition-colors duration-300 hover:text-theme-primary"
                >
                  <Sparkles
                    className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300"
                    aria-hidden
                  />
                  <span className="transition-colors duration-300 group-hover:text-theme-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <div className="max-w-3xl space-y-5 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">FAQ</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Frequently asked questions about SEO and geo services
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Answers to the topics we cover most often with growth and marketing teams exploring search partnerships.
            </p>
          </div>
          <div className="divide-y divide-theme rounded-3xl border border-theme theme-card">
            {faqItems.map(({ question, answer }) => {
              const isActive = activeQuestion === question;
              return (
                <div key={question}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-theme-primary/5"
                    aria-expanded={isActive}
                    onClick={() => setActiveQuestion((prev) => (prev === question ? null : question))}
                  >
                    <span
                      className={`text-base font-semibold transition-colors duration-300 ${
                        isActive ? "text-cyan-200" : "text-theme-primary"
                      }`}
                    >
                      {question}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-theme text-sm transition-colors duration-300 ${
                        isActive ? "bg-theme-primary text-theme-contrast" : "text-theme-muted"
                      }`}
                      aria-hidden
                    >
                      {isActive ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden px-6 transition-[max-height] duration-300 ${
                      isActive ? "max-h-[320px]" : "max-h-0"
                    }`}
                  >
                    <p className="pb-6 text-sm leading-relaxed text-theme-muted">{answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="theme-section border-t border-theme/60 px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-theme-muted md:text-4xl">
            Let&apos;s build a search roadmap that scales
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-theme-muted">
            Share your markets, targets, and priorities, and we will craft an SEO roadmap that aligns every team around
            measurable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?intent=seo-audit"
              className="inline-flex items-center gap-2 rounded-full bg-theme-primary px-7 py-3 text-sm font-semibold text-theme-primary transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Request an SEO audit
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-theme px-7 py-3 text-sm font-semibold text-theme-primary transition hover:bg-theme-primary/10"
            >
              <BadgeCheck className="h-4 w-4 text-cyan-400" aria-hidden />
              View growth stories
            </Link>
          </div>
        </div>
      </section>

      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
    </>
  );
};

export default SeoGeo;


