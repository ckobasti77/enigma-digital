'use client';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";
import {
  BadgeCheck,
  GaugeCircle,
  Server,
  SignalHigh,
  Smartphone,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

const detail = serviceDetails["mobile-app-development"];

const scopeItems = [
  {
    title: "Product strategy & scope",
    benefit: "Feature definition and roadmap alignment so every release moves core KPIs.",
    icon: Target,
  },
  {
    title: "Cross-platform development",
    benefit: "React Native or Flutter builds with shared logic and native polish.",
    icon: Smartphone,
  },
  {
    title: "Native performance & device access",
    benefit: "60 fps experiences with camera, location, and hardware integrations.",
    icon: GaugeCircle,
  },
  {
    title: "Backend APIs & integrations",
    benefit: "Secure services, data sync, and third-party integrations built for scale.",
    icon: Server,
  },
  {
    title: "QA and release management",
    benefit: "Test automation, device labs, and store submissions handled end-to-end.",
    icon: Workflow,
  },
  {
    title: "Analytics & lifecycle engagement",
    benefit: "Event tracking, funnels, and push strategies to lift retention.",
    icon: SignalHigh,
  },
];

const methodologyPillars = [
  {
    title: "Product discovery",
    points: [
      "User journey mapping, feature prioritization, and release scoping.",
      "Clickable prototypes and stakeholder validation before engineering begins.",
    ],
  },
  {
    title: "Performance and stability",
    points: [
      "Profiling for 60 fps animations and efficient native bridges.",
      "Crash monitoring and regression suites built into CI/CD.",
    ],
  },
  {
    title: "Release automation",
    points: [
      "CI pipelines, beta channels, and release notes managed every sprint.",
      "Store submissions, compliance checks, and rollout coordination.",
    ],
  },
];

const deliveryRail = [
  { phase: "Define", caption: "Product brief, success metrics, and scope" },
  { phase: "Prototype", caption: "UX flows, interaction design, and validation" },
  { phase: "Build", caption: "Agile development with weekly builds" },
  { phase: "Launch", caption: "Store submission, QA, and go-live" },
  { phase: "Grow", caption: "Retention experiments and feature expansion" },
];

const differentiators = [
  {
    title: "Native polish with shared velocity",
    body: "We move fast with cross-platform foundations while keeping native UX standards intact.",
  },
  {
    title: "Store readiness built in",
    body: "App Store and Play Store compliance is baked into every milestone, not left for the end.",
  },
  {
    title: "Retention-first analytics",
    body: "Events, funnels, and lifecycle messaging are planned alongside feature development.",
  },
  {
    title: "Security and compliance",
    body: "Secure storage, auth flows, and privacy considerations are included from day one.",
  },
];

const trustSignals = [
  { value: "60 fps", label: "Performance target" },
  { value: "99.5%", label: "Crash-free sessions" },
  { value: "8 wks", label: "MVP to store" },
  { value: "4.8", label: "Average rating uplift" },
];

const journeyPhases = [
  {
    label: "1. Discovery & validation",
    description: "Align on goals, validate workflows, and define the feature roadmap.",
    deliverable: "Product brief and feature map",
  },
  {
    label: "2. UX & prototyping",
    description: "Design mobile-first flows with interactive prototypes and feedback loops.",
    deliverable: "Clickable prototype and UI kit",
  },
  {
    label: "3. Engineering & QA",
    description: "Build, test, and iterate with device labs and automated regression tests.",
    deliverable: "Release candidate builds and QA reports",
  },
  {
    label: "4. Store launch",
    description: "Prepare listings, privacy disclosures, and coordinate the go-live plan.",
    deliverable: "Store listings and go-live checklist",
  },
  {
    label: "5. Growth & iteration",
    description: "Monitor retention, ship improvements, and plan expansion features.",
    deliverable: "Retention roadmap and analytics dashboard",
  },
];

const maintenanceHighlights = [
  "OS and device compatibility updates for every release.",
  "Crash monitoring, performance profiling, and hotfix response.",
  "Feature flags, staged rollouts, and A/B testing support.",
  "Store listing optimization and review management.",
  "Analytics reviews tied to activation and retention goals.",
];

const faqItems = [
  {
    question: "Do you build native or cross-platform apps?",
    answer:
      "We build both. React Native and Flutter are ideal for shared codebases, but we also deliver native iOS/Android when required.",
  },
  {
    question: "How do you handle App Store and Play Store submissions?",
    answer:
      "We manage listing assets, compliance checks, and submission workflows so launches are smooth and on time.",
  },
  {
    question: "Can you integrate with our existing backend?",
    answer:
      "Yes. We work with your APIs, authentication, and data layers or build new services when needed.",
  },
  {
    question: "Will the app support offline use?",
    answer:
      "We design offline states and data sync strategies for workflows that require access without connectivity.",
  },
  {
    question: "How do you ensure performance and stability?",
    answer:
      "We profile key flows, monitor crash rates, and run automated device tests every sprint.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stay on retainer for OS updates, feature enhancements, analytics reviews, and rapid fixes.",
  },
  {
    question: "What team will we work with?",
    answer:
      "A dedicated pod typically includes a mobile lead, product designer, engineers, and QA support.",
  },
  {
    question: "How fast can we start?",
    answer:
      "Discovery can begin within a week, with an MVP plan and roadmap delivered shortly after kickoff.",
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

const MobileAppDevelopment = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  return (
    <>
      <PageHero {...detail} />

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Scope at a glance</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Mobile delivery that keeps users coming back
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              From product definition to store launch, we pair mobile UX with reliable engineering so your app earns
              daily engagement.
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
              <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Technology &amp; methodology</span>
              <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">How we ship mobile apps</h2>
              <p className="text-base leading-relaxed text-theme-muted">
                We balance product discovery, performance targets, and release discipline so every sprint ends with a
                stable, testable build.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React Native", "Flutter", "App Store", "Play Store", "CI/CD", "Analytics"].map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-theme px-3 py-1 text-xs uppercase tracking-[0.3em] text-theme-muted"
                  >
                    {keyword}
                  </span>
                ))}
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
                <h3 className="text-xl font-semibold text-theme-primary">Download our mobile launch brief</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-theme-muted">
                  See the release checklist, QA framework, and analytics plan we use to move from concept to store.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs uppercase tracking-[0.6em] text-theme-muted">Our mobile rail</span>
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
              Mobile squads engineered for retention
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              We pair design, engineering, and release management so your mobile experience stays fast and dependable.
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
            <h2 className="text-2xl font-semibold text-theme-primary md:text-3xl">Mobile performance metrics</h2>
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
              <Smartphone className="h-4 w-4 text-cyan-400" aria-hidden />
              iOS and Android delivery
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Workflow className="h-4 w-4 text-cyan-400" aria-hidden />
              Release automation
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden />
              Lifecycle analytics
            </span>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Process / journey</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              The journey from idea to app store
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Transparent milestones keep your team informed and your releases predictable.
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
              We stay accountable after launch day
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Mobile products require steady iteration. We stay close to keep releases stable and performance strong.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-start">
            <div className="rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)] translate-y-0">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-theme-primary">
                <GaugeCircle className="h-5 w-5 text-cyan-400" aria-hidden />
                Ongoing engagement snapshot
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-theme-muted">
                We align support to your release cadence, providing updates, analytics, and rapid fixes every sprint.
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
              Frequently asked questions about mobile app development
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Answers to the topics we cover most often with founders and product leaders planning a mobile launch.
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
            Let&apos;s map your next mobile launch
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-theme-muted">
            Share your product goals and timelines, and we will assemble a mobile squad that can deliver a stable,
            engaging app on schedule.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?intent=mobile-launch"
              className="inline-flex items-center gap-2 rounded-full bg-theme-primary px-7 py-3 text-sm font-semibold text-theme-primary transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Plan your mobile launch
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-theme px-7 py-3 text-sm font-semibold text-theme-primary transition hover:bg-theme-primary/10"
            >
              <BadgeCheck className="h-4 w-4 text-cyan-400" aria-hidden />
              View mobile work
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

export default MobileAppDevelopment;


