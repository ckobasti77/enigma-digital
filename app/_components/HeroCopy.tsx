"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { HeroCheckpoint } from "@/constants/heroScrollytelling";

type HeroCopyProps = {
  checkpoints: HeroCheckpoint[];
  activeIndex: number;
  revealProgress: number;
  reducedMotion: boolean;
};

export default function HeroCopy({
  checkpoints,
  activeIndex,
  revealProgress,
  reducedMotion,
}: HeroCopyProps) {
  const itemTransition = reducedMotion
    ? "transition-none"
    : "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <div className="relative min-h-[250px] w-full max-w-[30rem] sm:min-h-[310px] lg:min-h-[330px]">
      {checkpoints.map((checkpoint, index) => {
        const isActive = index === activeIndex;
        const HeadlineTag: "h1" | "h2" = index === 0 ? "h1" : "h2";

        return (
          <article
            key={checkpoint.headline}
            className={`absolute inset-0 flex flex-col justify-center ${
              isActive
                ? "pointer-events-auto"
                : "pointer-events-none"
            }`}
            aria-hidden={!isActive}
          >
            <div className="space-y-4 sm:space-y-5">
              <RevealText
                as={HeadlineTag}
                text={checkpoint.headline}
                revealProgress={isActive ? revealProgress : 0}
                reducedMotion={reducedMotion}
                tone="headline"
                className={`max-w-[12ch] font-deltha text-[clamp(1.85rem,6.7vw,3.2rem)] font-normal leading-[0.98] tracking-normal sm:max-w-[12ch] lg:text-[clamp(2.85rem,4.15vw,4.75rem)] ${itemTransition} ${
                  isActive
                    ? "translate-y-0 opacity-100 blur-0 delay-0"
                    : "translate-y-6 opacity-0 blur-[8px] delay-0"
                }`}
              />
              <RevealText
                as="p"
                text={checkpoint.subtitle}
                revealProgress={isActive ? revealProgress : 0}
                reducedMotion={reducedMotion}
                tone="body"
                className={`max-w-[26rem] text-[0.95rem] leading-relaxed sm:text-[1rem] ${itemTransition} ${
                  isActive
                    ? "translate-y-0 opacity-100 blur-0 delay-75"
                    : "translate-y-6 opacity-0 blur-[8px] delay-0"
                }`}
              />
              <div
                className={`flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap ${itemTransition} ${
                  isActive
                    ? "translate-y-0 opacity-100 blur-0 delay-150"
                    : "translate-y-6 opacity-0 blur-[8px] delay-0"
                }`}
              >
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

type RevealTextProps = {
  as: "h1" | "h2" | "p";
  text: string;
  revealProgress: number;
  reducedMotion: boolean;
  tone: "headline" | "body";
  className?: string;
};

const revealTone = {
  headline: {
    ghost: [138, 149, 166],
    lit: [238, 246, 255],
    ghostAlpha: 0.18,
    litAlpha: 0.96,
    blur: 1.2,
    glow: 0.055,
  },
  body: {
    ghost: [151, 166, 190],
    lit: [211, 226, 246],
    ghostAlpha: 0.2,
    litAlpha: 0.82,
    blur: 0.8,
    glow: 0.025,
  },
} as const;

function RevealText({
  as,
  text,
  revealProgress,
  reducedMotion,
  tone,
  className,
}: RevealTextProps) {
  const Component = as;
  const words = text.split(" ");
  const palette = revealTone[tone];
  const revealWindow = Math.max(1 / words.length, 0.08);

  return (
    <Component className={className} aria-label={text}>
      {words.map((word, index) => {
        const start = index / words.length;
        const rawReveal = reducedMotion
          ? 1
          : (revealProgress - start) / revealWindow;
        const wordReveal = Math.min(Math.max(rawReveal, 0), 1);
        const alpha =
          palette.ghostAlpha +
          (palette.litAlpha - palette.ghostAlpha) * wordReveal;
        const [ghostR, ghostG, ghostB] = palette.ghost;
        const [litR, litG, litB] = palette.lit;
        const red = Math.round(ghostR + (litR - ghostR) * wordReveal);
        const green = Math.round(ghostG + (litG - ghostG) * wordReveal);
        const blue = Math.round(ghostB + (litB - ghostB) * wordReveal);
        const blur = (1 - wordReveal) * palette.blur;
        const glowAlpha = wordReveal * palette.glow;

        return (
          <span aria-hidden="true" key={`${word}-${index}`}>
            <span
              className="inline-block"
              style={{
                color: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
                filter: `blur(${blur.toFixed(2)}px)`,
                textShadow:
                  wordReveal > 0
                    ? `0 0 ${(18 * wordReveal).toFixed(1)}px rgba(116, 204, 255, ${glowAlpha.toFixed(3)})`
                    : "none",
                willChange: "color, filter, text-shadow",
              }}
            >
              {word}
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Component>
  );
}
