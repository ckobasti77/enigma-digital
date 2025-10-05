"use client";

import Link from "next/link";
import AutoTypingConsole from "@/components/ui/auto-typing-console";
import LaptopScene from "./LaptopScene";
import type { LucideIcon } from "lucide-react";
import { Compass, GaugeCircle, Layers } from "lucide-react";

type FeatureHighlight = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const featureHighlights: FeatureHighlight[] = [
  {
    icon: Compass,
    title: "Fractional product leadership",
    body: "Plug our strategists into your roadmap to align stakeholders, prioritise impact, and keep delivery lean.",
  },
  {
    icon: Layers,
    title: "Design systems that scale",
    body: "From first wireframe to atomic components, we craft experiences that feel effortless everywhere.",
  },
  {
    icon: GaugeCircle,
    title: "Engineering with measurable outcomes",
    body: "Modern architecture, CI/CD, and observability baked in-so shipping faster never compromises reliability.",
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-slate-950 px-6 py-24 text-slate-100">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.28)_0%,rgba(124,58,237,0.2)_40%,rgba(15,23,42,0)_80%)] blur-[160px]"
        aria-hidden
      />

      <div className="relative grid w-full max-w-6xl gap-16 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <div className="flex gap-4 border-b border-white/10 pb-6 text-sm text-slate-300/70">
              <HeroMetric value="+140%" label="Average traffic growth" />
              <HeroMetric value="24" label="Markets launched" />
              <HeroMetric value="98%" label="Client retention" />
            </div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.6em] text-cyan-200/70">
              Enigma Digital
            </span>
            <AutoTypingConsole text="Obsess clients with your brand" className="text-left" />
            <p className="max-w-xl text-base leading-relaxed text-slate-300/85">
              We design, build, and scale digital products that convert curiosity into loyal customers. Strategy, design, and engineering move together so your team can move faster.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Start a project
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/5"
            >
              See how we deliver
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="pointer-events-none absolute inset-0 rounded-[36px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,rgba(168,85,247,0.1)_45%,rgba(15,23,42,0)_80%)] blur-[120px]" aria-hidden />
          <div className="relative w-full max-w-xl">
            <div className="aspect-[4/3] w-full">
              <LaptopScene />
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-16 grid w-full max-w-6xl gap-4 md:grid-cols-3">
        {featureHighlights.map(({ title, body, icon: Icon }) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/55 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(8,47,73,0.35)]"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.18))",
                mixBlendMode: "screen",
              }}
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-9 w-9 items-center justify-center text-xs font-semibold text-white">
                <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
              </span>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-300/80">{body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type MetricProps = {
  value: string;
  label: string;
};

function HeroMetric({ value, label }: MetricProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl font-semibold text-white">{value}</span>
      <span className="max-w-[120px] text-xs uppercase tracking-[0.35em] text-slate-400/80">
        {label}
      </span>
    </div>
  );
}
