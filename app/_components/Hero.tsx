"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";

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
import { useSmoothScroll } from "./SmoothScrollProvider";
import { siteEdgeGutterClass } from "./siteEdgeGutter";

gsap.registerPlugin(useGSAP);

type HeroProps = {
  frameSources: string[];
};

const fallbackFrame = `${HERO_FRAME_PUBLIC_PATH}/001.webp`;

export default function Hero({ frameSources = [] }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameSequenceRef = useRef<HeroFrameSequenceHandle>(null);
  const sectionProgressRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const lastProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollIntentRef = useRef<"down" | "up">("down");
  const lastTouchYRef = useRef(0);
  const revealProgressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const smoothScrollRef = useSmoothScroll();
  const reducedMotion = usePrefersReducedMotion();

  const frames = useMemo(
    () => (frameSources.length ? frameSources : [fallbackFrame]),
    [frameSources]
  );

  const checkpointFrameIndexes = useMemo(() => {
    const lastFrameIndex = Math.max(frames.length - 1, 0);
    const fallbackLastCheckpointIndex = Math.max(heroCheckpoints.length - 1, 1);

    return heroCheckpoints.map((_, index) => {
      const configuredFrame =
        HERO_SEQUENCE_CONFIG.textFrameCheckpoints[index] ??
        Math.round((lastFrameIndex * index) / fallbackLastCheckpointIndex);

      return Math.min(Math.max(configuredFrame, 0), lastFrameIndex);
    });
  }, [frames.length]);

  const handleSkipSection = useCallback(() => {
    const nextSection = sectionRef.current?.nextElementSibling;

    if (!(nextSection instanceof HTMLElement)) return;

    const lenis = smoothScrollRef?.current;

    if (lenis) {
      lenis.scrollTo(nextSection, {
        duration: reducedMotion ? 0 : 1,
        lock: false,
      });
      return;
    }

    nextSection.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reducedMotion, smoothScrollRef]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const setSectionProgress = (nextProgress: number) => {
        if (!sectionProgressRef.current) return;

        gsap.set(sectionProgressRef.current, {
          scaleX: nextProgress,
          transformOrigin: "left center",
        });
      };
      const setStep = (nextIndex: number) => {
        activeIndexRef.current = nextIndex;
        setActiveIndex((currentIndex) =>
          currentIndex === nextIndex ? currentIndex : nextIndex
        );
      };
      const setCopyRevealProgress = (nextProgress: number) => {
        const roundedProgress = Math.round(nextProgress * 100) / 100;

        if (Math.abs(revealProgressRef.current - roundedProgress) < 0.01) {
          return;
        }

        revealProgressRef.current = roundedProgress;
        setRevealProgress(roundedProgress);
      };
      const getStableProgress = (rawProgress: number) => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollYRef.current - 2;
        const isIntentionalScrollUp = scrollIntentRef.current === "up";
        const isLargeUpwardJump =
          currentScrollY <
          lastScrollYRef.current - Math.max(120, window.innerHeight * 0.18);
        const canMoveBackward =
          isScrollingUp && (isIntentionalScrollUp || isLargeUpwardJump);
        const progress =
          rawProgress >= 0.985
            ? 1
            : canMoveBackward
              ? rawProgress
              : Math.max(rawProgress, lastProgressRef.current);

        lastScrollYRef.current = currentScrollY;
        lastProgressRef.current = progress;

        return progress;
      };
      const getCheckpointIndex = (frameIndex: number) => {
        const biasedFrameIndex = Math.min(
          frameIndex + HERO_SEQUENCE_CONFIG.textCheckpointLeadFrames,
          checkpointFrameIndexes[checkpointFrameIndexes.length - 1] ?? frameIndex
        );

        return checkpointFrameIndexes.reduce(
          (closestIndex, checkpointFrame, index) => {
            const closestDistance = Math.abs(
              biasedFrameIndex - checkpointFrameIndexes[closestIndex]
            );
            const distance = Math.abs(biasedFrameIndex - checkpointFrame);

            return distance <= closestDistance ? index : closestIndex;
          },
          0
        );
      };
      const getRevealProgress = (
        frameIndex: number,
        checkpointIndex: number,
        lastFrameIndex: number
      ) => {
        const revealFrameIndex = Math.min(frameIndex, lastFrameIndex);
        const checkpointFrame = checkpointFrameIndexes[checkpointIndex] ?? 0;
        const previousFrame =
          checkpointFrameIndexes[checkpointIndex - 1] ?? checkpointFrame;
        const nextFrame =
          checkpointFrameIndexes[checkpointIndex + 1] ?? lastFrameIndex;
        const segmentStart =
          checkpointIndex === 0
            ? 0
            : (previousFrame + checkpointFrame) / 2;
        const segmentEnd =
          checkpointIndex === checkpointFrameIndexes.length - 1
            ? lastFrameIndex
            : (checkpointFrame + nextFrame) / 2;
        const segmentDistance = Math.max(segmentEnd - segmentStart, 1);
        const fillCompletionRatio = Math.min(
          Math.max(HERO_SEQUENCE_CONFIG.textFillCompletionRatio, 0.2),
          1
        );
        const segmentProgress =
          (revealFrameIndex - segmentStart) / segmentDistance;

        return Math.min(
          Math.max(segmentProgress / fillCompletionRatio, 0),
          1
        );
      };

      if (reducedMotion || frames.length <= 1) {
        frameSequenceRef.current?.drawFrame(0);
        setStep(0);
        setCopyRevealProgress(1);
        lastProgressRef.current = 0;
        lastScrollYRef.current = window.scrollY;

        let reducedMotionFrame = 0;
        const updateStaticProgress = () => {
          reducedMotionFrame = 0;

          if (!sectionRef.current) return;

          const sectionBounds = sectionRef.current.getBoundingClientRect();
          const scrollableDistance = Math.max(
            sectionRef.current.offsetHeight - window.innerHeight,
            1
          );
          const progress = Math.min(
            Math.max(-sectionBounds.top / scrollableDistance, 0),
            1
          );

          setSectionProgress(progress);
        };
        const requestStaticProgressUpdate = () => {
          if (reducedMotionFrame) return;
          reducedMotionFrame =
            window.requestAnimationFrame(updateStaticProgress);
        };

        updateStaticProgress();
        window.addEventListener("scroll", requestStaticProgressUpdate, {
          passive: true,
        });
        window.addEventListener("resize", requestStaticProgressUpdate);

        return () => {
          if (reducedMotionFrame) {
            window.cancelAnimationFrame(reducedMotionFrame);
          }

          window.removeEventListener("scroll", requestStaticProgressUpdate);
          window.removeEventListener("resize", requestStaticProgressUpdate);
        };
      }

      const lastFrameIndex = frames.length - 1;
      lastProgressRef.current = 0;
      lastScrollYRef.current = window.scrollY;
      scrollIntentRef.current = "down";
      let rafId = 0;

      const updateHero = () => {
        rafId = 0;

        if (!sectionRef.current) return;

        const sectionBounds = sectionRef.current.getBoundingClientRect();
        const scrollableDistance = Math.max(
          sectionRef.current.offsetHeight - window.innerHeight,
          1
        );
        const rawProgress = Math.min(
          Math.max(-sectionBounds.top / scrollableDistance, 0),
          1
        );
        const progress = getStableProgress(rawProgress);
        const frameIndex = Math.round(progress * lastFrameIndex);
        const checkpointIndex = getCheckpointIndex(frameIndex);
        const copyRevealProgress = getRevealProgress(
          frameIndex,
          checkpointIndex,
          lastFrameIndex
        );

        frameSequenceRef.current?.drawFrame(frameIndex);
        setStep(checkpointIndex);
        setCopyRevealProgress(copyRevealProgress);
        setSectionProgress(progress);
      };

      const requestUpdate = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(updateHero);
      };
      const handleWheelIntent = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) < 1) return;
        scrollIntentRef.current = event.deltaY > 0 ? "down" : "up";
      };
      const handleTouchStart = (event: TouchEvent) => {
        lastTouchYRef.current = event.touches[0]?.clientY ?? 0;
      };
      const handleTouchMove = (event: TouchEvent) => {
        const currentTouchY = event.touches[0]?.clientY ?? lastTouchYRef.current;
        const touchDelta = currentTouchY - lastTouchYRef.current;

        if (Math.abs(touchDelta) >= 2) {
          scrollIntentRef.current = touchDelta < 0 ? "down" : "up";
        }

        lastTouchYRef.current = currentTouchY;
      };
      const handleKeyIntent = (event: KeyboardEvent) => {
        if (
          event.key === "ArrowDown" ||
          event.key === "PageDown" ||
          event.key === "End" ||
          event.key === " "
        ) {
          scrollIntentRef.current = "down";
          return;
        }

        if (
          event.key === "ArrowUp" ||
          event.key === "PageUp" ||
          event.key === "Home"
        ) {
          scrollIntentRef.current = "up";
        }
      };

      frameSequenceRef.current?.drawFrame(0);
      setStep(0);
      setCopyRevealProgress(0);
      updateHero();

      window.addEventListener("wheel", handleWheelIntent, { passive: true });
      window.addEventListener("touchstart", handleTouchStart, { passive: true });
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("keydown", handleKeyIntent);
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);

      return () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }

        window.removeEventListener("wheel", handleWheelIntent);
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("keydown", handleKeyIntent);
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      };
    },
    {
      scope: sectionRef,
      dependencies: [checkpointFrameIndexes, frames.length, reducedMotion],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Enigma Code scrollytelling hero"
      className={`relative h-[500vh] ${siteEdgeGutterClass}`}
    >
      <div className="sticky top-0 isolate h-screen min-h-[100svh] overflow-hidden bg-[#02050d] text-[#f8fbff]">
        <HeroFrameSequence
          ref={frameSequenceRef}
          frameSources={frames}
          priorityFrameIndexes={checkpointFrameIndexes}
          reducedMotion={reducedMotion}
          className="absolute left-0 top-0 h-[48svh] w-screen sm:h-[54svh] lg:inset-0 lg:h-full lg:w-full"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(2,5,13,0.94)_0%,rgba(2,5,13,0.36)_42%,rgba(2,5,13,0)_72%)] lg:bg-[linear-gradient(90deg,rgba(2,5,13,0.9)_0%,rgba(3,9,23,0.72)_20%,rgba(3,9,23,0.24)_43%,rgba(2,5,13,0.04)_72%,rgba(2,5,13,0)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(2,5,13,0.88)_0%,rgba(2,5,13,0.5)_35%,rgba(2,5,13,0)_58%),radial-gradient(circle_at_50%_24%,rgba(56,189,248,0.08)_0%,rgba(56,189,248,0)_42%)] lg:bg-[radial-gradient(circle_at_76%_48%,rgba(56,189,248,0.07)_0%,rgba(56,189,248,0)_40%)]"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute left-1/2 top-[calc(env(safe-area-inset-top)+25px)] z-[48] w-[min(74vw,56rem)] -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="relative h-[14px] rounded-full bg-[rgba(3,10,24,0.42)] px-[3px] py-[3px] shadow-[0_14px_50px_rgba(5,18,38,0.34)] ring-1 ring-[rgba(154,202,255,0.16)] backdrop-blur-sm">
            <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(104,215,255,0.18),rgba(167,139,250,0.14),rgba(104,215,255,0.1))]" />
            <div className="relative h-full overflow-hidden rounded-full bg-[rgba(188,219,255,0.18)]">
              <div
                ref={sectionProgressRef}
                data-hero-progress-fill
                className="h-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,rgba(103,216,255,0.96),rgba(37,99,235,0.92)_58%,rgba(168,85,247,0.86))] shadow-[0_0_22px_rgba(103,216,255,0.48)]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.24)_0_1px,transparent_1px)] bg-[length:20%_100%] opacity-30" />
            </div>
          </div>
        </div>

        <div className="relative z-[45] flex h-full w-full items-end px-[var(--site-edge-gutter)] pb-[calc(env(safe-area-inset-bottom)+4.75rem)] pt-[50svh] sm:pt-[56svh] lg:items-center lg:py-20">
          <div className="relative w-full max-w-[30rem] sm:max-w-[32rem] lg:max-w-[28rem] xl:max-w-[30rem]">
            <span className="sr-only" aria-live="polite">
              Hero scena {activeIndex + 1} od {heroCheckpoints.length}
            </span>

            <HeroCopy
              checkpoints={heroCheckpoints}
              activeIndex={activeIndex}
              revealProgress={revealProgress}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSkipSection}
          data-hero-skip
          className="group absolute bottom-6 left-1/2 z-[45] inline-flex -translate-x-1/2 items-center gap-2 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[rgba(218,236,255,0.64)] transition duration-300 hover:text-[rgba(248,251,255,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67d8ff]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#02050d]"
          aria-label="Preskoči hero sekciju"
        >
          <span>Preskoči</span>
          <ArrowDown
            aria-hidden="true"
            className="h-4 w-4 text-[#67d8ff] drop-shadow-[0_0_10px_rgba(103,216,255,0.45)] transition-colors duration-300 group-hover:text-[#f8fbff]"
            style={
              reducedMotion
                ? undefined
                : { animation: "hero-skip-float 1.35s ease-in-out infinite alternate" }
            }
          />
        </button>
      </div>
    </section>
  );
}
