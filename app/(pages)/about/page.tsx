'use client';

import {
  ArrowUpRight,
  Award,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
  Timer,
  Users,
} from 'lucide-react';

const studioMetrics = [
  { label: 'Launches guided', value: '48' },
  { label: 'Senior specialists', value: '18' },
  { label: 'Time zones covered', value: '5' },
];

const principles = [
  {
    icon: Target,
    title: 'Impact over output',
    copy: 'Every sprint anchors to the commercial bet we’re helping you win. If it doesn’t move a metric, it doesn’t ship.',
  },
  {
    icon: Sparkles,
    title: 'Craft with systems',
    copy: 'Design languages, code standards, and rituals that scale with your team long after launch day.',
  },
  {
    icon: Users,
    title: 'Partnership, not handoff',
    copy: 'We embed beside founders and product leaders, coaching internal teams while delivering momentum.',
  },
];

const studioMilestones = [
  {
    year: '2021',
    heading: 'Studio founded in Manchester',
    text: 'Enigma Digital launches as a distributed collective for early-stage venture teams searching for traction.',
  },
  {
    year: '2022',
    heading: 'Scaled squads for Series A brands',
    text: 'Embedded hybrid pods ship growth loops and design systems for B2B SaaS and travel marketplaces.',
  },
  {
    year: '2024',
    heading: 'Global partnerships go live',
    text: 'Cross-timezone delivery with satellite teams in Dubai and Barcelona brings 24/5 coverage for enterprise innovation labs.',
  },
];

const leadership = [
  {
    name: 'Leah Mercer',
    role: 'Partner, Product Strategy',
    focus: 'Former VP Product at venture-backed SaaS, now architecting product bets and OKR operating models.',
  },
  {
    name: 'Ravi Khanna',
    role: 'Partner, Engineering',
    focus: '15 years across fintech and infra. Champions type-safe stacks, DevOps maturity, and measurable reliability.',
  },
  {
    name: 'Zoë Haddad',
    role: 'Partner, Design & Research',
    focus: 'Design leader behind award-winning multi-market launches. Obsessed with accessibility and inclusive craft.',
  },
];

export default function About() {
  return (
    <div className="theme-section transition-theme text-theme-primary">
      <section className="relative overflow-hidden px-6 py-24">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),rgba(168,85,247,0.1)_45%,rgba(15,23,42,0)_80%)] blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row">
          <div className="space-y-6 lg:w-3/5">
            <div className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-xs uppercase tracking-[0.45em] text-cyan-300">
              <Compass className="h-4 w-4" />
              Our studio
            </div>
            <h1 className="font-aeonik text-4xl font-medium leading-tight text-theme-primary md:text-5xl">
              We partner with teams who refuse to ship average
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-theme-muted">
              Enigma Digital is a remote-first crew of strategists, designers, and engineers building products that turn curiosity into retention. We lead with discovery, prototype fast, and leave teams with playbooks they can run without us.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {studioMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-theme theme-card transition-theme px-5 py-6 text-center shadow-theme"
                >
                  <div className="text-3xl font-semibold text-theme-primary">{metric.value}</div>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-theme-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-3xl border border-theme theme-card transition-theme p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.32),rgba(15,23,42,0)_65%)] opacity-60" />
            <div className="relative space-y-5">
              <h2 className="text-lg font-semibold text-theme-primary">What working with us feels like</h2>
              <ul className="space-y-4 text-sm text-theme-muted">
                <li className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 text-cyan-300" aria-hidden />
                  Discovery workshops that surface your real constraints in week one.
                </li>
                <li className="flex items-start gap-3">
                  <Timer className="mt-1 h-5 w-5 text-cyan-300" aria-hidden />
                  Weekly demos, async clips, and visibility across boards so momentum never stalls.
                </li>
                <li className="flex items-start gap-3">
                  <Award className="mt-1 h-5 w-5 text-cyan-300" aria-hidden />
                  Crafted output—from pitch decks to production code—ready to scale without rework.
                </li>
              </ul>
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-theme hover:opacity-90">
                Meet the partners <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-cyan-300">Principles</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">
              The guardrails that keep every partnership bold and measured
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-theme-muted">
              We bring product strategy, research, design, and engineering into one operating system. These principles are how we stay aligned with your leadership team from kick-off to handover.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="group relative overflow-hidden rounded-3xl border border-theme theme-card transition-theme transition-theme card-lift transform-gpu translate-y-0 hover:-translate-y-1 hover:shadow-theme"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                  background: 'linear-gradient(140deg, rgba(56,189,248,0.16), rgba(168,85,247,0.14))',
                  mixBlendMode: 'screen',
                }} />
                <div className="relative space-y-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-theme theme-card transition-theme text-cyan-200">
                    <principle.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-theme-primary">{principle.title}</h3>
                  <p className="text-sm leading-relaxed text-theme-muted">{principle.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row">
          <div className="max-w-md space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-cyan-300">Milestones</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">
              Built for distributed ambition from day one
            </h2>
            <p className="text-sm leading-relaxed text-theme-muted">
              We operate as an extension of your product organisation. Remote rituals, async tooling, and co-location bursts keep decision makers aligned across regions.
            </p>
          </div>
          <div className="flex-1 space-y-8">
            {studioMilestones.map((milestone) => (
              <div key={milestone.year} className="grid gap-4 rounded-3xl border border-theme theme-card transition-theme p-6 md:grid-cols-[120px_1fr]">
                <div className="flex items-start">
                  <span className="rounded-full border border-theme px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-300">
                    {milestone.year}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-theme-primary">{milestone.heading}</h3>
                  <p className="text-sm leading-relaxed text-theme-muted">{milestone.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <span className="mx-auto text-xs uppercase tracking-[0.5em] text-cyan-300">Leadership circle</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">Partners who stay close to the work</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-theme-muted">
              Every engagement is co-led by partners who have shipped products for venture-backed scaleups, global travel brands, and regulated fintech. We stay in the rituals, not just status calls.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="relative overflow-hidden rounded-3xl border border-theme theme-card transition-theme p-6 text-left"
              >
                <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-theme theme-card-muted text-xs uppercase tracking-[0.4em] text-theme-muted">
                  Team portrait placeholder
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-lg font-semibold text-theme-primary">{leader.name}</h3>
                  <p className="text-sm font-medium text-cyan-300">{leader.role}</p>
                  <p className="text-sm leading-relaxed text-theme-muted">{leader.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}












