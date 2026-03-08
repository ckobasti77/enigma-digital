'use client';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";
import {
  BadgeCheck,
  Compass,
  GaugeCircle,
  Layers,
  MessageSquare,
  Palette,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const detail = serviceDetails["branding"];

const scopeItems = [
  {
    title: "Brand strategy & positioning",
    benefit: "Competitive insights and audience clarity that sharpen your narrative.",
    icon: Target,
  },
  {
    title: "Visual identity systems",
    benefit: "Logo suites, typography, and color systems that scale across touchpoints.",
    icon: Palette,
  },
  {
    title: "Messaging & verbal identity",
    benefit: "Voice, tone, and messaging pillars that keep every team aligned.",
    icon: MessageSquare,
  },
  {
    title: "Brand architecture & naming",
    benefit: "Clear product naming and hierarchy that supports future launches.",
    icon: Layers,
  },
  {
    title: "Launch assets & enablement",
    benefit: "Sales decks, social kits, and templates for cohesive rollouts.",
    icon: BadgeCheck,
  },
  {
    title: "Employer brand & culture",
    benefit: "Internal narratives and recruiting assets that attract the right talent.",
    icon: Users,
  },
];

const methodologyPillars = [
  {
    title: "Strategy workshops",
    points: [
      "Stakeholder interviews, competitive scan, and audience segmentation.",
      "Positioning statement and messaging map aligned to GTM goals.",
    ],
  },
  {
    title: "Identity system design",
    points: [
      "Moodboards, logo families, typography, and color architecture.",
      "Tokenized Figma libraries and export-ready asset kits.",
    ],
  },
  {
    title: "Rollout and governance",
    points: [
      "Brand book, templates, and usage rules for every team.",
      "Launch plan with internal enablement and external rollout assets.",
    ],
  },
];

const deliveryRail = [
  { phase: "Discovery", caption: "Research, audit, and stakeholder alignment" },
  { phase: "Positioning", caption: "Narrative, messaging pillars, and value map" },
  { phase: "Identity", caption: "Logo suite, typography, and visual system" },
  { phase: "Launch", caption: "Template production and rollout assets" },
  { phase: "Scale", caption: "Governance, training, and brand upkeep" },
];

const differentiators = [
  {
    title: "Brand meets product strategy",
    body: "We connect positioning to onboarding, pricing, and retention so every touchpoint reinforces your value.",
  },
  {
    title: "Systems, not just logos",
    body: "Componentized brand tokens and templates let teams scale without losing consistency.",
  },
  {
    title: "Collaborative and transparent",
    body: "Workshops and decision logs keep stakeholders aligned and reduce rework across teams.",
  },
  {
    title: "Launch-ready assets",
    body: "We deliver decks, social kits, and internal enablement so your rollout lands with confidence.",
  },
];

const trustSignals = [
  { value: "4 wks", label: "Brand sprint from kickoff" },
  { value: "20+", label: "Launch assets delivered" },
  { value: "95%", label: "Stakeholder alignment score" },
  { value: "3x", label: "Lift in brand recall" },
];

const journeyPhases = [
  {
    label: "1. Discovery & insights",
    description: "Audit your current brand, research competitors, and align on objectives.",
    deliverable: "Brand audit and research summary",
  },
  {
    label: "2. Positioning & narrative",
    description: "Define your story, voice, and differentiated messaging pillars.",
    deliverable: "Positioning statement and messaging pillars",
  },
  {
    label: "3. Identity system design",
    description: "Craft logo suites, typography, color, and motion directions.",
    deliverable: "Logo suite and visual guidelines",
  },
  {
    label: "4. Asset production & launch",
    description: "Build the collateral and templates teams need to roll out fast.",
    deliverable: "Launch kit and template library",
  },
  {
    label: "5. Governance & enablement",
    description: "Document usage, train teams, and prepare for future expansions.",
    deliverable: "Brand book and enablement training",
  },
];

const maintenanceHighlights = [
  "Quarterly brand health checks and perception scans.",
  "Template refreshes for new campaigns and launches.",
  "Brand consistency audits across web, product, and sales materials.",
  "Naming and architecture support for new offerings.",
  "Asset library management for designers and marketers.",
];

const faqItems = [
  {
    question: "How long does a typical branding engagement take?",
    answer:
      "Most brand sprints take 4-6 weeks depending on stakeholder availability and the number of assets required.",
  },
  {
    question: "Can you refresh an existing brand instead of starting over?",
    answer:
      "Yes. We can modernize your visual system, tighten messaging, and update guidelines while preserving equity.",
  },
  {
    question: "How many logo concepts do you provide?",
    answer:
      "We typically deliver 2-3 distinct creative directions, then iterate the strongest one with your team.",
  },
  {
    question: "Do you handle naming and messaging?",
    answer:
      "Absolutely. Positioning and verbal identity are core parts of the process, including naming support.",
  },
  {
    question: "What deliverables are included?",
    answer:
      "Expect a brand book, logo suite, typography and color specs, templates, and a launch-ready asset kit.",
  },
  {
    question: "Who should participate in workshops?",
    answer:
      "Founders, marketing leaders, and product stakeholders are ideal so decisions reflect the full business view.",
  },
  {
    question: "Can you support rollout across teams?",
    answer:
      "Yes. We deliver enablement sessions, documentation, and templates so internal teams stay consistent.",
  },
  {
    question: "What does engagement cost?",
    answer:
      "Brand programs start with a defined sprint or monthly retainer depending on scope and asset volume.",
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

const Branding = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  return (
    <>
      <PageHero {...detail} />

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Scope at a glance</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Branding coverage that keeps every touchpoint aligned
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              From early positioning to global rollouts, we build brand systems that make marketing, product, and sales
              speak with one voice.
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
              <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">How we shape your brand</h2>
              <p className="text-base leading-relaxed text-theme-muted">
                We blend research, creative direction, and execution to deliver a brand system your teams can use
                immediately.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Positioning", "Brand voice", "Visual identity", "Brand book", "Templates", "Launch kit"].map(
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
                <h3 className="text-xl font-semibold text-theme-primary">Download our branding playbook</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-theme-muted">
                  Get the brand sprint agenda, messaging framework, and rollout checklist. Perfect for stakeholders who
                  want clarity before kickoff.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs uppercase tracking-[0.6em] text-theme-muted">Our branding rail</span>
                <span className="text-xs uppercase tracking-[0.3em] text-theme-muted opacity-80 sm:text-right">
                  Swipe to explore each phase
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
              Brand partners who align story, design, and execution
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              We combine strategic positioning with hands-on production, so your brand shows up clearly wherever your
              audience meets you.
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
            <h2 className="text-2xl font-semibold text-theme-primary md:text-3xl">Brand outcomes and delivery metrics</h2>
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
              <Compass className="h-4 w-4 text-cyan-400" aria-hidden />
              Positioning workshops
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Palette className="h-4 w-4 text-cyan-400" aria-hidden />
              Visual identity systems
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden />
              Launch-ready assets
            </span>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Process / journey</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              The journey from story to system
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Clear milestones keep stakeholders aligned and make brand decisions easy to approve.
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
              We steward the brand long after launch day
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Brands evolve with your product and market. We stay embedded to keep guidelines current and every team
              aligned.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-start">
            <div className="rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)] translate-y-0">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-theme-primary">
                <GaugeCircle className="h-5 w-5 text-cyan-400" aria-hidden />
                Brand stewardship snapshot
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-theme-muted">
                We align ongoing support to your release cadence, ensuring updates, campaigns, and new products stay
                visually consistent.
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
              Frequently asked questions about our branding services
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Answers to the questions we hear from founders, marketing leaders, and product teams planning a brand
              refresh.
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
            Let&apos;s build a brand system that scales with your product
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-theme-muted">
            Tell us where your brand stands today, where you are headed next, and we will craft a positioning and visual
            system that keeps every launch cohesive.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?intent=brand-sprint"
              className="inline-flex items-center gap-2 rounded-full bg-theme-primary px-7 py-3 text-sm font-semibold text-theme-primary transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Start your brand sprint
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-theme px-7 py-3 text-sm font-semibold text-theme-primary transition hover:bg-theme-primary/10"
            >
              <BadgeCheck className="h-4 w-4 text-cyan-400" aria-hidden />
              View identity work
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

export default Branding;


