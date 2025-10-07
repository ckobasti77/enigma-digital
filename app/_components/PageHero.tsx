"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import AutoTypingConsole from "@/components/ui/auto-typing-console";
import type { LucideIcon } from "lucide-react";

type PageHeroMetric = {
  value: string;
  label: string;
};

type PageHeroHighlight = {
  title: string;
  body: string;
  icon?: LucideIcon;
  badge?: string;
};

type PageHeroCta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  icon?: LucideIcon;
};

export type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  metrics?: PageHeroMetric[];
  highlights?: PageHeroHighlight[];
  ctas?: PageHeroCta[];
  children?: ReactNode;
  footnote?: string;
};

export default function PageHero({
  eyebrow,
  title,
  description,
  metrics,
  highlights,
  ctas,
  children,
  footnote,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden theme-section px-6 py-24 transition-theme">
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22)_0%,rgba(168,85,247,0.18)_45%,rgba(15,23,42,0)_78%)] blur-[160px]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]">
        <div className="space-y-8">
          {eyebrow ? (
            <span className="inline-flex items-center text-xs uppercase tracking-[0.6em] text-cyan-300">
              {eyebrow}
            </span>
          ) : null}
          <AutoTypingConsole text={title} className="text-left text-4xl md:text-5xl" />
          <p className="max-w-xl text-base leading-relaxed text-theme-muted md:text-lg">{description}</p>
          {ctas && ctas.length ? (
            <div className="flex flex-wrap gap-3">
              {ctas.map(({ href, label, variant = "primary", icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
                    variant === "primary"
                      ? "bg-foreground text-background transition-theme hover:opacity-90"
                      : "border border-theme text-theme-primary transition-theme hover:bg-muted"
                  )}
                >
                  {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
                  {label}
                </Link>
              ))}
            </div>
          ) : null}
          {metrics && metrics.length ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-theme theme-card-muted px-4 py-5 shadow-theme"
                >
                  <div className="text-2xl font-semibold text-theme-primary md:text-3xl">{value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.28em] text-theme-muted">{label}</div>
                </div>
              ))}
            </div>
          ) : null}
          {footnote ? (
            <p className="text-sm text-theme-muted">{footnote}</p>
          ) : null}
        </div>

        {(highlights && highlights.length) || children ? (
          <div className="grid gap-6">
            {children}
            {highlights?.map(({ title: highlightTitle, body, icon: Icon, badge }) => (
              <article
                key={highlightTitle}
                className="group relative overflow-hidden rounded-3xl border border-theme theme-card px-6 py-6 card-lift transform-gpu translate-y-0 hover:-translate-y-1 hover:shadow-theme"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(168,85,247,0.16))",
                    mixBlendMode: "screen",
                  }}
                />
                <div className="relative flex gap-4">
                  {Icon ? (
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-theme theme-card text-cyan-200">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                  ) : null}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-theme-primary">{highlightTitle}</h3>
                      {badge ? (
                        <span className="rounded-full border border-theme px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300">
                          {badge}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm leading-relaxed text-theme-muted">{body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}














