'use client';

import { CalendarClock, Mail, MessageCircle, PhoneCall, Send, ArrowRight } from 'lucide-react';

const contactOptions = [
  {
    icon: Mail,
    title: 'Email the partners',
    description: 'hello@enigmadigital.studio — share a deck, Loom, or a quick outline of where you need momentum.',
    action: 'Open email',
  },
  {
    icon: CalendarClock,
    title: 'Book a strategy call',
    description: 'Pick a 30-minute slot to explore goals, constraints, and the metrics your exec team cares about.',
    action: 'View calendar',
  },
  {
    icon: MessageCircle,
    title: 'Async voice memo',
    description: 'Prefer async? Drop us a voice note or transcript and we’ll respond in the format you use internally.',
    action: 'Share a memo',
  },
];

const officeLocations = [
  {
    city: 'Manchester',
    timezone: 'GMT(+0)',
    address: '48 Lever Street, Northern Quarter',
  },
  {
    city: 'Dubai',
    timezone: 'GST(+4)',
    address: 'DIFC Innovation Hub, Gate Avenue',
  },
  {
    city: 'Barcelona',
    timezone: 'CET(+1)',
    address: 'Carrer de Pamplona, 88',
  },
];

export default function ContactUs() {
  return (
    <div className="theme-section transition-theme text-theme-primary">
      <section className="relative overflow-hidden px-6 py-24">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),rgba(168,85,247,0.12)_45%,rgba(15,23,42,0)_80%)] blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-xs uppercase tracking-[0.4em] text-cyan-300/80">
              Let’s build together
            </span>
            <h1 className="font-aeonik text-4xl font-medium leading-tight text-theme-primary md:text-5xl">
              Drop the brief. We’ll bring the squad.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-300/85">
              Tell us the outcome you need in the next two quarters. We’ll assemble the right strategists, designers, and engineers, then stay embedded until the playbook lives inside your team.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-theme theme-card px-4 py-5 text-center">
                <p className="text-3xl font-semibold text-theme-primary">&lt;12h</p>
                <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-slate-400/85">Avg response</span>
              </div>
              <div className="rounded-2xl border border-theme theme-card px-4 py-5 text-center">
                <p className="text-3xl font-semibold text-theme-primary">24/5</p>
                <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-slate-400/85">Coverage</span>
              </div>
              <div className="rounded-2xl border border-theme theme-card px-4 py-5 text-center">
                <p className="text-3xl font-semibold text-theme-primary">5</p>
                <span className="mt-2 block text-xs uppercase tracking-[0.3em] text-slate-400/85">Time zones</span>
              </div>
            </div>
            <div className="space-y-4">
              {contactOptions.map((option) => (
                <div
                  key={option.title}
                  className="flex flex-col gap-4 rounded-3xl border border-theme theme-card p-5 transition hover:border-theme hover:theme-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-theme theme-card text-cyan-300">
                      <option.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-base font-semibold text-theme-primary">{option.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-300/80">{option.description}</p>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-sm font-medium text-theme-primary transition-theme hover:border-theme">
                    {option.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-theme theme-card p-6 shadow-theme">
            <div className="space-y-6">
              <div className="space-y-2 text-left">
                <h2 className="text-xl font-semibold text-theme-primary">Start a project outline</h2>
                <p className="text-sm text-slate-300/75">
                  Share as much context as you can—your north star metric, blockers, timelines, or existing research. We’ll respond with a tailored plan.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm">
                    <span className="text-slate-200">Name</span>
                    <input
                      type="text"
                      placeholder="Ada Lovelace"
                      className="w-full rounded-xl border border-theme theme-card px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="text-slate-200">Work email</span>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-theme theme-card px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-cyan-300 focus:outline-none"
                    />
                  </label>
                </div>
                <label className="space-y-2 text-sm">
                  <span className="text-slate-200">Company</span>
                  <input
                    type="text"
                    placeholder="Company or collective"
                    className="w-full rounded-xl border border-theme theme-card px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-cyan-300 focus:outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-slate-200">What should we tackle together?</span>
                  <textarea
                    rows={5}
                    placeholder="Share product goals, tech stack, deadlines, or anything that helps us prep."
                    className="w-full rounded-xl border border-theme theme-card px-4 py-3 text-sm text-theme-primary placeholder:text-theme-muted focus:border-cyan-300 focus:outline-none"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <label className="space-y-2 text-sm">
                    <span className="text-slate-200">Preferred response style</span>
                    <select className="w-full rounded-xl border border-theme theme-card px-4 py-3 text-sm text-theme-primary focus:border-cyan-300 focus:outline-none">
                      <option>Email recap</option>
                      <option>Deck with options</option>
                      <option>Async Loom</option>
                      <option>Live working session</option>
                    </select>
                  </label>
                  <button
                    type="submit"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-theme hover:opacity-90"
                  >
                    Send outline <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/35 px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="space-y-3 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-cyan-300/75">Where we operate</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">Global footprint, same operating rhythm</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300/80">
              Distributed by design. We overlap across EMEA and support North American mornings with async rituals, recorded stand-ups, and shared dashboards.
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 space-y-4">
              {officeLocations.map((office) => (
                <div key={office.city} className="flex items-center justify-between rounded-3xl border border-theme theme-card p-5">
                  <div>
                    <h3 className="text-lg font-semibold text-theme-primary">{office.city}</h3>
                    <p className="text-sm text-slate-300/80">{office.address}</p>
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-cyan-300/75">{office.timezone}</div>
                </div>
              ))}
            </div>
            <div className="flex h-72 flex-1 items-center justify-center rounded-3xl border border-dashed border-theme theme-card text-xs uppercase tracking-[0.4em] text-theme-muted">
              Map / location visual placeholder
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 rounded-3xl border border-theme theme-card px-8 py-10 text-center">
          <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">Ready when you are</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-300/80">
            Share funding stage, KPIs, or challenges and we’ll tailor the first workshop agenda. If we’re not the best partner, we’ll point you to someone in our network who is.
          </p>
          <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-theme hover:opacity-90">
            Start the conversation <ArrowRight className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400/80">
            <PhoneCall className="h-4 w-4" /> Optional phone introductions available on request
          </div>
        </div>
      </section>
    </div>
  );
}




