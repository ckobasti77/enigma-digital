"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import {
  HERO_FRAME_PUBLIC_PATH,
  HERO_SEQUENCE_CONFIG,
  heroCheckpoints,
} from "@/constants/heroScrollytelling";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import HeroCopy from "./HeroCopy";
import HeroFrameSequence, {
  type HeroFrameSequenceHandle,
} from "./HeroFrameSequence";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type HeroProps = {
  frameSources: string[];
};

const fallbackFrame = `${HERO_FRAME_PUBLIC_PATH}/001.webp`;

export default function Hero({ frameSources = [] }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameSequenceRef = useRef<HeroFrameSequenceHandle>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef({ frame: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const frames = useMemo(
    () => (frameSources.length ? frameSources : [fallbackFrame]),
    [frameSources]
  );

  const checkpointFrameIndexes = useMemo(() => {
    const lastFrameIndex = Math.max(frames.length - 1, 0);
    const lastCheckpointIndex = Math.max(heroCheckpoints.length - 1, 1);

    return heroCheckpoints.map((_, index) =>
      Math.round((lastFrameIndex * index) / lastCheckpointIndex)
    );
  }, [frames.length]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const setStep = (nextIndex: number) => {
        setActiveIndex((currentIndex) =>
          currentIndex === nextIndex ? currentIndex : nextIndex
        );
      };

      if (reducedMotion || frames.length <= 1) {
        frameSequenceRef.current?.drawFrame(0);
        setStep(0);

        if (progressLineRef.current) {
          gsap.set(progressLineRef.current, { scaleX: 0 });
        }

        return;
      }

      const lastFrameIndex = frames.length - 1;
      const playhead = playheadRef.current;
      playhead.frame = 0;

      const tween = gsap.to(playhead, {
        frame: lastFrameIndex,
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: HERO_SEQUENCE_CONFIG.scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const frameIndex = Math.round(playhead.frame);
          const progress =
            lastFrameIndex > 0 ? playhead.frame / lastFrameIndex : 0;
          const checkpointIndex = Math.min(
            heroCheckpoints.length - 1,
            Math.floor(progress * heroCheckpoints.length)
          );

          frameSequenceRef.current?.drawFrame(frameIndex);
          setStep(checkpointIndex);

          if (progressLineRef.current) {
            gsap.set(progressLineRef.current, {
              scaleX: progress,
              transformOrigin: "left center",
            });
          }
        },
      });

      frameSequenceRef.current?.drawFrame(0);
      setStep(0);

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [frames.length, reducedMotion],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Enigma Code scrollytelling hero"
      className="relative h-[500vh]"
    >
      <div className="sticky top-0 isolate h-screen min-h-[100svh] overflow-hidden bg-[#02050d] text-[#f8fbff]">
        <HeroFrameSequence
          ref={frameSequenceRef}
          frameSources={frames}
          priorityFrameIndexes={checkpointFrameIndexes}
          reducedMotion={reducedMotion}
          className="absolute inset-0 h-full w-full"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,5,13,0.9)_0%,rgba(3,9,23,0.72)_20%,rgba(3,9,23,0.24)_43%,rgba(2,5,13,0.04)_72%,rgba(2,5,13,0)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(2,5,13,0.92)_0%,rgba(2,5,13,0.58)_32%,rgba(2,5,13,0.08)_68%),radial-gradient(circle_at_74%_44%,rgba(56,189,248,0.06)_0%,rgba(56,189,248,0)_35%)] lg:bg-[radial-gradient(circle_at_76%_48%,rgba(56,189,248,0.07)_0%,rgba(56,189,248,0)_40%)]"
          aria-hidden="true"
        />

        <div className="relative z-[45] flex h-full w-full items-end px-4 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] pt-28 sm:px-5 md:px-6 lg:items-center lg:px-[clamp(1rem,2.4vw,2.75rem)] lg:pb-0 lg:pt-20">
          <div className="flex w-full max-w-[30rem] flex-col gap-5 sm:max-w-[32rem] lg:max-w-[28rem] xl:max-w-[30rem]">
            <div className="flex w-24 items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 overflow-hidden rounded-full bg-[rgba(154,202,255,0.2)]">
                <span
                  ref={progressLineRef}
                  className="block h-full origin-left scale-x-0 bg-[linear-gradient(90deg,#38bdf8,#2563eb,#a855f7)]"
                />
              </span>
            </div>

            <span className="sr-only" aria-live="polite">
              Hero scena {activeIndex + 1} od {heroCheckpoints.length}
            </span>

            <HeroCopy
              checkpoints={heroCheckpoints}
              activeIndex={activeIndex}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 text-[0.62rem] uppercase tracking-[0.32em] text-[rgba(211,231,255,0.55)] lg:flex"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-[rgba(104,215,255,0.38)]" />
          <span>Skrolujte</span>
          <span className="h-px w-10 bg-[rgba(104,215,255,0.38)]" />
        </div>
      </div>
    </section>
  );
}
