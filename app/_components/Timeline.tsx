// app/_components/Timeline.tsx
"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { steps } from "@/constants/steps";
import AutoTypingConsole from "@/components/ui/auto-typing-console";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  number: string;
  title: string;
  text: string;
};

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hoverCleanups: Array<() => void> = [];

    const attachHoverSpotlight = (
      cardEl: HTMLDivElement,
      bgEl: HTMLElement
    ) => {
      const updateSpotlightPosition = (event: PointerEvent | FocusEvent) => {
        if (!cardEl.classList.contains("timeline-card--active")) return;

        const rect = cardEl.getBoundingClientRect();
        const x =
          event instanceof PointerEvent
            ? ((event.clientX - rect.left) / rect.width) * 100
            : 50;
        const y =
          event instanceof PointerEvent
            ? ((event.clientY - rect.top) / rect.height) * 100
            : 50;

        bgEl.style.setProperty("--spot-x", `${x}%`);
        bgEl.style.setProperty("--spot-y", `${y}%`);
      };

      const pointerEnter = (event: PointerEvent) => {
        if (!cardEl.classList.contains("timeline-card--active")) return;
        bgEl.dataset.spotActive = "true";
        updateSpotlightPosition(event);
      };

      const pointerMove = (event: PointerEvent) => {
        updateSpotlightPosition(event);
      };

      const pointerLeave = () => {
        bgEl.dataset.spotActive = "false";
      };

      const focusIn = (event: FocusEvent) => {
        bgEl.dataset.spotActive = "true";
        updateSpotlightPosition(event);
      };

      const focusOut = () => {
        bgEl.dataset.spotActive = "false";
      };

      cardEl.addEventListener("pointerenter", pointerEnter);
      cardEl.addEventListener("pointermove", pointerMove);
      cardEl.addEventListener("pointerleave", pointerLeave);
      cardEl.addEventListener("focusin", focusIn);
      cardEl.addEventListener("focusout", focusOut);

      hoverCleanups.push(() => {
        cardEl.removeEventListener("pointerenter", pointerEnter);
        cardEl.removeEventListener("pointermove", pointerMove);
        cardEl.removeEventListener("pointerleave", pointerLeave);
        cardEl.removeEventListener("focusin", focusIn);
        cardEl.removeEventListener("focusout", focusOut);
      });
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      document.querySelectorAll(".timeline-item").forEach((node) => {
        const item = node as HTMLElement;
        const line = item.querySelector(".connector-line");
        const card = item.querySelector<HTMLDivElement>(".timeline-card");
        const dot = item.querySelector(".timeline-dot");
        const title = item.querySelector(".timeline-title");
        const subtitle = item.querySelector(".timeline-subtitle");
        const stepNumber = item.querySelector(".timeline-step-number");
        const bg = item.querySelector<HTMLElement>(".timeline-bg");

        if (line && card && dot && bg) {
          gsap.set(line, { background: "var(--timeline-line-idle)" });
          gsap.set(card, { borderColor: "var(--border-strong)" });
          gsap.set(bg, { backgroundColor: "var(--surface-card-muted)", backgroundImage: "none" });
          gsap.set(dot, { scale: 0, opacity: 0 });

          attachHoverSpotlight(card, bg);

          ScrollTrigger.create({
            trigger: item,
            start: "center center",
            end: "bottom center",
            onEnter: () => {
              card.classList.add("timeline-card--active");
              bg.dataset.spotActive = card.matches(
                ":hover, :focus-within"
              )
                ? "true"
                : "false";

              gsap.to(line, {
                scaleX: 1,
                boxShadow: "2px 2px 2px #fff",
                background:
                  "linear-gradient(to right, #ec4899, #22d3ee, #3b82f6)",
                duration: 0.6,
              });
              
              gsap.to(card, {
                borderColor: "var(--timeline-line-active)",
                duration: 0.6,
              });
              gsap.to(bg, {
                backgroundImage:
                  "linear-gradient(135deg, rgba(56,189,248,0.2), rgba(168,85,247,0.2))",
                backgroundColor: "var(--timeline-card-active)",
                duration: 0.6,
              });
              gsap.to(title, { opacity: 1 });
              gsap.to(subtitle, { opacity: 1 });
              gsap.to(stepNumber, { opacity: 1 });
              gsap.to(dot, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(2)",
              });
            },
            onLeaveBack: () => {
              card.classList.remove("timeline-card--active");
              bg.dataset.spotActive = "false";
              bg.style.removeProperty("--spot-x");
              bg.style.removeProperty("--spot-y");


              gsap.to(line, { background: "var(--timeline-line-idle)", duration: 0.4, scaleX: 0 });
              gsap.to(card, {
                borderColor: "var(--border-strong)",
                duration: 0.6,
              });
              gsap.to(bg, {
                backgroundImage: "none",
                backgroundColor: "var(--surface-card-muted)",
                duration: 0.6,
              });
              gsap.to(title, { opacity: 0 });
              gsap.to(subtitle, { opacity: 0 });
              gsap.to(stepNumber, { opacity: 0 });
              gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
            },
          });
        }
      });
    }, containerRef);

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="timeline-spine"
      ref={containerRef}
      className="relative flex flex-col items-center overflow-hidden theme-section px-6 py-24"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-12 h-[420px] w-[420px] -translate-x-1/2 rounded-full glow-accent blur-[140px]"
        aria-hidden
      />

      <div className="relative w-full max-w-6xl">
        <header className="mb-16 max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-[0.6em] text-cyan-200/70">
            How we build momentum
          </span>
          <AutoTypingConsole
            text="Get to know how we do it"
            className="text-left"
          />
          <p className="text-base leading-relaxed text-theme-muted">
            Each milestone blends discovery, design, and delivery so you stay aligned and keep releasing value. Scroll the spine or hover a phase to explore what lights up.
          </p>
        </header>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0" />

          <div className="space-y-20">
            {steps.map((step: Step, index) => (
              <div
                key={step.number}
                className={clsx(
                  "timeline-item relative flex items-center",
                  index % 2 === 0 ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={clsx(
                    "connector-line absolute top-1/2 w-1/2 h-px scale-x-0",
                    index % 2 === 0 ? "right-1/2 origin-right" : "left-1/2 origin-left"
                  )}
                />
                <div
                  className={clsx(
                    "timeline-dot absolute top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400",
                    index % 2 === 0
                      ? "right-1/2 translate-x-1/2"
                      : "left-1/2 -translate-x-1/2"
                  )}
                />

                <div className="timeline-card relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-theme">
                  <div className="timeline-bg rounded-3xl theme-card-muted p-6">
                    <div className="flex items-center justify-between gap-4 pb-4">
                      <span className="text-sm font-semibold uppercase tracking-[0.4em] text-theme-muted">
                        Phase {step.number}
                      </span>
                      <CheckCircle2 className="h-5 w-5 text-cyan-200/80" />
                    </div>
                    <h4 className="timeline-title text-xl font-semibold text-theme-primary opacity-0">
                      {step.title}
                    </h4>
                    <p className="timeline-subtitle mt-3 text-sm leading-relaxed text-theme-muted opacity-0">
                      {step.text}
                    </p>
                    <div className="timeline-step-number sr-only">{step.number}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="timeline-end-sentinel" className="h-1 w-px bg-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Timeline;


