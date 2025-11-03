'use client';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";
import {
  BadgeCheck,
  BarChart3,
  Code2,
  GaugeCircle,
  LayoutDashboard,
  Network,
  Orbit,
  Server,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react";

const detail = serviceDetails["web-development"];

const scopeItems = [
  {
    title: "Websites & Marketing Platforms",
    benefit: "Composable CMS foundations so growth teams publish without friction.",
    icon: LayoutDashboard,
  },
  {
    title: "SaaS Product & Architecture",
    benefit: "TypeScript-first platforms that stay maintainable as customer journeys expand.",
    icon: Code2,
  },
  {
    title: "Edge & Serverless Functions",
    benefit: "Deploy fast, scale smart with latency-sensitive compute where it matters.",
    icon: Network,
  },
  {
    title: "Performance & Observability",
    benefit: "Vitals, tracing, and alerts wired in so issues surface before users notice.",
    icon: GaugeCircle,
  },
  {
    title: "Automation & CI/CD Tooling",
    benefit: "Pipelines, QA guardrails, and DX upgrades that shorten every release cycle.",
    icon: Workflow,
  },
  {
    title: "Secure Data Integrations",
    benefit: "Hardened APIs, zero-trust auth, and privacy-first analytics out of the box.",
    icon: Shield,
  },
];

const methodologyPillars = [
  {
    title: "TypeScript-first delivery",
    points: [
      "Next.js, Remix, Astro, and Edge runtimes tuned per workload.",
      "Shared component libraries and Storybook-ready documentation.",
    ],
  },
  {
    title: "Performance obsessed",
    points: [
      "Core Web Vitals budgets with automated Lighthouse or Calibre runs.",
      "Real user monitoring hooks and cost-aware edge caching.",
    ],
  },
  {
    title: "Observability wired in",
    points: [
      "Telemetry via OpenTelemetry, Logtail, Datadog, or your stack.",
      "Incident runbooks and alert routing aligned to your on-call model.",
    ],
  },
];

const deliveryRail = [
  { phase: "Kickoff", caption: "Discovery workshops and architecture blueprint" },
  { phase: "Design", caption: "Experience flows, component specs, developer alignment" },
  { phase: "Build", caption: "Agile squads shipping weekly with CI/CD humming" },
  { phase: "Iterate", caption: "Data-backed optimisations and roadmap grooming" },
  { phase: "Scale", caption: "Production hardening, edge tuning, cost controls" },
];

const differentiators = [
  {
    title: "Built for growth",
    body: "Engineering-led squads partner with product from roadmap to release, keeping acquisition, activation, and retention metrics in view.",
  },
  {
    title: "Maintainable from sprint one",
    body: "Clean architecture, typed APIs, and golden paths for contributors mean every new feature lands without accruing debt.",
  },
  {
    title: "Performance baked in",
    body: "Caching strategies, CDN rules, and profiling happen during development, so you hit 99% plus first-paint reliability.",
  },
  {
    title: "Remote-first, timezone aligned",
    body: "Distributed engineers across EMEA and North America embed with your team, covering critical hours without hand-off gaps.",
  },
];

const trustSignals = [
  { value: "99%+", label: "First paint hit rate across launches" },
  { value: "4 weeks", label: "Fastest growth-stage MVP to production" },
  { value: "EMEA / NA", label: "Remote engineering squads embedded" },
  { value: "40%", label: "Average conversion lift post engagement" },
];

const journeyPhases = [
  {
    label: "1. Discovery & roadmap",
    description: "Audit current stack, map KPIs, and align on measurable outcomes.",
    deliverable: "Architecture briefing and prioritised backlog",
  },
  {
    label: "2. Design & prototyping",
    description: "Wire UX flows, systemise UI, and validate journeys with product owners.",
    deliverable: "Component kit with prototype feedback loops",
  },
  {
    label: "3. Engineering & build",
    description: "Implement features in weekly increments with CI/CD and QA guardrails.",
    deliverable: "Production-ready increments plus release notes",
  },
  {
    label: "4. Launch & iterate",
    description: "Coordinate releases, instrument analytics, and activate marketing automation.",
    deliverable: "Go-live checklist and tracking dashboards",
  },
  {
    label: "5. Monitor & scale",
    description: "Observe vitals, tune infrastructure, and ship enhancements based on data.",
    deliverable: "Monthly performance review and optimisation backlog",
  },
];

const maintenanceHighlights = [
  "Monthly performance and Core Web Vitals review with action items.",
  "Observability dashboards, synthetic tests, and alert routing upkeep.",
  "Continuous backlog grooming aligned to GTM experiments and OKRs.",
  "Edge function profiling and cost optimisation recommendations.",
  "Security patches, dependency upgrades, and automated QA guardrails.",
];

const faqItems = [
  {
    question: "What size web development squad will I work with?",
    answer:
      "We embed a dedicated pod of 3-6 specialists (lead engineer, product designer, frontend/backend developers, QA) tailored to your roadmap and budget.",
  },
  {
    question: "Which tech stacks do you prefer?",
    answer:
      "Next.js, Remix, and Astro on the frontend; serverless edge runtimes, Node.js, and GraphQL or REST APIs in the middle; and modern data stores like PlanetScale, Supabase, or DynamoDB where fit. Every build is TypeScript-first.",
  },
  {
    question: "How do you handle maintenance after launch?",
    answer:
      "We stay accountable with observability, monthly health reviews, automated QA, and rapid-response bug fixes so your platform keeps moving.",
  },
  {
    question: "Can you support aggressive performance targets?",
    answer:
      "Yes. We design toward sub-two-second first paint, instrument real user monitoring, and run regression tests on every deploy to keep vitals in the green.",
  },
  {
    question: "Will my product scale with increased demand?",
    answer:
      "We plan for growth from day one with multi-region deployments, infrastructure-as-code, and database sharding or read replica strategies as needed.",
  },
  {
    question: "Do you integrate with existing teams and vendors?",
    answer:
      "Absolutely. We collaborate across marketing, product, and ops, plugging into your tooling such as Linear, Jira, GitHub, and Notion to stay transparent.",
  },
  {
    question: "How fast can we kick off?",
    answer:
      "Discovery can begin within a week. We scope, agree on KPIs, and spin up your dedicated remote engineering squad aligned to EMEA or North America hours.",
  },
  {
    question: "What does engagement cost?",
    answer:
      "Pods start at flexible retainers with transparent weekly velocity metrics. We provide detailed proposals covering team composition, cadence, and outcomes.",
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

const WebDevelopment = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  return (
    <>
      <PageHero {...detail} />

      <section className="theme-section px-6 py-24 transition-theme">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Scope at a glance</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Web development coverage that meets every stage of your platform
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              From marketing websites to mission-critical SaaS, we assemble the exact mix of frontend, backend,
              and infrastructure expertise to keep your roadmap moving.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scopeItems.map(({ title, benefit, icon: Icon }) => (
              <article
                key={title}
                className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_32px_90px_-45px_rgba(56,189,248,0.55)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,var(--spotlight-accent,rgba(56,189,248,0.14))_0%,rgba(15,23,42,0)_70%)] before:opacity-0 before:transition-opacity before:duration-500 before:ease-out group-hover:before:opacity-100"
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

      <section className="theme-section border-y border-theme/60 bg-slate-950/50 px-6 py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Technology &amp; methodology</span>
              <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">How we build</h2>
              <p className="text-base leading-relaxed text-theme-muted">
                We bring a scalable stack that balances developer experience, performance budgets, and stakeholder
                visibility. The result is a remote engineering squad that ships confidently, even under high-growth
                pressure.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "Remix", "GraphQL", "Edge functions", "TypeScript first", "CI/CD automation"].map(
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
                  className="group rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)]"
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
                <h3 className="text-xl font-semibold text-theme-primary">Download our web development services brief</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-theme-muted">
                  Get the full architecture blueprint outline, sample roadmaps, and remote squad playbook. Ideal for
                  stakeholders who want detail before a kickoff call.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs uppercase tracking-[0.6em] text-theme-muted">Our build rail</span>
                <span className="text-xs uppercase tracking-[0.3em] text-theme-muted opacity-80 sm:text-right">
                  Swipe to explore each delivery phase
                </span>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-[inset_0_1px_0_rgba(148,163,184,0.1)] backdrop-blur-sm transition-theme md:p-8">
                <span className="pointer-events-none absolute left-8 right-8 top-14 hidden h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/45 to-violet-500/0 md:block" />
                <div className="flex gap-6 overflow-x-auto pb-3 pt-2 md:grid md:grid-cols-5 md:gap-8 md:overflow-visible md:p-0">
                  {deliveryRail.map(({ phase, caption }, index) => (
                    <div
                      key={phase}
                      className="group relative flex min-w-[200px] flex-col gap-4 rounded-2xl border border-transparent bg-transparent p-4 transition-all duration-500 ease-out hover:border-cyan-400/40 hover:bg-theme-primary/5 md:min-w-0 md:flex-1 md:border-none md:bg-transparent md:p-0"
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
                          className="pointer-events-none absolute right-[-28px] top-12 hidden h-px w-[56px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/45 to-violet-500/0 md:block"
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

      <section className="theme-section px-6 py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Why choose us</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Remote web development squads engineered for scale
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              We combine product strategy, engineering discipline, and continuous optimisation so your scalable web
              platform stays ahead of demand.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {differentiators.map(({ title, body }) => (
              <article
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_32px_90px_-50px_rgba(56,189,248,0.55)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/0 before:via-cyan-500/10 before:to-violet-500/10 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
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
            <h2 className="text-2xl font-semibold text-theme-primary md:text-3xl">Key metrics and social proof</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustSignals.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col rounded-3xl border border-theme theme-card-muted px-5 py-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-1 hover:border-cyan-400/60"
              >
                <span className="text-3xl font-semibold text-theme-primary">{value}</span>
                <span className="mt-2 text-xs uppercase tracking-[0.3em] text-theme-muted">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-theme-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Server className="h-4 w-4 text-cyan-400" aria-hidden />
              Remote engineering squads
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Orbit className="h-4 w-4 text-cyan-400" aria-hidden />
              Partnered with growth-stage teams
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden />
              Design and engineering in lockstep
            </span>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Process / journey</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              The journey from idea to resilient platform
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Transparent milestones keep stakeholders engaged and ensure your remote engineering squad stays aligned to
              business outcomes.
            </p>
          </div>
          <ol className="relative grid gap-8 lg:grid-cols-5">
            <span className="pointer-events-none absolute left-1/2 top-12 hidden h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 lg:inline-block" />
            {journeyPhases.map(({ label, description, deliverable }, index) => (
              <li
                key={label}
                className="group relative overflow-hidden rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_32px_90px_-50px_rgba(56,189,248,0.55)] before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-cyan-500/0 before:via-cyan-500/10 before:to-violet-500/10 before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
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

      <section className="theme-section border-y border-theme/60 bg-slate-950/50 px-6 py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Maintenance &amp; growth</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              We stay accountable long after launch day
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Your scalable web platform needs care and iteration. We stay embedded to monitor, optimise, and evolve
              features as your customer base expands.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-start">
            <div className="rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)]">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-theme-primary">
                <GaugeCircle className="h-5 w-5 text-cyan-400" aria-hidden />
                Ongoing engagement snapshot
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-theme-muted">
                We align retainers to your velocity targets, delivering measurable outcomes every sprint while keeping
                budgets predictable.
              </p>
            </div>
            <ul className="space-y-3 rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:border-cyan-400/60">
              {maintenanceHighlights.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-3 text-sm leading-relaxed text-theme-muted transition-colors duration-300 hover:text-theme-primary"
                >
                  <Sparkles className="mt-1 h-4 w-4 flex-shrink-0 text-cyan-400 transition-colors duration-300 group-hover:text-cyan-300" aria-hidden />
                  <span className="transition-colors duration-300 group-hover:text-theme-primary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <div className="max-w-3xl space-y-5 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">FAQ</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Frequently asked questions about our web development services
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Answers to the topics we cover most often with growth-stage founders, marketing leaders, and product
              teams exploring remote web development partnerships.
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

      <section className="theme-section border-t border-theme/60 px-6 py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-theme-muted md:text-4xl">
            Let's define your roadmap and ship a scalable web platform
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-theme-muted">
            Share where you are today, the KPIs you need to move, and we'll assemble a remote web development squad that
            embeds with your team, complete with performance targets and observability from the very first sprint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?intent=define-roadmap"
              className="inline-flex items-center gap-2 rounded-full bg-theme-primary px-7 py-3 text-sm font-semibold text-theme-primary transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Let's define your roadmap
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-theme px-7 py-3 text-sm font-semibold text-theme-primary transition hover:bg-theme-primary/10"
            >
              <BadgeCheck className="h-4 w-4 text-cyan-400" aria-hidden />
              See recent builds
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

export default WebDevelopment;
