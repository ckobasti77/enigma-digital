'use client';

import { useState } from "react";
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";
import {
  BadgeCheck,
  GaugeCircle,
  Megaphone,
  MessageSquare,
  SignalHigh,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const detail = serviceDetails["social-media"];

const scopeItems = [
  {
    title: "Channel strategy & tone",
    benefit: "Platform selection, voice guidelines, and content pillars built around your audience.",
    icon: Target,
  },
  {
    title: "Content production & motion",
    benefit: "Short-form video, carousels, and creative assets designed for each platform.",
    icon: Sparkles,
  },
  {
    title: "Community management",
    benefit: "Engagement playbooks, moderation guidelines, and response workflows.",
    icon: MessageSquare,
  },
  {
    title: "Paid social & amplification",
    benefit: "Campaign planning, targeting, and optimization to extend reach.",
    icon: Megaphone,
  },
  {
    title: "Creator partnerships",
    benefit: "Influencer briefs, creator outreach, and brand-safe collaborations.",
    icon: Users,
  },
  {
    title: "Reporting & insights",
    benefit: "Dashboards, trend analysis, and experiment tracking that guide strategy.",
    icon: SignalHigh,
  },
];

const methodologyPillars = [
  {
    title: "Platform-native creative",
    points: [
      "Formats, hooks, and storytelling tailored to each channel's algorithm.",
      "Creative systems that balance brand consistency with trend agility.",
    ],
  },
  {
    title: "Rapid experimentation",
    points: [
      "Weekly testing plans for creative, copy, and timing.",
      "Content performance reviews tied directly to KPIs.",
    ],
  },
  {
    title: "Community growth loops",
    points: [
      "Engagement workflows that build loyalty and turn followers into advocates.",
      "Paid and organic coordination to maximize reach and retention.",
    ],
  },
];

const deliveryRail = [
  { phase: "Strategy", caption: "Channel audit, voice guide, and KPI setup" },
  { phase: "Create", caption: "Content production and asset development" },
  { phase: "Publish", caption: "Scheduling, distribution, and launch" },
  { phase: "Optimize", caption: "Performance analysis and testing" },
  { phase: "Scale", caption: "Evergreen libraries and growth campaigns" },
];

const differentiators = [
  {
    title: "Always-on content engine",
    body: "We keep your channels active with a rolling calendar and fast creative turnaround.",
  },
  {
    title: "Real-time monitoring",
    body: "Daily dashboards and comment tracking keep engagement high and risks low.",
  },
  {
    title: "Paid and organic together",
    body: "Creative direction and media planning are aligned so each campaign compounds results.",
  },
  {
    title: "Brand-safe community care",
    body: "Moderation guidelines and escalation paths protect your reputation while you scale.",
  },
];

const trustSignals = [
  { value: "5x", label: "Engagement lift" },
  { value: "24h", label: "Creative turnaround" },
  { value: "12", label: "Campaigns per quarter" },
  { value: "2x", label: "Follower growth" },
];

const journeyPhases = [
  {
    label: "1. Discovery & voice",
    description: "Audit your channels, define voice, and align on goals.",
    deliverable: "Voice guide and channel audit",
  },
  {
    label: "2. Content planning",
    description: "Build a content calendar tied to launches, events, and KPIs.",
    deliverable: "90-day content calendar",
  },
  {
    label: "3. Production & scheduling",
    description: "Create assets, write copy, and schedule posts across channels.",
    deliverable: "Asset library and publishing plan",
  },
  {
    label: "4. Community & paid",
    description: "Engage your community and launch targeted paid campaigns.",
    deliverable: "Engagement playbook and paid tests",
  },
  {
    label: "5. Reporting & iteration",
    description: "Review performance, test new ideas, and refine the calendar.",
    deliverable: "Performance dashboard and test log",
  },
];

const maintenanceHighlights = [
  "Weekly content planning and trend mapping.",
  "Daily monitoring with response guidelines and escalation paths.",
  "Creative refreshes and evergreen library updates.",
  "Paid budget optimization and targeting adjustments.",
  "Monthly reporting with growth experiments and learnings.",
];

const faqItems = [
  {
    question: "Which social platforms do you manage?",
    answer:
      "We cover TikTok, Instagram, LinkedIn, YouTube, X, and emerging platforms based on your audience and goals.",
  },
  {
    question: "How many posts can you produce per week?",
    answer:
      "We tailor volume to your strategy, typically 3-7 posts per week with supporting stories or shorts.",
  },
  {
    question: "Do you handle approvals and brand compliance?",
    answer:
      "Yes. We set up review workflows, approval gates, and brand-safe guidelines before publishing.",
  },
  {
    question: "Can you manage paid social ads too?",
    answer:
      "Absolutely. We handle creative, targeting, and optimization, and share performance reports weekly.",
  },
  {
    question: "How do you measure success?",
    answer:
      "We track engagement, reach, follower growth, click-throughs, and conversion metrics tied to your KPIs.",
  },
  {
    question: "Will you engage with comments and messages?",
    answer:
      "Yes. We follow response guidelines, handle moderation, and escalate issues quickly when needed.",
  },
  {
    question: "How quickly can you launch a campaign?",
    answer:
      "We can kick off within a week, with a channel audit and content calendar delivered shortly after.",
  },
  {
    question: "What does engagement cost?",
    answer:
      "Engagements are scoped monthly based on channel count, content volume, and paid media support.",
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

const SocialMedia = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(faqItems[0]?.question ?? null);

  return (
    <>
      <PageHero {...detail} />

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Scope at a glance</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              Social media coverage that builds momentum
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              From content calendars to community management, we keep your brand visible, responsive, and growing.
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
              <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">How we grow social communities</h2>
              <p className="text-base leading-relaxed text-theme-muted">
                We combine platform-native creative with real-time optimization so your content keeps compounding reach.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Content calendar", "Short-form video", "Paid social", "Creators", "Community", "Reporting"].map(
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
                <h3 className="text-xl font-semibold text-theme-primary">Download our social growth playbook</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-theme-muted">
                  Get the content calendar template, reporting cadence, and creative testing framework we use to scale
                  social channels.
                </p>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs uppercase tracking-[0.6em] text-theme-muted">Our social rail</span>
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
              Social teams that keep momentum high
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              We combine strategy, production, and community care so your channels stay active and on-brand.
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
            <h2 className="text-2xl font-semibold text-theme-primary md:text-3xl">Social growth metrics</h2>
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
              <Megaphone className="h-4 w-4 text-cyan-400" aria-hidden />
              Paid and organic campaigns
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <MessageSquare className="h-4 w-4 text-cyan-400" aria-hidden />
              Community management
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-3 py-1">
              <Sparkles className="h-4 w-4 text-cyan-400" aria-hidden />
              Creative testing loops
            </span>
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-20 sm:py-24 transition-theme">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-12">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-400">Process / journey</span>
            <h2 className="text-3xl font-semibold text-theme-primary md:text-4xl">
              The journey from strategy to daily engagement
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Milestones keep your team aligned and your content calendar full.
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
              We stay close as your community scales
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Social momentum requires steady iteration. We monitor, refresh, and optimize week after week.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-start">
            <div className="rounded-3xl border border-theme/70 theme-card p-6 shadow-theme transition-all duration-500 ease-out hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_28px_80px_-48px_rgba(56,189,248,0.5)] translate-y-0">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-theme-primary">
                <GaugeCircle className="h-5 w-5 text-cyan-400" aria-hidden />
                Ongoing engagement snapshot
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-theme-muted">
                We align reporting, creative refreshes, and channel support to your campaign calendar.
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
              Frequently asked questions about social media services
            </h2>
            <p className="text-base leading-relaxed text-theme-muted">
              Answers to the topics we cover most often with marketing and community teams planning social growth.
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
            Let&apos;s launch your social engine
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-theme-muted">
            Tell us which channels matter most and we will build a social strategy, content cadence, and reporting plan
            that keeps your brand present.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact?intent=social-strategy"
              className="inline-flex items-center gap-2 rounded-full bg-theme-primary px-7 py-3 text-sm font-semibold text-theme-primary transition hover:opacity-90"
            >
              <Sparkles className="h-4 w-4" aria-hidden />
              Launch your campaign
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-theme px-7 py-3 text-sm font-semibold text-theme-primary transition hover:bg-theme-primary/10"
            >
              <BadgeCheck className="h-4 w-4 text-cyan-400" aria-hidden />
              Review social wins
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

export default SocialMedia;


