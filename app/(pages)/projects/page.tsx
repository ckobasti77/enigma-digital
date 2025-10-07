'use client';

import { ArrowRight, PlayCircle, Rocket, Users, Sparkles } from 'lucide-react';

const caseStudies = [
  {
    tag: 'SaaS',
    title: 'Helios Labs – analytics platform relaunch',
    outcome: '58% lift in trial-to-paid conversion with modular onboarding and growth metrics dashboards.',
  },
  {
    tag: 'Travel',
    title: 'Orbit Airlines – global booking overhaul',
    outcome: '6 markets launched in 120 days with real-time ops visibility and service recovery automations.',
  },
  {
    tag: 'Fintech',
    title: 'Northwind Bank – digital onboarding playbook',
    outcome: 'Account activation cut to 5 minutes, CSAT climbed to 92%, support load down 38%.',
  },
  {
    tag: 'Retail',
    title: 'Mercury Collective – omnichannel membership',
    outcome: '+34% repeat purchases through loyalty flows, mobile wallet pass, and CRM synchronisation.',
  },
];

const capabilities = [
  {
    title: 'Discovery sprints',
    description: 'Customer interviews, funnel data dives, and service blueprinting to uncover high-impact experiments.',
    icon: Users,
  },
  {
    title: 'Prototype theatre',
    description: 'Clickable journeys, motion studies, and engineering spikes to validate product stories before roadmapping.',
    icon: Sparkles,
  },
  {
    title: 'Launch operations',
    description: 'Release orchestration, analytics wiring, and QA automation to move from beta to scale without friction.',
    icon: Rocket,
  },
];

const testimonials = [
  {
    quote:
      'Enigma had product, design, and engineering in the same stand-up. They shipped what our internal team had been debating for months—without chaos.',
    person: 'Amelia Rhodes',
    role: 'Chief Product Officer, Helios Labs',
  },
  {
    quote:
      'Their embedded model made it feel like we hired a squad that already knew our stack. From migration to measurement, the process just flowed.',
    person: 'Jonas Richter',
    role: 'VP Engineering, Orbit Airlines',
  },
];

export default function Projects() {
  return (
    <div className="theme-section transition-theme text-theme-primary">
      <section className="relative overflow-hidden px-6 py-24">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),rgba(168,85,247,0.1)_45%,rgba(15,23,42,0)_80%)] blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row">
          <div className="space-y-6 lg:w-3/5">
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-300">
              Proven delivery
            </span>
            <h1 className="font-aeonik text-4xl font-medium leading-tight text-theme-primary md:text-5xl">
              Product stories engineered for measurable outcomes
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-300/85">
              We specialise in launches where the stakes are high: new markets, monetisation pivots, or experience overhauls. Each project blends rapid experimentation with accountable delivery.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200">
                Request the full deck <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-theme px-5 py-3 text-sm font-medium text-theme-primary transition-theme hover:bg-muted">
                Watch a case study <PlayCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 space-y-5">
            <div className="flex h-[220px] items-center justify-center rounded-3xl border border-dashed border-theme theme-card-muted text-xs uppercase tracking-[0.45em] text-theme-muted">
              Case study reel placeholder
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {capabilities.map((capability) => (
                <div key={capability.title} className="rounded-3xl border border-theme theme-card transition-theme p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-theme theme-card transition-theme text-cyan-200">
                    <capability.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-theme-primary">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/80">{capability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">Selected case files</span>
              <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">
                Every engagement ships with a measurable before and after
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-300/80">
              Explore a sample of the product stories we can share publicly. Each card links to a password-free summary. The full case study library is available on request.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((study) => (
              <article key={study.title} className="group relative overflow-hidden rounded-3xl border border-theme theme-card transition-theme transition-theme card-lift transform-gpu translate-y-0 hover:-translate-y-1 hover:shadow-theme">
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                  background: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.16))',
                  mixBlendMode: 'screen',
                }} />
                <div className="relative space-y-4">
                  <span className="inline-flex items-center rounded-full border border-theme px-3 py-1 text-[10px] uppercase tracking-[0.45em] text-cyan-300">
                    {study.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-theme-primary">{study.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300/85">{study.outcome}</p>
                  <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-theme theme-card-muted text-[11px] uppercase tracking-[0.4em] text-theme-muted">
                    Imagery placeholder
                  </div>
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
                    Open summary <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/35 px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="space-y-3 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-cyan-200/75">Testimonials</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">Partners on the other side of launch day</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.person} className="relative overflow-hidden rounded-3xl border border-theme theme-card transition-theme p-6 text-left">
                <div className="space-y-4">
                  <p className="text-base italic leading-relaxed text-slate-200/85">“{testimonial.quote}”</p>
                  <footer className="space-y-1 text-sm">
                    <div className="font-semibold text-theme-primary">{testimonial.person}</div>
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-400/80">{testimonial.role}</div>
                  </footer>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 rounded-3xl border border-theme theme-card transition-theme px-8 py-10 text-center shadow-theme">
          <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">Planning a high-stakes release?</h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300/80">
            Show us the brief, deck, or KPI you need to move. We’ll map the squad, timeline, and proof points from similar launches so you can make an informed call.
          </p>
          <button className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200">
            Book a chemistry call <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}












