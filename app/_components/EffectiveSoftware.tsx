// app/_components/EffectiveSoftware.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type Pillar = {
  id: number;
  title: string;
  description: string;
  href: string;
};

const pillars: Pillar[] = [
  {
    id: 1,
    title: "Product discovery & strategy",
    description:
      "Kick off with workshops, user research, and rapid validation so every sprint is anchored in customer and business value.",
    href: "/services/ui-ux-design",
  },
  {
    id: 2,
    title: "Experience & interface design",
    description:
      "Design intuitive journeys, component systems, and motion patterns that keep your product cohesive across platforms.",
    href: "/services/ui-ux-design",
  },
  {
    id: 3,
    title: "Engineering & integration",
    description:
      "Ship resilient software with modular architecture, modern DevOps, and automation from CI to cloud observability.",
    href: "/services/web-development",
  },
  {
    id: 4,
    title: "Scale & continuous improvement",
    description:
      "Measure outcomes, surface new opportunities, and iterate fast so your product stays ahead of growth targets.",
    href: "/services/seo-geo",
  },
];

export default function EffectiveSoftware() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isPointerActive = useRef(false);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollUpdateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const evaluate = () => {
      if (isPointerActive.current) return;
      const elements = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (!elements.length) return;

      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    };

    scrollUpdateRef.current = evaluate;

    const handler = () => requestAnimationFrame(evaluate);

    evaluate();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center overflow-hidden theme-section px-6 py-24 transition-theme">
      <div
        className="pointer-events-none absolute left-1/2 top-12 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.22)_0%,rgba(124,58,237,0.2)_40%,rgba(15,23,42,0)_80%)] blur-[140px]"
        aria-hidden
      />

      <div className="relative grid w-full max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
        <aside className="flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.6em] text-cyan-200/70">
              Effective software development
            </span>
            <h2 className="font-aeonik text-4xl font-medium text-theme-primary md:text-[2.8rem]">
              Strategy, design, and engineering working as one gets you further, faster.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-theme-muted">
              We embed senior, cross-functional teams that own outcomes from discovery to optimisation. Each phase feeds the next, so you reduce rework, stay aligned, and keep value shipping.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-t border-theme pt-6 text-sm text-theme-muted">
            <BadgeDot color="bg-emerald-400" label="Discovery-to-delivery squads" />
            <BadgeDot color="bg-sky-400" label="Outcome-driven playbooks" />
            <BadgeDot color="bg-violet-400" label="Enterprise-ready standards" />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-theme hover:opacity-90"
            >
              Book a conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-theme px-5 py-3 text-sm font-medium text-theme-primary transition-theme hover:bg-muted"
            >
              View success stories
            </Link>
          </div>
        </aside>

        <div
          className="relative flex flex-col gap-4"
          onPointerLeave={() => {
            isPointerActive.current = false;
            scrollUpdateRef.current();
          }}
        >
          <div className="pointer-events-none absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0" aria-hidden />

          {pillars.map((pillar, index) => {
            const active = index === activeIndex;
            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={clsx(
                  "group relative overflow-hidden rounded-3xl border border-theme theme-card px-6 py-5 card-lift transform-gpu hover:-translate-y-1 hover:shadow-theme",
                  active
                    ? "shadow-theme"
                    : "opacity-80 hover:opacity-100"
                )}
                onPointerEnter={() => {
                  isPointerActive.current = true;
                  setActiveIndex(index);
                }}
                onFocus={() => {
                  isPointerActive.current = true;
                  setActiveIndex(index);
                }}
                onBlur={() => {
                  isPointerActive.current = false;
                  scrollUpdateRef.current();
                }}
                tabIndex={0}
                aria-expanded={active}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.22), rgba(168,85,247,0.2))", mixBlendMode: "screen" }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-theme theme-card text-sm font-semibold text-theme-primary">
                    0{pillar.id}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-theme-primary">
                      {pillar.title}
                    </h3>
                    <p
                      className={clsx(
                        "text-sm leading-relaxed text-theme-muted transition-theme",
                        active ? "max-h-40 opacity-100" : "max-h-0 overflow-hidden opacity-0"
                      )}
                    >
                      {pillar.description}
                    </p>
                    <Link
                      href={pillar.href}
                      className={clsx(
                        "inline-flex items-center gap-2 text-sm font-medium text-cyan-200 transition-transform duration-300",
                        active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      )}
                    >
                      Explore this phase
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type BadgeProps = {
  color: string;
  label: string;
};

function BadgeDot({ color, label }: BadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className={clsx("h-2 w-2 rounded-full", color)} aria-hidden />
      <span>{label}</span>
    </div>
  );
}










