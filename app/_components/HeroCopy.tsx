"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import type { HeroCheckpoint } from "@/constants/heroScrollytelling";

gsap.registerPlugin(useGSAP);

type HeroCopyProps = {
  checkpoints: HeroCheckpoint[];
  activeIndex: number;
  reducedMotion: boolean;
};

export default function HeroCopy({
  checkpoints,
  activeIndex,
  reducedMotion,
}: HeroCopyProps) {
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(".hero-copy-panel");
      const activePanel = panels[activeIndex];

      if (!activePanel) return;

      gsap.killTweensOf(panels);
      panels.forEach((panel, index) => {
        const items = panel.querySelectorAll(".hero-copy-item");
        gsap.killTweensOf(items);

        if (index !== activeIndex) {
          gsap.set(panel, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
          gsap.set(items, {
            autoAlpha: 0,
            y: 24,
            filter: "blur(8px)",
          });
          return;
        }

        if (reducedMotion) {
          gsap.set(panel, {
            autoAlpha: index === activeIndex ? 1 : 0,
            pointerEvents: index === activeIndex ? "auto" : "none",
          });
          gsap.set(items, {
            autoAlpha: index === activeIndex ? 1 : 0,
            y: 0,
            filter: "blur(0px)",
          });
        }
      });

      if (reducedMotion) {
        return;
      }

      gsap.set(activePanel, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      gsap.fromTo(
        activePanel.querySelectorAll(".hero-copy-item"),
        {
          autoAlpha: 0,
          y: 24,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.76,
          stagger: 0.075,
          ease: "power3.out",
        }
      );
    },
    {
      scope: copyRef,
      dependencies: [activeIndex, reducedMotion],
    }
  );

  return (
    <div
      ref={copyRef}
      className="relative min-h-[320px] w-full max-w-[30rem] sm:min-h-[310px] lg:min-h-[350px]"
    >
      {checkpoints.map((checkpoint, index) => {
        const isActive = index === activeIndex;
        const HeadlineTag = index === 0 ? "h1" : "h2";

        return (
          <article
            key={checkpoint.headline}
            className={`hero-copy-panel absolute inset-0 flex flex-col justify-end lg:justify-start ${
              isActive ? "visible" : "invisible pointer-events-none opacity-0"
            }`}
            aria-hidden={!isActive}
          >
            <div className="space-y-4 sm:space-y-5">
              <HeadlineTag className="hero-copy-item max-w-[12ch] font-aeonik text-[clamp(2.05rem,7.4vw,3.65rem)] font-medium leading-[0.96] tracking-normal text-[#f8fbff] sm:max-w-[12ch] lg:text-[clamp(3.25rem,4.7vw,5.35rem)]">
                {checkpoint.headline}
              </HeadlineTag>
              <p className="hero-copy-item max-w-[27rem] text-[0.98rem] leading-relaxed text-[rgba(226,238,255,0.78)] sm:text-[1.05rem]">
                {checkpoint.subtitle}
              </p>
              <div className="hero-copy-item flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <Link
                  href={checkpoint.primaryCta.href}
                  tabIndex={isActive ? undefined : -1}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(99,201,255,0.5)] bg-[linear-gradient(135deg,rgba(14,165,233,0.95),rgba(37,99,235,0.82)_55%,rgba(124,58,237,0.7))] px-5 py-3 text-sm font-semibold text-[#f8fbff] shadow-[0_0_32px_rgba(14,165,233,0.24)] transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(161,224,255,0.78)] hover:shadow-[0_0_42px_rgba(14,165,233,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67d8ff]/70 sm:px-6"
                >
                  {checkpoint.primaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={checkpoint.secondaryCta.href}
                  tabIndex={isActive ? undefined : -1}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(173,210,255,0.22)] bg-[rgba(5,12,28,0.28)] px-5 py-3 text-sm font-semibold text-[rgba(238,246,255,0.88)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(104,215,255,0.48)] hover:bg-[rgba(16,31,58,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67d8ff]/60 sm:px-6"
                >
                  {checkpoint.secondaryCta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
