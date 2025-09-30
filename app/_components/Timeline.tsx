// app/_components/Timeline.tsx
"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/constants/steps";
import AutoTypingConsole from "@/components/ui/auto-typing-console";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  number: string;
  title: string;
  text: string;
};

const SHINE_START = { opacity: 0, xPercent: -220, rotate: 18 };
const SHINE_END = { xPercent: 1500 };

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hoverCleanups: Array<() => void> = [];

    const animateShine = (target: HTMLElement) => {
      gsap.killTweensOf(target);
      return gsap.fromTo(target, SHINE_START, {
        ...SHINE_END,
        opacity: 0.95,
        duration: 0.45,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(target, SHINE_START);
        },
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

      document.querySelectorAll(".timeline-item").forEach((item) => {
        const line = item.querySelector(".connector-line");
        const card = item.querySelector<HTMLDivElement>(".timeline-card");
        const dot = item.querySelector(".timeline-dot");
        const shine = card?.querySelector<HTMLElement>(".timeline-shine");

        if (line && card && dot) {
          gsap.set(line, { background: "#333" });
          gsap.set(card, { borderColor: "#333" });
          gsap.set(dot, { scale: 0, opacity: 0 });
          if (shine) gsap.set(shine, SHINE_START);

          if (shine) {
            const handleHover = () => animateShine(shine);
            card.addEventListener("mouseenter", handleHover);
            card.addEventListener("focusin", handleHover);
            hoverCleanups.push(() => {
              card.removeEventListener("mouseenter", handleHover);
              card.removeEventListener("focusin", handleHover);
            });
          }

          ScrollTrigger.create({
            trigger: item,
            start: "center center",
            end: "bottom center",
            onEnter: () => {
              card.classList.add("timeline-card--active");
              if (shine) animateShine(shine);

              gsap.to(line, {
                background:
                  "linear-gradient(to right, #ec4899, #22d3ee, #3b82f6)",
                duration: 0.6,
              });
              gsap.to(card, {
                borderColor: "transparent",
                background:
                  "linear-gradient(to right, #ec4899, #22d3ee, #3b82f6)",
                duration: 0.8,
              });
              gsap.to(dot, {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: "back.out(2)",
              });
            },
            onLeaveBack: () => {
              card.classList.remove("timeline-card--active");
              if (shine) {
                gsap.killTweensOf(shine);
                gsap.set(shine, SHINE_START);
              }

              gsap.to(line, { background: "#333", duration: 0.4 });
              gsap.to(card, {
                background: "black",
                borderColor: "#333",
                duration: 0.6,
              });
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
      className="relative bg-[url(/./assets/background4.avif)] bg-repeat bg-cover"
    >
      <div className="bg-gradient-to-t w-full h-full from-black via-transparent to-black">
        <div className="backdrop-blur-[30px] bg-[rgba(0,0,0,0.5)] py-20 px-6 xl:px-32">
          <AutoTypingConsole
            text="Get To Know How We Do it"
            className="mb-12 text-center"
          />

          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 via-cyan-400 to-blue-400 rounded-full timeline-spine origin-top" />

          <div className="space-y-24 relative">
            {steps.map((step: Step, i: number) => (
              <div
                key={step.number}
                className={`timeline-item relative flex items-center w-full ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`connector-line absolute top-1/2 w-1/2 h-[2px] ${
                    i % 2 === 0 ? "right-1/2" : "left-1/2"
                  }`}
                />
                <div
                  className={`timeline-dot absolute top-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 via-cyan-400 to-blue-400 transform -translate-y-1/2 ${
                    i % 2 === 0
                      ? "right-1/2 translate-x-1/2"
                      : "left-1/2 -translate-x-1/2"
                  }`}
                />

                <div className="timeline-card relative z-10 group p-0.5 w/full max-w-md rounded-xl border">
                  <div className="bg-blur glass-panel rounded-xl p-6 h-full transition-transform duration-300 -translate-y-10 group-hover:-translate-y-0">
                    <span className="timeline-shine" aria-hidden />
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-cyan-300 font-bold text-xl">
                        {step.number}
                      </span>
                      <CheckCircle2 className="text-pink-400 w-5 h-5 opacity-70 group-hover:opacity-100 transition" />
                    </div>
                    <h4 className="text-white text-xl nt-semibold mb-2">
                      {step.title}
                    </h4>
                    <p className="text-white/70 text-base font-extralight leading-relaxed tracking-wide">
                      {step.text}
                    </p>
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
