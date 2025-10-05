// app/_components/ServiceCards.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { navLinks } from "@/constants/navLinks";
import { ExternalLink } from "lucide-react";

const TIMELINE_SENTINEL_ID = "timeline-end-sentinel";

const services =
  navLinks.find((link) => link.text === "Services")?.dropdownLinks ?? [];

export default function ServiceCards() {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(TIMELINE_SENTINEL_ID);
    if (!sentinel) {
      setHighlighted(true);
      return;
    }

    const onScroll = () => {
      const rect = sentinel.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      setHighlighted(rect.top <= viewportCenter);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-slate-950 px-6 py-24 text-slate-100">
      <div
        className={clsx(
          "pointer-events-none absolute left-1/2 top-8 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[160px] transition-opacity duration-700",
          highlighted
            ? "opacity-100 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22)_0%,rgba(168,85,247,0.18)_45%,rgba(15,23,42,0)_78%)]"
            : "opacity-40 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.16)_0%,rgba(15,23,42,0)_75%)]"
        )}
        aria-hidden
      />

      <div className="relative w-full max-w-6xl space-y-16">
        <header className="flex flex-col items-center gap-4 text-center">
          <span className="text-xs uppercase tracking-[0.6em] text-cyan-200/70">
            Services tuned for traction
          </span>
          <h2 className="max-w-3xl font-aeonik text-4xl font-medium text-white md:text-5xl">
            Pick the discipline, we plug in the squad you need.
          </h2>
          <p className="max-w-2xl text-base text-slate-300/85 md:text-lg">
            Each engagement blends strategy, design, and engineering. Hover to preview the focus of every partnership and click to dive deeper.
          </p>
        </header>

        <div className="relative grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={`/services/${service.to}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/65 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(8,47,73,0.45)]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.18))",
                    mixBlendMode: "screen",
                  }}
                />
                <div className="relative w-full h-full flex items-center justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-slate-950/70">
                      <Icon className="h-6 w-6 text-cyan-200/85" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">
                        {service.headline}
                      </h3>
                      <p className="text-sm text-slate-300/85">
                        {service.subheadline}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-5 w-5 text-white/80" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

