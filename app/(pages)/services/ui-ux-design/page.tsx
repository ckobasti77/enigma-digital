'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHero from "@/app/_components/PageHero";
import { serviceDetails } from "@/constants/serviceDetails";
import { Button } from "@/components/ui/button";
import {
  Accessibility,
  ArrowRight,
  Compass,
  Figma,
  Heart,
  Layers,
  MousePointerClick,
  Palette,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

const detail = serviceDetails["ui-ux-design"];

const designNarrative = [
  "We design interfaces around people, not screens. Every concept starts with qualitative research, live conversations, and behaviour mapping so we can align the interface with human intent, emotion, and context.",
  "Empathy, usability, and brand voice converge when we storyboard flows, prototype interactions, and stress-test messages with actual users. The end result is a product that feels natural and purposeful, not just pixel-perfect.",
  "Our visual systems are crafted to extend your brand. Typography, illustration, and interaction patterns stay cohesive across platforms so teams can ship consistently while users experience a clear, confident identity.",
];

const processVisuals = [
  {
    stage: "Wireframe empathy map",
    description: "Low-fidelity flows to align stakeholders before we commit to visuals.",
    accent: "from-slate-900 via-slate-800 to-slate-900",
    badge: "Wireframe",
  },
  {
    stage: "High-fidelity brand design",
    description: "Componentized UI that blends your palette, typography, and voice.",
    accent: "from-rose-500/20 via-fuchsia-500/10 to-cyan-400/10",
    badge: "Visual design",
  },
  {
    stage: "Prototype & motion study",
    description: "Interactive prototypes with motion states and micro-interactions documented.",
    accent: "from-cyan-500/30 via-sky-400/20 to-violet-500/20",
    badge: "Prototype",
  },
];

const journeyPhases = [
  {
    phase: "Awareness",
    headline: "Clarify value at first glance",
    touchpoints: ["Landing hero narratives", "Ad-specific onboarding modals"],
  },
  {
    phase: "Consideration",
    headline: "Guide exploration with clarity",
    touchpoints: ["Interactive product tours", "Comparison grids & proof points"],
  },
  {
    phase: "Decision",
    headline: "Reduce friction at the moment of choice",
    touchpoints: ["Progressive checkout flows", "Real-time assistance widgets"],
  },
  {
    phase: "Retention",
    headline: "Sustain momentum post-conversion",
    touchpoints: ["Lifecycle email templates", "In-app nudges and success dashboards"],
  },
];

const journeyCallouts = [
  {
    label: "Micro-interactions",
    copy: "Delightful transitions and tactile feedback reinforce key actions.",
    desktopPosition: "sm:top-10 sm:left-[12%]",
    mobilePosition: "top-6 left-6",
  },
  {
    label: "Accessibility check",
    copy: "WCAG 2.2 AA-ready flows, contrast testing, and keyboard paths validated.",
    desktopPosition: "sm:top-[46%] sm:left-[52%]",
    mobilePosition: "top-1/2 left-1/2",
  },
  {
    label: "Emotionally relevant micro-copy",
    copy: "Copy engineered with behavioural science to keep momentum high.",
    desktopPosition: "sm:bottom-12 sm:right-[12%]",
    mobilePosition: "bottom-6 right-6",
  },
];

const beforeAfterProjects = [
  {
    title: "Redesigned onboarding flow",
    metric: "45% drop in abandonment",
    before: "Dense 8-step form with no progress cues.",
    after: "Guided progressive profiling using contextual tooltips.",
  },
  {
    title: "E-commerce product detail page",
    metric: "22% lift in add-to-cart rate",
    before: "Static spec tables and overwhelming comparison content.",
    after: "Narrative layout with sticky decision helpers and social proof.",
  },
  {
    title: "SaaS analytics dashboard",
    metric: "30% increase in weekly active users",
    before: "Complex filtering with inconsistent visual hierarchy.",
    after: "Modular cards, saved views, and adaptive theming for roles.",
  },
  {
    title: "Mobile banking redesign",
    metric: "60% boost in task completion",
    before: "Fragmented navigation and hidden quick actions.",
    after: "Role-aware shortcuts, biometric entry, and contextual nudges.",
  },
];

const accessibilityChecklist = [
  "Colour contrast ratios audited against WCAG 2.2 AA.",
  "Keyboard-first navigation paths and focus management.",
  "Screen reader semantics with aria-labels and live regions.",
  "Responsive typography and spacing for readability across devices.",
  "Motion preferences respected with reduced motion states.",
];

const prototypeSteps = [
  {
    title: "Sketch & wireframe",
    description: "Map task flows, storyboard paths, and align on success metrics.",
    icon: Compass,
  },
  {
    title: "High-fidelity design",
    description: "Build component-driven layouts in Figma with system tokens.",
    icon: Palette,
  },
  {
    title: "Interactive prototype",
    description: "Animate in Figma & Framer, layer micro-interactions, and prep dev notes.",
    icon: MousePointerClick,
  },
  {
    title: "Usability testing & iteration",
    description: "Test with 5-7 users, review heatmaps, and prioritise refinements.",
    icon: Workflow,
  },
];

const uxMetrics = [
  { value: "+30%", label: "Time on task", description: "Users stay engaged through richer, personalised flows." },
  { value: "-25%", label: "Error rate", description: "Improved validation and feedback loops reduce costly mistakes." },
  { value: "+18 pts", label: "NPS points", description: "Experience-led redesigns drive measurable brand loyalty." },
];

const industryInsights = [
  {
    industry: "SaaS dashboards",
    challenge: "Reframed complex analytics for non-technical operators.",
    outcome: "Shipped a modular insight library with role-based quick actions.",
  },
  {
    industry: "E-commerce",
    challenge: "Simplified discovery for 3k+ SKUs across mobile surfaces.",
    outcome: "Introduced guided wayfinding, bundle builders, and trust visuals.",
  },
  {
    industry: "Fintech",
    challenge: "Condensed KYC for mobile customers in regulated markets.",
    outcome: "Implemented document scanning, progress states, and live support escalation.",
  },
  {
    industry: "Enterprise platforms",
    challenge: "Unified disparate internal tools into a coherent workspace.",
    outcome: "Delivered a design system with API-driven UI kit and governance model.",
  },
  {
    industry: "Health & wellness",
    challenge: "Encouraged habit formation without overwhelming users.",
    outcome: "Crafted empathetic nudges, daily streak mechanics, and inclusive visuals.",
  },
  {
    industry: "Education platforms",
    challenge: "Unified curriculum content with adaptive learning paths.",
    outcome: "Delivered progress-aware dashboards and accessibility-first lesson templates.",
  },
];

const workshopHighlights = [
  "2-day remote design sprint to validate north-star journeys.",
  "Weekly co-creation labs for copy, motion, and component decisions.",
  "Live whiteboarding with cross-functional teams in FigJam and Miro.",
];

const testimonial = {
  quote:
    "\"Enigma didn't just present a new interface--they put our team into the design seat. The workshops made every decision transparent and our stakeholders felt heard throughout.\"",
  author: "Leah Morton",
  role: "VP Product, Northwind Ventures",
};

const microEngagements = [
  {
    label: "Book a 30-minute design sprint consult",
    description: "Bring your product lead and we'll workshop one user journey together.",
    href: "/contact?intent=design-sprint",
  },
  {
    label: "Request a usability audit snapshot",
    description: "We'll analyse your current flow and return a heuristic scorecard.",
    href: "/contact?intent=usability-audit",
  },
  {
    label: "Download our UI kit starter template",
    description: "Kick off a design system with ready-to-use tokens and component scaffolds.",
    href: "/assets/downloads/uiux-accessibility-checklist.pdf",
  },
];

const UiUxDesign = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industryInsights.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <PageHero {...detail} />
      <main className="theme-section transition-theme text-theme-primary">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-theme-muted">
                <Heart className="h-3.5 w-3.5 text-rose-400" aria-hidden />
                Our design philosophy
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-theme-primary sm:text-4xl">
                Design philosophy & human-first approach
              </h2>
              <div className="space-y-4 text-base text-theme-muted sm:text-lg">
                {designNarrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {processVisuals.map((visual) => (
                <div
                  key={visual.stage}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-theme/35 theme-card p-5 shadow-theme/30 transition-all duration-500 ease-out hover:-translate-y-2 translate-y-0"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${visual.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-30`}
                    aria-hidden
                  />
                  <div className="relative z-10 flex h-full flex-col justify-between gap-6">
                    <span className="inline-flex w-fit items-center rounded-full border border-theme/30 bg-muted/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-theme-muted">
                      {visual.badge}
                    </span>
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-theme-primary">{visual.stage}</h3>
                      <p className="text-sm leading-relaxed text-theme-muted">{visual.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-6 pb-20">
          <div className="relative overflow-hidden rounded-[40px] border border-theme/40 theme-card px-6 py-12 shadow-theme/25 sm:px-12">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-theme-muted">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" aria-hidden />
                  User journey case map
                </span>
                <h2 className="text-3xl font-semibold text-theme-primary sm:text-4xl">We choreograph the entire UX journey</h2>
                <p className="text-base text-theme-muted">
                  Awareness -&gt; Consideration -&gt; Decision -&gt; Retention is more than a funnel. We design intentional touchpoints at every phase so users feel guided, supported, and confident, translating to higher conversions and long-term loyalty.
                </p>
              </div>
            </header>

            <div className="relative mt-12 grid gap-6 sm:grid-cols-4">
              {journeyPhases.map((item) => (
                <div
                  key={item.phase}
                  className="group rounded-3xl border border-theme/35 theme-card p-6 shadow-theme/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-theme/60 translate-y-0"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-theme-muted">
                    <Timer className="h-4 w-4 text-cyan-400" aria-hidden />
                    {item.phase}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-theme-primary">{item.headline}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-theme-muted">
                    {item.touchpoints.map((touchpoint) => (
                      <li key={touchpoint} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400/80" />
                        {touchpoint}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {journeyCallouts.map((callout) => (
                <div
                  key={callout.label}
                  className={`pointer-events-none absolute hidden max-w-[220px] rounded-2xl border border-theme/40 theme-overlay p-4 text-xs text-theme-primary shadow-theme/30 sm:block ${callout.desktopPosition} ${callout.mobilePosition}`}
                >
                  <p className="font-semibold uppercase tracking-[0.2em] text-theme-primary/80">{callout.label}</p>
                  <p className="mt-2 text-[13px] text-theme-muted">{callout.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-col gap-6 pb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-theme-muted">
              <Layers className="h-4 w-4 text-rose-400" aria-hidden />
              Before vs after gallery
            </span>
            <h2 className="max-w-3xl text-3xl font-semibold text-theme-primary sm:text-4xl">
              See the difference: product journeys before and after our UI overhaul
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {beforeAfterProjects.map((project) => (
              <div
                key={project.title}
                className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[32px] border border-theme/40 theme-card p-6 shadow-theme/20 transition-all duration-500 ease-out hover:-translate-y-2 translate-y-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-theme-primary">{project.title}</h3>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                    {project.metric}
                  </span>
                </div>
                <div className="grid gap-4 rounded-3xl border border-theme/30 bg-muted/40 p-4 sm:grid-cols-2">
                  <div className="space-y-3 rounded-2xl border border-theme/30 bg-card/70 p-4 shadow-theme/10 transition-all duration-500 ease-out group-hover:-translate-y-2 translate-y-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-theme-muted">Before</p>
                    <p className="text-sm leading-relaxed text-theme-muted">{project.before}</p>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-theme/30 bg-card p-4 shadow-theme/10 transition group-hover:translate-y-1 translate-y-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-theme-primary">After</p>
                    <p className="text-sm leading-relaxed text-theme-primary/80">{project.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-theme/40 theme-card p-8 shadow-theme/20">
              <div className="flex flex-col gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-theme-muted">
                  <Accessibility className="h-4 w-4 text-cyan-400" aria-hidden />
                  Designing for everyone
                </span>
                <h2 className="text-3xl font-semibold text-theme-primary sm:text-4xl">Accessibility & inclusive design</h2>
                <p className="text-base text-theme-muted">
                  Accessibility is non-negotiable. We embed inclusive practices throughout research, design, and development so every user can participate fully, regardless of ability, context, or device.
                </p>
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-theme-muted sm:grid-cols-2">
                {accessibilityChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 rounded-2xl border border-theme/30 bg-card/70 p-3">
                    <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-cyan-400/80" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-theme bg-transparent text-theme-primary transition-theme hover:bg-muted"
                >
                  <Link href="/assets/downloads/uiux-accessibility-checklist.pdf" target="_blank" rel="noopener">
                    Download accessibility checklist
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-[32px] border border-theme/40 theme-card p-8 shadow-theme/20">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-theme-muted">
                  Visual identity in UX
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-theme-primary">Brand & visual identity integration</h3>
                <p className="mt-3 text-sm text-theme-muted">
                  We translate brand guidelines into flexible UI libraries so marketing, product, and engineering speak the same visual language. Every component and state extends your brand, not dilutes it.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-theme/30 bg-card/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-theme-muted">Brand ingredients</p>
                  <div className="mt-3 space-y-2 text-sm text-theme-muted">
                    <p>- Logo lockups in light/dark</p>
                    <p>- Typographic pairings & token scales</p>
                    <p>- Motion & illustration references</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-theme/30 bg-card p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-theme-primary">UI system output</p>
                  <div className="mt-3 space-y-2 text-sm text-theme-primary/80">
                    <p>- Component kit with tokenised themes</p>
                    <p>- Interaction specs & developer docs</p>
                    <p>- QA checklists for smooth handoff</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-[32px] border border-theme/40 theme-card p-10 shadow-theme/20">
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-theme-muted">
                <Figma className="h-4 w-4 text-cyan-300" aria-hidden />
                Prototyping & testing
              </span>
              <h2 className="text-3xl font-semibold text-theme-primary sm:text-4xl">From idea to validation in four steps</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-4">
              {prototypeSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="relative flex flex-col gap-4 rounded-3xl border border-theme/30 bg-card/80 p-6 shadow-theme/10 transition-all duration-500 ease-out hover:-translate-y-2 translate-y-0"
                >
                  <div className="flex size-12 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-400/10 text-cyan-500">
                    <step.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-muted">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-theme-primary">{step.title}</h3>
                    <p className="mt-3 text-sm text-theme-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-10 rounded-[32px] border border-theme/40 theme-card p-10 shadow-theme/20 md:grid-cols-[1fr,1.1fr]">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-theme-muted">
                <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden />
                UX metrics & impact
              </span>
              <h2 className="text-3xl font-semibold text-theme-primary sm:text-4xl">What success looks like</h2>
              <p className="text-base text-theme-muted">
                We pair design decisions with measurable outcomes. During every engagement we pin metrics to business goals, track them week-over-week, and share dashboards so you know where impact is happening.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {uxMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-3xl border border-theme/30 bg-card/85 p-6 text-center shadow-theme/10"
                >
                  <p className="text-3xl font-semibold text-theme-primary">{metric.value}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.28em] text-theme-muted">{metric.label}</p>
                  <p className="mt-3 text-sm text-theme-muted">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-[32px] border border-theme/40 theme-card p-10 shadow-theme/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-theme-muted">
                  Industry-specific focus
                </span>
                <h2 className="mt-3 text-3xl font-semibold text-theme-primary sm:text-4xl">
                  UI/UX tailored to your industry
                </h2>
                <p className="mt-2 max-w-xl text-sm text-theme-muted">
                  Every sector has its own trust signals and friction points. We rotate through the industries we serve so you can explore real scenarios, then click a card to dive deeper.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-theme bg-transparent text-theme-primary hover:bg-muted"
                  onClick={() =>
                    setActiveIndustry((prev) => (prev - 1 + industryInsights.length) % industryInsights.length)
                  }
                >
                  &lt;
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-theme bg-transparent text-theme-primary hover:bg-muted"
                  onClick={() => setActiveIndustry((prev) => (prev + 1) % industryInsights.length)}
                >
                  &gt;
                </Button>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {industryInsights.map((item, index) => {
                const active = index === activeIndustry;
                return (
                  <button
                    key={item.industry}
                    type="button"
                    className={`group flex h-full flex-col justify-between rounded-3xl border p-6 text-left transition ${
                      active
                        ? "border-cyan-400/70 bg-card shadow-theme/25"
                        : "border-theme/30 bg-card/70 hover:border-cyan-400/50 hover:bg-card"
                    }`}
                    onClick={() => setActiveIndustry(index)}
                    aria-pressed={active}
                  >
                    <div className="space-y-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-theme-muted">
                        {item.industry}
                      </p>
                      <p className="text-base font-semibold text-theme-primary">{item.challenge}</p>
                      <p className="text-sm text-theme-muted">{item.outcome}</p>
                    </div>
                    <div
                      className={`mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] ${
                        active ? "text-theme-primary" : "text-cyan-500"
                      }`}
                    >
                      View insight
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {industryInsights.map((_, index) => (
                <span
                  key={index}
                  className={`h-2.5 w-2.5 rounded-full ${
                    index === activeIndustry ? "bg-cyan-400" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="grid gap-8 rounded-[32px] border border-theme/40 theme-card p-10 shadow-theme/20 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-theme-muted">
                <Users className="h-4 w-4 text-rose-400" aria-hidden />
                We collaborate -- you're part of the team
              </span>
              <h2 className="text-3xl font-semibold text-theme-primary sm:text-4xl">Client workshops & co-creation</h2>
              <p className="text-base text-theme-muted">
                Collaboration is built into our cadence. From discovery to launch, our design team facilitates workshops that bring product, marketing, and engineering together so decisions are co-owned, not handed over.
              </p>
              <ul className="space-y-3 text-sm text-theme-muted">
                {workshopHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-rose-400/70" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-[32px] border border-theme/30 bg-card/80 p-8 shadow-theme/15">
              <div>
                <div className="rounded-3xl border border-theme/30 bg-card p-4 text-sm text-theme-muted shadow-theme/10">
                  <p>
                    <strong className="text-theme-primary">Workshop snapshot:</strong> Real-time FigJam board with journey mapping, voting dots, and copywriting layers. Remote participants collaborate asynchronously while we document decisions for handoff.
                  </p>
                </div>
              </div>
              <blockquote className="rounded-3xl border border-rose-400/40 bg-rose-400/10 p-6 text-sm text-theme-primary">
                <p>{testimonial.quote}</p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-theme-muted">
                  {testimonial.author} - {testimonial.role}
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-[32px] border border-theme/40 theme-card p-10 shadow-theme/25">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)]" />
            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-theme bg-muted/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.34em] text-theme-muted">
                  Next steps & micro-engagement
                </span>
                <h2 className="text-3xl font-semibold text-theme-primary sm:text-4xl">
                  Ready to explore your next design move?
                </h2>
                <p className="text-base text-theme-muted">
                  Choose the way you'd like to engage. Whether you want a collaborative sprint, an audit, or a starter kit, we'll respond within 24 hours with next actions.
                </p>
              </div>
              <div className="grid gap-4">
                {microEngagements.map((option) => (
                  <div key={option.label} className="rounded-3xl border border-theme/30 bg-card/80 p-5 shadow-theme/10">
                    <h3 className="text-base font-semibold text-theme-primary">{option.label}</h3>
                    <p className="mt-2 text-sm text-theme-muted">{option.description}</p>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="mt-4 border-theme bg-transparent text-theme-primary transition-theme hover:bg-muted"
                    >
                      <Link href={option.href}>
                        Let's do it
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UiUxDesign;
