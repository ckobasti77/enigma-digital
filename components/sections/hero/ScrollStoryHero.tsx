"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/app/_components/SmoothScrollProvider";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  scrollStorySlides,
  type HeroCopyPlacement,
} from "./scrollStoryData";

gsap.registerPlugin(useGSAP);

type SequenceKey = "desktop" | "mobile";

type FrameSequence = {
  cacheLimit: number;
  dprCap: number;
  firstFrame: number;
  forwardVideoPath: string;
  key: SequenceKey;
  lastFrame: number;
  preloadAhead: number;
  preloadBehind: number;
  publicPath: string;
  reverseVideoPath: string;
  stopFrames: readonly number[];
  unavailableFrames: ReadonlySet<number>;
  videoFps: number;
};

type CachedFrame = {
  failed?: boolean;
  image?: HTMLImageElement;
  promise?: Promise<HTMLImageElement | null>;
  touched: number;
};

type QueuedFrame = {
  entry: CachedFrame;
  frame: number;
  key: string;
  priority: boolean;
  resolve: (image: HTMLImageElement | null) => void;
  sequence: FrameSequence;
};

type CopyPanelStyle = CSSProperties & {
  "--copy-safe-width": string;
};

const DESKTOP_SEQUENCE: FrameSequence = {
  cacheLimit: 8,
  dprCap: 2,
  firstFrame: 1,
  forwardVideoPath: "/hero-story/desktop-forward.mp4",
  key: "desktop",
  lastFrame: 394,
  preloadAhead: 2,
  preloadBehind: 1,
  publicPath: "/hero-frames-web",
  reverseVideoPath: "/hero-story/desktop-reverse.mp4",
  stopFrames: scrollStorySlides.map((slide) => slide.frames.desktop),
  unavailableFrames: new Set([62]),
  videoFps: 60,
};

const MOBILE_SEQUENCE: FrameSequence = {
  cacheLimit: 8,
  dprCap: 1.5,
  firstFrame: 1,
  forwardVideoPath: "/hero-story/mobile-forward.mp4",
  key: "mobile",
  lastFrame: 334,
  preloadAhead: 2,
  preloadBehind: 1,
  publicPath: "/hero-frames-mobile",
  reverseVideoPath: "/hero-story/mobile-reverse.mp4",
  stopFrames: scrollStorySlides.map((slide) => slide.frames.mobile),
  unavailableFrames: new Set(),
  videoFps: 60,
};

const MOBILE_SEQUENCE_QUERY =
  "(max-width: 899px), (max-width: 1099px) and (orientation: portrait)";
const INTRO_DURATION_MS = 2050;
const TRANSITION_DURATION_MS = 750;
const INTRO_SAMPLE_COUNT = 40;
const TRANSITION_SAMPLE_COUNT = 28;
const VIDEO_READY_TIMEOUT_MS = 6_000;
const VIDEO_SEEK_TIMEOUT_MS = 2_000;
const MAX_ACTIVE_IMAGE_LOADS = 4;
const MAX_QUEUED_IMAGE_LOADS = 44;
const WHEEL_THRESHOLD = 45;
const WHEEL_GESTURE_QUIET_MS = 220;
const TOUCH_THRESHOLD = 45;
const INPUT_COOLDOWN_MS = 180;
const LAST_STORY_INDEX = scrollStorySlides.length - 1;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function frameCacheKey(sequence: FrameSequence, frame: number) {
  return `${sequence.key}:${frame}`;
}

function framePath(sequence: FrameSequence, frame: number) {
  return `${sequence.publicPath}/${String(frame).padStart(3, "0")}_compressed.webp`;
}

function resolveAvailableFrame(
  sequence: FrameSequence,
  requestedFrame: number,
  direction: number,
) {
  const frame = clamp(
    Math.round(requestedFrame),
    sequence.firstFrame,
    sequence.lastFrame,
  );

  if (!sequence.unavailableFrames.has(frame)) {
    return frame;
  }

  const primaryDirection = direction < 0 ? -1 : 1;
  for (let offset = 1; offset <= sequence.lastFrame; offset += 1) {
    const primary = frame + offset * primaryDirection;
    if (
      primary >= sequence.firstFrame &&
      primary <= sequence.lastFrame &&
      !sequence.unavailableFrames.has(primary)
    ) {
      return primary;
    }

    const fallback = frame - offset * primaryDirection;
    if (
      fallback >= sequence.firstFrame &&
      fallback <= sequence.lastFrame &&
      !sequence.unavailableFrames.has(fallback)
    ) {
      return fallback;
    }
  }

  return sequence.firstFrame;
}

function copyPanelStyle(placement: HeroCopyPlacement): CopyPanelStyle {
  const viewportGutter = placement.maxWidth.viewportPercent >= 60 ? 32 : 64;

  return {
    "--copy-safe-width": `min(${placement.maxWidth.cap}px, ${placement.maxWidth.viewportPercent}vw, calc(100vw - ${viewportGutter}px))`,
    bottom: placement.bottom,
    left: placement.left,
    right: placement.right,
    textAlign: placement.textAlign,
    top: placement.top,
    transform:
      placement.translateX === "-50%" ? "translateX(-50%)" : undefined,
  };
}

function jumpWindowTo(top: number) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo(0, top);
  root.style.scrollBehavior = previousScrollBehavior;
}

function isKeyboardEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(
    target.closest(
      "a, button, input, textarea, select, summary, [contenteditable='true']",
    ),
  );
}

function WordRevealText({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  return (
    <span className={className}>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true">
        {children.split(/(\s+)/).map((token, index) =>
          /\s+/.test(token) ? (
            token
          ) : (
            <span
              className="scroll-story-word"
              data-scroll-story-word
              key={`${token}-${index}`}
            >
              {token}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

function StoryHeading({
  children,
  isPrimary,
}: {
  children: string;
  isPrimary: boolean;
}) {
  const content: ReactNode = (
    <WordRevealText className="scroll-story-copy-title">
      {children}
    </WordRevealText>
  );

  return isPrimary ? (
    <h1 data-scroll-story-title>{content}</h1>
  ) : (
    <h2 data-scroll-story-title>{content}</h2>
  );
}

export function ScrollStoryHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const forwardVideoRef = useRef<HTMLVideoElement>(null);
  const reverseVideoRef = useRef<HTMLVideoElement>(null);
  const frameCacheRef = useRef(new Map<string, CachedFrame>());
  const frameLoadQueueRef = useRef<QueuedFrame[]>([]);
  const activeImageLoadsRef = useRef(0);
  const imageLoadClockRef = useRef(0);
  const pumpImageQueueRef = useRef<() => void>(() => undefined);
  const paintRequestRef = useRef(0);
  const canvasSizeRef = useRef({ height: 0, width: 0 });
  const lastSideGapRef = useRef(-1);
  const sequenceRef = useRef<FrameSequence>(DESKTOP_SEQUENCE);
  const currentFrameRef = useRef(DESKTOP_SEQUENCE.firstFrame);
  const currentDirectionRef = useRef(1);
  const activeIndexRef = useRef(0);
  const frameAnimationRef = useRef<number | null>(null);
  const frameAnimationResolveRef = useRef<(() => void) | null>(null);
  const videoPlaybackIdRef = useRef(0);
  const scrollAnimationRef = useRef<number | null>(null);
  const scrollAnimationTimeoutRef = useRef<number | null>(null);
  const scrollAnimationResolveRef = useRef<(() => void) | null>(null);
  const isAnimatingRef = useRef(false);
  const inputLockUntilRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const wheelGestureLockedRef = useRef(false);
  const wheelGestureTimeoutRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const introCompleteRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const wordTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [sequenceKey, setSequenceKey] = useState<SequenceKey>("desktop");

  const prefersReducedMotion = usePrefersReducedMotion();
  const smoothScrollRef = useSmoothScroll();
  const sequence =
    sequenceKey === "mobile" ? MOBILE_SEQUENCE : DESKTOP_SEQUENCE;
  const releaseSmoothScroll = useCallback(() => {
    smoothScrollRef?.current?.start();
  }, [smoothScrollRef]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    introCompleteRef.current = isIntroComplete;
  }, [isIntroComplete]);

  useEffect(() => {
    prefersReducedMotionRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  const trimFrameCache = useCallback(
    (activeSequence: FrameSequence, protectedFrame: number) => {
      const cache = frameCacheRef.current;
      const protectedKeys = new Set([
        frameCacheKey(activeSequence, protectedFrame),
        ...activeSequence.stopFrames.map((frame) =>
          frameCacheKey(activeSequence, frame),
        ),
      ]);
      const removable = [...cache.entries()]
        .filter(
          ([key, entry]) =>
            !protectedKeys.has(key) &&
            !entry.promise &&
            (entry.image || entry.failed),
        )
        .sort(([, first], [, second]) => first.touched - second.touched);

      while (
        cache.size > activeSequence.cacheLimit &&
        removable.length > 0
      ) {
        const [key] = removable.shift()!;
        cache.delete(key);
      }
    },
    [],
  );

  const pumpImageQueue = useCallback(() => {
    while (
      activeImageLoadsRef.current < MAX_ACTIVE_IMAGE_LOADS &&
      frameLoadQueueRef.current.length > 0
    ) {
      const job = frameLoadQueueRef.current.shift()!;
      activeImageLoadsRef.current += 1;
      const image = new Image();

      image.decoding = "async";
      (
        image as HTMLImageElement & { fetchPriority?: "high" | "low" }
      ).fetchPriority = job.priority ? "high" : "low";

      const finish = (loadedImage: HTMLImageElement | null) => {
        const cachedEntry = frameCacheRef.current.get(job.key);
        if (cachedEntry === job.entry) {
          job.entry.promise = undefined;
          job.entry.touched = ++imageLoadClockRef.current;

          if (loadedImage) {
            job.entry.image = loadedImage;
          } else {
            job.entry.failed = true;
          }
        }

        activeImageLoadsRef.current -= 1;
        job.resolve(loadedImage);
        trimFrameCache(job.sequence, currentFrameRef.current);
        pumpImageQueueRef.current();
      };

      image.onload = () => {
        void image
          .decode()
          .catch(() => undefined)
          .then(() => finish(image));
      };
      image.onerror = () => finish(null);
      image.src = framePath(job.sequence, job.frame);
    }
  }, [trimFrameCache]);

  useEffect(() => {
    pumpImageQueueRef.current = pumpImageQueue;
    pumpImageQueue();

    return () => {
      pumpImageQueueRef.current = () => undefined;
    };
  }, [pumpImageQueue]);

  const loadFrameImage = useCallback(
    (activeSequence: FrameSequence, frame: number, priority = false) => {
      const key = frameCacheKey(activeSequence, frame);
      const cached = frameCacheRef.current.get(key);

      if (cached?.image) {
        cached.touched = ++imageLoadClockRef.current;
        return Promise.resolve(cached.image);
      }

      if (cached?.failed) {
        return Promise.resolve(null);
      }

      if (cached?.promise) {
        if (priority) {
          const queuedIndex = frameLoadQueueRef.current.findIndex(
            (job) => job.key === key,
          );
          if (queuedIndex >= 0) {
            const [queuedJob] = frameLoadQueueRef.current.splice(
              queuedIndex,
              1,
            );
            queuedJob.priority = true;
            frameLoadQueueRef.current.unshift(queuedJob);
          }
        }

        return cached.promise;
      }

      if (
        !priority &&
        frameLoadQueueRef.current.length >= MAX_QUEUED_IMAGE_LOADS
      ) {
        return Promise.resolve(null);
      }

      if (
        priority &&
        frameLoadQueueRef.current.length >= MAX_QUEUED_IMAGE_LOADS
      ) {
        const removableIndex = frameLoadQueueRef.current.findLastIndex(
          (job) => !job.sequence.stopFrames.includes(job.frame),
        );

        if (removableIndex >= 0) {
          const [removed] = frameLoadQueueRef.current.splice(
            removableIndex,
            1,
          );
          frameCacheRef.current.delete(removed.key);
          removed.resolve(null);
        }
      }

      const entry: CachedFrame = {
        touched: ++imageLoadClockRef.current,
      };
      let resolvePromise:
        | ((image: HTMLImageElement | null) => void)
        | undefined;
      const promise = new Promise<HTMLImageElement | null>((resolve) => {
        resolvePromise = resolve;
      });

      entry.promise = promise;
      frameCacheRef.current.set(key, entry);

      const job: QueuedFrame = {
        entry,
        frame,
        key,
        priority,
        resolve: resolvePromise!,
        sequence: activeSequence,
      };

      if (priority) {
        frameLoadQueueRef.current.unshift(job);
      } else {
        frameLoadQueueRef.current.push(job);
      }

      pumpImageQueueRef.current();
      return promise;
    },
    [],
  );

  const paintImage = useCallback(
    (
      image: HTMLImageElement,
      activeSequence: FrameSequence,
      frame: number,
    ) => {
      const canvas = canvasRef.current;
      const section = sectionRef.current;
      const { height, width } = canvasSizeRef.current;

      if (!canvas || !section || width === 0 || height === 0) {
        return;
      }

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) {
        return;
      }

      // Fit by height: every frame's full height fills the viewport height
      // (the primary framing requirement). On viewports wider than the frame
      // this leaves the sides short of the screen edges — the resulting gap
      // is exposed via `--frame-side-gap` and blended away by the edge-fade
      // overlay. On narrower viewports the sides overflow and are clipped.
      const scale = height / image.naturalHeight;
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = height;
      const drawX = (width - drawWidth) / 2;
      const drawY = 0;

      const sideGap = Math.max(0, Math.round(drawX));
      if (sideGap !== lastSideGapRef.current) {
        lastSideGapRef.current = sideGap;
        section.style.setProperty("--frame-side-gap", `${sideGap}px`);
      }

      context.setTransform(
        canvas.width / width,
        0,
        0,
        canvas.height / height,
        0,
        0,
      );
      context.fillStyle = "#02030a";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);

      canvas.dataset.frame = String(frame);
      canvas.dataset.ready = "true";
      canvas.dataset.sequence = activeSequence.key;
      section.dataset.scrollStoryFrame = String(frame);
    },
    [],
  );

  const primeFrameWindow = useCallback(
    (
      activeSequence: FrameSequence,
      frame: number,
      direction: number,
    ) => {
      const forwardDirection = direction < 0 ? -1 : 1;

      for (
        let offset = 1;
        offset <= activeSequence.preloadAhead;
        offset += 1
      ) {
        const requested = frame + offset * forwardDirection;
        if (
          requested < activeSequence.firstFrame ||
          requested > activeSequence.lastFrame
        ) {
          break;
        }

        const available = resolveAvailableFrame(
          activeSequence,
          requested,
          direction,
        );
        void loadFrameImage(activeSequence, available);
      }

      for (
        let offset = 1;
        offset <= activeSequence.preloadBehind;
        offset += 1
      ) {
        const requested = frame - offset * forwardDirection;
        if (
          requested < activeSequence.firstFrame ||
          requested > activeSequence.lastFrame
        ) {
          break;
        }

        const available = resolveAvailableFrame(
          activeSequence,
          requested,
          -direction,
        );
        void loadFrameImage(activeSequence, available);
      }
    },
    [loadFrameImage],
  );

  const drawFrame = useCallback(
    (
      requestedFrame: number,
      activeSequence: FrameSequence,
      direction: number,
    ) => {
      const availableFrame = resolveAvailableFrame(
        activeSequence,
        requestedFrame,
        direction,
      );
      const requestId = ++paintRequestRef.current;

      currentFrameRef.current = availableFrame;
      currentDirectionRef.current = direction;
      primeFrameWindow(activeSequence, availableFrame, direction);

      const key = frameCacheKey(activeSequence, availableFrame);
      const cached = frameCacheRef.current.get(key);
      if (cached?.image) {
        cached.touched = ++imageLoadClockRef.current;
        paintImage(cached.image, activeSequence, availableFrame);
      } else {
        void loadFrameImage(activeSequence, availableFrame, true).then(
          (image) => {
            if (
              image &&
              paintRequestRef.current === requestId &&
              sequenceRef.current.key === activeSequence.key
            ) {
              paintImage(image, activeSequence, availableFrame);
            }
          },
        );
      }

      trimFrameCache(activeSequence, availableFrame);
    },
    [loadFrameImage, paintImage, primeFrameWindow, trimFrameCache],
  );

  const drawFrameAndWait = useCallback(
    async (
      requestedFrame: number,
      activeSequence: FrameSequence,
      direction: number,
    ) => {
      const availableFrame = resolveAvailableFrame(
        activeSequence,
        requestedFrame,
        direction,
      );
      const requestId = ++paintRequestRef.current;

      currentFrameRef.current = availableFrame;
      currentDirectionRef.current = direction;
      primeFrameWindow(activeSequence, availableFrame, direction);

      const image = await loadFrameImage(
        activeSequence,
        availableFrame,
        true,
      );
      if (
        !image ||
        paintRequestRef.current !== requestId ||
        sequenceRef.current.key !== activeSequence.key
      ) {
        return false;
      }

      paintImage(image, activeSequence, availableFrame);
      trimFrameCache(activeSequence, availableFrame);
      return true;
    },
    [loadFrameImage, paintImage, primeFrameWindow, trimFrameCache],
  );

  const primeTransitionRange = useCallback(
    (
      activeSequence: FrameSequence,
      from: number,
      to: number,
      sampleCount: number,
    ) => {
      const direction = to < from ? -1 : 1;
      const count = Math.max(2, Math.min(sampleCount, Math.abs(to - from) + 1));

      for (let index = 0; index < count; index += 1) {
        const progress = index / (count - 1);
        const frame = resolveAvailableFrame(
          activeSequence,
          from + (to - from) * progress,
          direction,
        );
        void loadFrameImage(
          activeSequence,
          frame,
          index === 0 || index === count - 1,
        );
      }
    },
    [loadFrameImage],
  );

  const waitForVideo = useCallback((video: HTMLVideoElement) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      return Promise.resolve(true);
    }

    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      video.load();
    }

    return new Promise<boolean>((resolve) => {
      let settled = false;
      const settle = (ready: boolean) => {
        if (settled) {
          return;
        }

        settled = true;
        window.clearTimeout(timeoutId);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
        resolve(ready);
      };
      const handleCanPlay = () => settle(true);
      const handleError = () => settle(false);
      const timeoutId = window.setTimeout(
        () => settle(false),
        VIDEO_READY_TIMEOUT_MS,
      );

      video.addEventListener("canplay", handleCanPlay, { once: true });
      video.addEventListener("error", handleError, { once: true });
    });
  }, []);

  const seekVideo = useCallback(
    (
      video: HTMLVideoElement,
      time: number,
      frameDuration: number,
    ) => {
      if (Math.abs(video.currentTime - time) < frameDuration / 2) {
        return Promise.resolve(true);
      }

      return new Promise<boolean>((resolve) => {
        let settled = false;
        const settle = (ready: boolean) => {
          if (settled) {
            return;
          }

          settled = true;
          window.clearTimeout(timeoutId);
          video.removeEventListener("seeked", handleSeeked);
          video.removeEventListener("error", handleError);
          resolve(ready);
        };
        const handleSeeked = () => settle(true);
        const handleError = () => settle(false);
        const timeoutId = window.setTimeout(
          () => settle(false),
          VIDEO_SEEK_TIMEOUT_MS,
        );

        video.addEventListener("seeked", handleSeeked, { once: true });
        video.addEventListener("error", handleError, { once: true });
        video.currentTime = time;
      });
    },
    [],
  );

  const cancelFrameAnimation = useCallback(() => {
    videoPlaybackIdRef.current += 1;

    if (frameAnimationRef.current !== null) {
      cancelAnimationFrame(frameAnimationRef.current);
      frameAnimationRef.current = null;
    }

    [forwardVideoRef.current, reverseVideoRef.current].forEach((video) => {
      if (!video) {
        return;
      }

      video.pause();
      video.dataset.active = "false";
      video.style.opacity = "0";
    });

    const resolveAnimation = frameAnimationResolveRef.current;
    frameAnimationResolveRef.current = null;
    resolveAnimation?.();
  }, []);

  const playCanvasToFrame = useCallback(
    (targetFrame: number, duration: number, sampleCount: number) => {
      cancelFrameAnimation();

      const activeSequence = sequenceRef.current;
      const startFrame = currentFrameRef.current;
      const safeTarget = clamp(
        Math.round(targetFrame),
        activeSequence.firstFrame,
        activeSequence.lastFrame,
      );
      const direction = safeTarget < startFrame ? -1 : 1;
      const count = Math.max(
        2,
        Math.min(sampleCount, Math.abs(safeTarget - startFrame) + 1),
      );

      primeTransitionRange(
        activeSequence,
        startFrame,
        safeTarget,
        count,
      );

      return new Promise<void>((resolve) => {
        frameAnimationResolveRef.current = resolve;

        const complete = () => {
          drawFrame(safeTarget, activeSequence, direction);
          frameAnimationRef.current = null;
          frameAnimationResolveRef.current = null;
          resolve();
        };

        if (
          prefersReducedMotionRef.current ||
          duration <= 0 ||
          startFrame === safeTarget
        ) {
          complete();
          return;
        }

        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = clamp((now - startedAt) / duration, 0, 1);
          const easedProgress = easeOutCubic(progress);
          const sampleIndex = Math.round(easedProgress * (count - 1));
          const sampledProgress = sampleIndex / (count - 1);
          const frame =
            startFrame + (safeTarget - startFrame) * sampledProgress;

          drawFrame(frame, activeSequence, direction);

          if (progress < 1) {
            frameAnimationRef.current = requestAnimationFrame(tick);
            return;
          }

          complete();
        };

        frameAnimationRef.current = requestAnimationFrame(tick);
      });
    },
    [cancelFrameAnimation, drawFrame, primeTransitionRange],
  );

  const playVideoToFrame = useCallback(
    async (
      fromFrame: number,
      toFrame: number,
      duration: number,
      activeSequence: FrameSequence,
      playbackId: number,
    ) => {
      const isForward = toFrame > fromFrame;
      const video = isForward
        ? forwardVideoRef.current
        : reverseVideoRef.current;

      if (!video || !(await waitForVideo(video))) {
        return false;
      }

      if (videoPlaybackIdRef.current !== playbackId) {
        return false;
      }

      const frameToTime = (frame: number) =>
        isForward
          ? (frame - activeSequence.firstFrame) / activeSequence.videoFps
          : (activeSequence.lastFrame - frame) / activeSequence.videoFps;
      const startTime = frameToTime(fromFrame);
      const targetTime = frameToTime(toFrame);
      const frameDuration = 1 / activeSequence.videoFps;
      const mediaDuration = Math.max(
        frameDuration,
        targetTime - startTime,
      );

      video.pause();
      video.playbackRate = clamp(
        mediaDuration / Math.max(0.1, duration / 1_000),
        0.25,
        4,
      );

      if (!(await seekVideo(video, startTime, frameDuration))) {
        return false;
      }

      if (videoPlaybackIdRef.current !== playbackId) {
        return false;
      }

      const extendedVideo = video as HTMLVideoElement & {
        webkitDecodedFrameCount?: number;
        webkitDroppedFrameCount?: number;
      };
      const readPlaybackQuality = () => {
        if (typeof video.getVideoPlaybackQuality === "function") {
          const quality = video.getVideoPlaybackQuality();
          return {
            dropped: quality.droppedVideoFrames,
            presented: quality.totalVideoFrames,
          };
        }

        return {
          dropped: extendedVideo.webkitDroppedFrameCount ?? 0,
          presented: extendedVideo.webkitDecodedFrameCount ?? 0,
        };
      };
      const qualityBefore = readPlaybackQuality();

      video.dataset.active = "true";
      video.style.opacity = "1";
      sectionRef.current?.setAttribute(
        "data-scroll-story-renderer",
        "video",
      );

      try {
        await video.play();
      } catch {
        video.dataset.active = "false";
        video.style.opacity = "0";
        return false;
      }

      const playbackStartedAt = performance.now();

      return new Promise<boolean>((resolve) => {
        let finished = false;
        let finishing = false;
        let timeoutId = 0;
        let videoFrameCallbackId: number | null = null;
        let videoFrameCallbackCount = 0;

        const countPresentedFrame: VideoFrameRequestCallback = () => {
          videoFrameCallbackCount += 1;
          videoFrameCallbackId =
            video.requestVideoFrameCallback(countPresentedFrame);
        };

        if (typeof video.requestVideoFrameCallback === "function") {
          videoFrameCallbackId =
            video.requestVideoFrameCallback(countPresentedFrame);
        }

        const cleanup = () => {
          window.clearTimeout(timeoutId);
          if (frameAnimationRef.current !== null) {
            cancelAnimationFrame(frameAnimationRef.current);
            frameAnimationRef.current = null;
          }
          if (
            videoFrameCallbackId !== null &&
            typeof video.cancelVideoFrameCallback === "function"
          ) {
            video.cancelVideoFrameCallback(videoFrameCallbackId);
          }
        };

        function settle(played: boolean) {
          if (finished) {
            return;
          }

          finished = true;
          cleanup();
          if (frameAnimationResolveRef.current === cancelPlayback) {
            frameAnimationResolveRef.current = null;
          }
          resolve(played);
        }

        function cancelPlayback() {
          settle(false);
        }

        const finish = async () => {
          if (finished || finishing) {
            return;
          }

          finishing = true;
          cleanup();
          video.pause();
          const playbackDuration = performance.now() - playbackStartedAt;

          const direction = isForward ? 1 : -1;
          const paintedTarget = await drawFrameAndWait(
            toFrame,
            activeSequence,
            direction,
          );

          if (
            finished ||
            videoPlaybackIdRef.current !== playbackId
          ) {
            return;
          }

          const qualityAfter = readPlaybackQuality();
          const decodedFrames = Math.max(
            0,
            qualityAfter.presented - qualityBefore.presented,
          );
          const droppedFrames = Math.max(
            0,
            qualityAfter.dropped - qualityBefore.dropped,
          );
          const section = sectionRef.current;
          const canvas = canvasRef.current;

          video.dataset.active = "false";
          video.style.opacity = "0";
          video.currentTime = targetTime;
          currentFrameRef.current = toFrame;

          if (canvas) {
            canvas.dataset.transitionRenderer = "video";
            canvas.dataset.videoCallbackFrames = String(
              videoFrameCallbackCount,
            );
            canvas.dataset.videoDecodedFrames = String(decodedFrames);
            canvas.dataset.videoDroppedFrames = String(droppedFrames);
            canvas.dataset.videoDurationMs = String(
              Math.round(playbackDuration),
            );
            canvas.dataset.videoPresentedFrames = String(
              Math.max(0, decodedFrames - droppedFrames),
            );
          }

          if (section) {
            section.dataset.scrollStoryRenderer = paintedTarget
              ? "canvas"
              : "video";
          }

          settle(true);
        };

        const tick = () => {
          const rawFrame = Math.round(
            isForward
              ? activeSequence.firstFrame +
                  video.currentTime * activeSequence.videoFps
              : activeSequence.lastFrame -
                  video.currentTime * activeSequence.videoFps,
          );
          const nextFrame = clamp(
            rawFrame,
            Math.min(fromFrame, toFrame),
            Math.max(fromFrame, toFrame),
          );

          currentFrameRef.current = nextFrame;
          canvasRef.current?.setAttribute(
            "data-frame",
            String(nextFrame),
          );
          sectionRef.current?.setAttribute(
            "data-scroll-story-frame",
            String(nextFrame),
          );

          if (video.ended) {
            void finish();
            return;
          }

          frameAnimationRef.current = requestAnimationFrame(tick);
        };

        frameAnimationResolveRef.current = cancelPlayback;
        timeoutId = window.setTimeout(() => {
          void finish();
        }, duration);
        frameAnimationRef.current = requestAnimationFrame(tick);
      });
    },
    [drawFrameAndWait, seekVideo, waitForVideo],
  );

  const playToFrame = useCallback(
    async (
      targetFrame: number,
      duration: number,
      sampleCount: number,
    ) => {
      cancelFrameAnimation();

      const playbackId = videoPlaybackIdRef.current;
      const activeSequence = sequenceRef.current;
      const startFrame = currentFrameRef.current;
      const safeTarget = clamp(
        Math.round(targetFrame),
        activeSequence.firstFrame,
        activeSequence.lastFrame,
      );
      const direction = safeTarget < startFrame ? -1 : 1;

      if (
        prefersReducedMotionRef.current ||
        duration <= 0 ||
        startFrame === safeTarget
      ) {
        await drawFrameAndWait(
          safeTarget,
          activeSequence,
          direction,
        );
        return;
      }

      const playedVideo = await playVideoToFrame(
        startFrame,
        safeTarget,
        duration,
        activeSequence,
        playbackId,
      );

      if (
        playedVideo ||
        videoPlaybackIdRef.current !== playbackId
      ) {
        return;
      }

      sectionRef.current?.setAttribute(
        "data-scroll-story-renderer",
        "canvas-fallback",
      );
      await playCanvasToFrame(safeTarget, duration, sampleCount);
    },
    [
      cancelFrameAnimation,
      drawFrameAndWait,
      playCanvasToFrame,
      playVideoToFrame,
    ],
  );

  const cancelScrollAnimation = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }

    if (scrollAnimationTimeoutRef.current !== null) {
      window.clearTimeout(scrollAnimationTimeoutRef.current);
      scrollAnimationTimeoutRef.current = null;
    }

    scrollAnimationResolveRef.current?.();
    scrollAnimationResolveRef.current = null;
  }, []);

  const smoothScrollTo = useCallback(
    (targetY: number, duration: number) => {
      cancelScrollAnimation();

      return new Promise<void>((resolve) => {
        scrollAnimationResolveRef.current = resolve;

        const complete = () => {
          if (!scrollAnimationResolveRef.current) {
            return;
          }

          scrollAnimationResolveRef.current = null;
          if (scrollAnimationTimeoutRef.current !== null) {
            window.clearTimeout(scrollAnimationTimeoutRef.current);
            scrollAnimationTimeoutRef.current = null;
          }
          resolve();
        };

        const lenis = smoothScrollRef?.current;
        if (prefersReducedMotionRef.current || duration <= 0) {
          if (lenis) {
            lenis.scrollTo(targetY, {
              force: true,
              immediate: true,
              onComplete: complete,
            });
            scrollAnimationTimeoutRef.current = window.setTimeout(
              complete,
              50,
            );
          } else {
            jumpWindowTo(targetY);
            complete();
          }
          return;
        }

        if (lenis) {
          lenis.scrollTo(targetY, {
            duration: duration / 1000,
            easing: easeOutCubic,
            force: true,
            lock: true,
            onComplete: complete,
          });
          scrollAnimationTimeoutRef.current = window.setTimeout(
            complete,
            duration + 180,
          );
          return;
        }

        const startY = window.scrollY;
        const distance = targetY - startY;
        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = clamp((now - startedAt) / duration, 0, 1);

          jumpWindowTo(startY + distance * easeOutCubic(progress));

          if (progress < 1) {
            scrollAnimationRef.current = requestAnimationFrame(tick);
            return;
          }

          jumpWindowTo(targetY);
          scrollAnimationRef.current = null;
          complete();
        };

        scrollAnimationRef.current = requestAnimationFrame(tick);
      });
    },
    [cancelScrollAnimation, smoothScrollRef],
  );

  useEffect(() => {
    if (!prefersReducedMotion) {
      return;
    }

    cancelFrameAnimation();
    cancelScrollAnimation();
    isAnimatingRef.current = false;
    inputLockUntilRef.current = 0;

    const activeSequence = sequenceRef.current;
    const stableFrame =
      activeSequence.stopFrames[activeIndexRef.current] ??
      activeSequence.stopFrames[0];

    currentFrameRef.current = stableFrame;
    drawFrame(
      stableFrame,
      activeSequence,
      currentDirectionRef.current,
    );

    if (!introCompleteRef.current) {
      introCompleteRef.current = true;
      setIsIntroComplete(true);
    }
  }, [
    cancelFrameAnimation,
    cancelScrollAnimation,
    drawFrame,
    prefersReducedMotion,
  ]);

  const primeVideoSources = useCallback(async () => {
    const videos = [
      forwardVideoRef.current,
      reverseVideoRef.current,
    ].filter((video): video is HTMLVideoElement => video !== null);

    if (videos.length !== 2) {
      return false;
    }

    const readyStates = await Promise.all(videos.map(waitForVideo));
    return readyStates.every(Boolean);
  }, [waitForVideo]);

  const primeAdjacentTransition = useCallback(
    (index: number, activeSequence = sequenceRef.current) => {
      const currentFrame =
        activeSequence.stopFrames[index] ?? activeSequence.stopFrames[0];
      const nextFrame = activeSequence.stopFrames[index + 1];

      void primeVideoSources();
      void loadFrameImage(activeSequence, currentFrame, true);
      if (typeof nextFrame === "number") {
        void loadFrameImage(activeSequence, nextFrame);
      }
    },
    [loadFrameImage, primeVideoSources],
  );

  const navigateToIndex = useCallback(
    (targetIndex: number) => {
      if (!introCompleteRef.current || isAnimatingRef.current) {
        return;
      }

      const nextIndex = clamp(
        Math.round(targetIndex),
        0,
        LAST_STORY_INDEX,
      );
      const currentIndex = activeIndexRef.current;

      if (nextIndex === currentIndex) {
        return;
      }

      const activeSequence = sequenceRef.current;
      const targetFrame =
        activeSequence.stopFrames[nextIndex] ??
        activeSequence.stopFrames[0];
      const section = sectionRef.current;
      const sectionTop = section
        ? section.getBoundingClientRect().top + window.scrollY
        : 0;
      const targetY = sectionTop + nextIndex * window.innerHeight;
      const duration = prefersReducedMotionRef.current
        ? 0
        : TRANSITION_DURATION_MS;

      isAnimatingRef.current = true;
      inputLockUntilRef.current =
        performance.now() + duration + INPUT_COOLDOWN_MS;
      wheelAccumRef.current = 0;
      activeIndexRef.current = nextIndex;

      window.dispatchEvent(
        new CustomEvent("scroll-story-transition-start", {
          detail: { from: currentIndex, to: nextIndex },
        }),
      );

      void Promise.all([
        playToFrame(
          targetFrame,
          duration,
          TRANSITION_SAMPLE_COUNT,
        ),
        smoothScrollTo(targetY, duration),
      ]).finally(() => {
        isAnimatingRef.current = false;
        setActiveIndex(nextIndex);
        primeAdjacentTransition(nextIndex, activeSequence);
        window.dispatchEvent(
          new CustomEvent("scroll-story-transition-end", {
            detail: { activeIndex: nextIndex },
          }),
        );
      });
    },
    [playToFrame, primeAdjacentTransition, smoothScrollTo],
  );

  const shouldTrapInput = useCallback((direction: number) => {
    const section = sectionRef.current;

    if (!section || direction === 0) {
      return false;
    }

    const rect = section.getBoundingClientRect();
    const isPinnedRange =
      rect.top <= 2 && rect.bottom >= window.innerHeight - 2;

    if (!isPinnedRange) {
      return false;
    }

    if (!introCompleteRef.current) {
      return direction > 0;
    }

    if (
      wheelGestureLockedRef.current ||
      isAnimatingRef.current ||
      performance.now() < inputLockUntilRef.current
    ) {
      return true;
    }

    const currentIndex = activeIndexRef.current;
    if (direction > 0 && currentIndex >= LAST_STORY_INDEX) {
      return false;
    }

    if (direction < 0 && currentIndex <= 0) {
      return false;
    }

    return true;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_SEQUENCE_QUERY);
    const updateSequence = () => {
      setSequenceKey(mediaQuery.matches ? "mobile" : "desktop");
    };

    updateSequence();
    mediaQuery.addEventListener("change", updateSequence);

    return () => {
      mediaQuery.removeEventListener("change", updateSequence);
    };
  }, []);

  useEffect(() => {
    sequenceRef.current = sequence;
    paintRequestRef.current += 1;
    frameLoadQueueRef.current.splice(0).forEach((job) => {
      frameCacheRef.current.delete(job.key);
      job.resolve(null);
    });
    frameCacheRef.current.clear();
    cancelFrameAnimation();
    cancelScrollAnimation();

    let resizeFrame = 0;
    let active = true;
    const resizeCanvas = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (!canvas || !active) {
          return;
        }

        const bounds = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.round(bounds.width));
        const height = Math.max(1, Math.round(bounds.height));
        const dpr = Math.min(window.devicePixelRatio || 1, sequence.dprCap);

        canvasSizeRef.current = { height, width };
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        const stableFrame = introCompleteRef.current
          ? sequence.stopFrames[activeIndexRef.current]
          : currentFrameRef.current;
        drawFrame(
          stableFrame ?? sequence.firstFrame,
          sequence,
          currentDirectionRef.current,
        );
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    void document.fonts.ready.then(() => {
      if (active) {
        resizeCanvas();
      }
    });

    return () => {
      active = false;
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [
    cancelFrameAnimation,
    cancelScrollAnimation,
    drawFrame,
    sequence,
  ]);

  useEffect(() => {
    let active = true;
    let introTimeout: number | null = null;
    let reducedMotionFrame: number | null = null;

    sequenceRef.current = sequence;
    if (introCompleteRef.current) {
      const activeFrame =
        sequence.stopFrames[activeIndexRef.current] ??
        sequence.stopFrames[0];
      currentFrameRef.current = activeFrame;
      drawFrame(activeFrame, sequence, currentDirectionRef.current);
      primeAdjacentTransition(activeIndexRef.current, sequence);
      return;
    }

    const introTarget = sequence.stopFrames[0];
    currentFrameRef.current = sequence.firstFrame;
    drawFrame(sequence.firstFrame, sequence, 1);
    void loadFrameImage(sequence, introTarget);
    void primeVideoSources();

    if (prefersReducedMotion) {
      currentFrameRef.current = introTarget;
      drawFrame(introTarget, sequence, 1);
      introCompleteRef.current = true;
      primeAdjacentTransition(0, sequence);
      reducedMotionFrame = requestAnimationFrame(() => {
        if (active) {
          setIsIntroComplete(true);
        }
      });

      return () => {
        active = false;
        if (reducedMotionFrame !== null) {
          cancelAnimationFrame(reducedMotionFrame);
        }
      };
    }

    introTimeout = window.setTimeout(() => {
      void playToFrame(
        introTarget,
        INTRO_DURATION_MS,
        INTRO_SAMPLE_COUNT,
      ).then(() => {
        if (!active) {
          return;
        }

        introCompleteRef.current = true;
        setIsIntroComplete(true);
        primeAdjacentTransition(0, sequence);
      });
    }, 120);

    return () => {
      active = false;
      if (introTimeout !== null) {
        window.clearTimeout(introTimeout);
      }
      if (reducedMotionFrame !== null) {
        cancelAnimationFrame(reducedMotionFrame);
      }
    };
  }, [
    drawFrame,
    loadFrameImage,
    playToFrame,
    prefersReducedMotion,
    primeAdjacentTransition,
    primeVideoSources,
    sequence,
  ]);

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateFromScroll = () => {
      animationFrame = null;

      const section = sectionRef.current;
      if (
        !section ||
        !introCompleteRef.current ||
        isAnimatingRef.current
      ) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const isStoryRange =
        rect.top <= window.innerHeight &&
        rect.bottom >= 0;

      if (!isStoryRange) {
        return;
      }

      const sectionTop = rect.top + window.scrollY;
      const rawIndex = (window.scrollY - sectionTop) / window.innerHeight;
      const nearestIndex = clamp(
        Math.round(rawIndex),
        0,
        LAST_STORY_INDEX,
      );

      if (nearestIndex === activeIndexRef.current) {
        return;
      }

      const activeSequence = sequenceRef.current;
      const targetFrame =
        activeSequence.stopFrames[nearestIndex] ??
        activeSequence.stopFrames[0];
      const direction =
        nearestIndex < activeIndexRef.current ? -1 : 1;

      activeIndexRef.current = nearestIndex;
      currentFrameRef.current = targetFrame;
      setActiveIndex(nearestIndex);
      drawFrame(
        targetFrame,
        activeSequence,
        direction,
      );
      primeAdjacentTransition(nearestIndex, activeSequence);
    };

    const scheduleUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = requestAnimationFrame(updateFromScroll);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [drawFrame, primeAdjacentTransition]);

  useEffect(() => {
    const clearWheelGesture = () => {
      if (wheelGestureTimeoutRef.current !== null) {
        window.clearTimeout(wheelGestureTimeoutRef.current);
        wheelGestureTimeoutRef.current = null;
      }

      wheelGestureLockedRef.current = false;
      wheelAccumRef.current = 0;
    };
    const refreshWheelGestureTimeout = () => {
      if (wheelGestureTimeoutRef.current !== null) {
        window.clearTimeout(wheelGestureTimeoutRef.current);
      }

      wheelGestureTimeoutRef.current = window.setTimeout(
        clearWheelGesture,
        WHEEL_GESTURE_QUIET_MS,
      );
    };

    const handleWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY);
      if (direction === 0) {
        return;
      }

      refreshWheelGestureTimeout();

      if (!shouldTrapInput(direction)) {
        releaseSmoothScroll();
        clearWheelGesture();
        return;
      }

      event.preventDefault();

      if (!introCompleteRef.current) {
        wheelGestureLockedRef.current = true;
        return;
      }

      if (
        isAnimatingRef.current ||
        performance.now() < inputLockUntilRef.current
      ) {
        wheelGestureLockedRef.current = true;
        return;
      }

      if (wheelGestureLockedRef.current) {
        return;
      }

      const lenis = smoothScrollRef?.current;
      lenis?.stop();
      lenis?.scrollTo(window.scrollY, {
        force: true,
        immediate: true,
      });

      if (Math.sign(wheelAccumRef.current) !== direction) {
        wheelAccumRef.current = 0;
      }

      wheelAccumRef.current += event.deltaY;
      if (Math.abs(wheelAccumRef.current) < WHEEL_THRESHOLD) {
        return;
      }

      wheelGestureLockedRef.current = true;
      wheelAccumRef.current = 0;
      navigateToIndex(activeIndexRef.current + direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchStartYRef.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY;
      if (typeof currentY !== "number") {
        return;
      }

      const delta = touchStartYRef.current - currentY;
      if (
        Math.abs(delta) > 8 &&
        shouldTrapInput(Math.sign(delta))
      ) {
        event.preventDefault();
        if (isAnimatingRef.current) {
          return;
        }

        const lenis = smoothScrollRef?.current;
        lenis?.stop();
        lenis?.scrollTo(window.scrollY, {
          force: true,
          immediate: true,
        });
      } else if (Math.abs(delta) > 8) {
        releaseSmoothScroll();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchStartY = touchStartYRef.current;
      touchStartYRef.current = null;

      if (
        touchStartY === null ||
        !introCompleteRef.current ||
        isAnimatingRef.current ||
        performance.now() < inputLockUntilRef.current
      ) {
        return;
      }

      const endY = event.changedTouches[0]?.clientY;
      if (typeof endY !== "number") {
        return;
      }

      const delta = touchStartY - endY;
      const direction = Math.sign(delta);

      if (
        Math.abs(delta) < TOUCH_THRESHOLD ||
        !shouldTrapInput(direction)
      ) {
        return;
      }

      navigateToIndex(activeIndexRef.current + direction);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyboardEditableTarget(event.target)) {
        return;
      }

      const downKeys = new Set(["ArrowDown", "PageDown", " "]);
      const upKeys = new Set(["ArrowUp", "PageUp"]);
      const direction = downKeys.has(event.key)
        ? 1
        : upKeys.has(event.key)
          ? -1
          : 0;

      if (!shouldTrapInput(direction)) {
        releaseSmoothScroll();
        return;
      }

      event.preventDefault();

      if (
        !introCompleteRef.current ||
        isAnimatingRef.current ||
        performance.now() < inputLockUntilRef.current
      ) {
        return;
      }

      smoothScrollRef?.current?.stop();
      navigateToIndex(activeIndexRef.current + direction);
    };

    window.addEventListener("wheel", handleWheel, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchstart", handleTouchStart, {
      capture: true,
      passive: true,
    });
    window.addEventListener("touchmove", handleTouchMove, {
      capture: true,
      passive: false,
    });
    window.addEventListener("touchend", handleTouchEnd, {
      capture: true,
      passive: true,
    });
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      clearWheelGesture();
      releaseSmoothScroll();
      window.removeEventListener("wheel", handleWheel, true);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchMove, true);
      window.removeEventListener("touchend", handleTouchEnd, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [
    navigateToIndex,
    releaseSmoothScroll,
    shouldTrapInput,
    smoothScrollRef,
  ]);

  useEffect(() => {
    return () => {
      cancelFrameAnimation();
      cancelScrollAnimation();
    };
  }, [cancelFrameAnimation, cancelScrollAnimation]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const allPanels = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-story-copy]",
        section,
      );
      const allWords = allPanels.flatMap((panel) =>
        gsap.utils.toArray<HTMLElement>(
          "[data-scroll-story-word]",
          panel,
        ),
      );

      wordTimelineRef.current?.kill();
      gsap.killTweensOf([...allPanels, ...allWords]);
      gsap.set(allPanels, { autoAlpha: 0 });

      if (!isIntroComplete) {
        return;
      }

      const activeChapter = section.querySelector<HTMLElement>(
        `[data-scroll-story-chapter-index="${activeIndex}"]`,
      );
      if (!activeChapter) {
        return;
      }

      const activePanels = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-story-copy]",
        activeChapter,
      );

      if (prefersReducedMotion) {
        gsap.set(activePanels, { autoAlpha: 1 });
        activePanels.forEach((panel) => {
          gsap.set(
            gsap.utils.toArray<HTMLElement>(
              "[data-scroll-story-word]",
              panel,
            ),
            {
              clearProps: "filter,transform",
              opacity: 1,
            },
          );
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
      });

      // Anthropic-style reveal: words fade up (blur + rise) in a *random*
      // order rather than left-to-right, fast enough to overlap heavily. The
      // heading resolves first, its body follows a fraction of a beat later,
      // and a panel with `revealDelay` (the second block on a checkpoint)
      // starts its whole reveal slightly after the first.
      const revealFrom = {
        filter: "blur(6px)",
        opacity: 0,
        willChange: "transform, filter",
        y: "0.6em",
      };
      const revealTo = (count: number) => ({
        duration: 0.52,
        ease: "power2.out",
        filter: "blur(0px)",
        opacity: 1,
        stagger: {
          amount: clamp(count * 0.045, 0.16, 0.4),
          from: "random" as const,
        },
        y: 0,
      });

      const revealedWords: HTMLElement[] = [];

      activePanels.forEach((panel, panelIndex) => {
        const titleWords = gsap.utils.toArray<HTMLElement>(
          "[data-scroll-story-title] [data-scroll-story-word]",
          panel,
        );
        const bodyWords = gsap.utils.toArray<HTMLElement>(
          "[data-scroll-story-paragraph] [data-scroll-story-word]",
          panel,
        );
        const revealDelay =
          "revealDelay" in
          scrollStorySlides[activeIndex].panels[panelIndex]
            ? scrollStorySlides[activeIndex].panels[panelIndex]
                .revealDelay
            : 0;

        revealedWords.push(...titleWords, ...bodyWords);
        gsap.set([...titleWords, ...bodyWords], revealFrom);

        timeline.set(panel, { autoAlpha: 1 }, revealDelay);

        if (titleWords.length > 0) {
          timeline.to(titleWords, revealTo(titleWords.length), revealDelay);
        }

        if (bodyWords.length > 0) {
          timeline.to(
            bodyWords,
            revealTo(bodyWords.length),
            revealDelay + 0.12,
          );
        }
      });

      // Once revealed, drop the transform/filter/will-change so the resting
      // text leaves its GPU layer and renders with full sub-pixel hinting
      // (otherwise the rasterised texture can swallow the dot on "i").
      timeline.eventCallback("onComplete", () => {
        gsap.set(revealedWords, {
          clearProps: "filter,transform,translate,rotate,scale,willChange",
        });
      });

      wordTimelineRef.current = timeline;

      return () => {
        timeline.kill();
        gsap.killTweensOf([...allPanels, ...allWords]);
      };
    },
    {
      dependencies: [
        activeIndex,
        isIntroComplete,
        prefersReducedMotion,
      ],
      revertOnUpdate: true,
      scope: sectionRef,
    },
  );

  const selectedSlide =
    scrollStorySlides[activeIndex] ?? scrollStorySlides[0];

  return (
    <section
      aria-label="Enigma Digital scrollytelling hero"
      className="scroll-story-hero"
      data-scroll-story-chapter={selectedSlide.id}
      data-scroll-story-frame-group={selectedSlide.frameGroup}
      data-scroll-story-hero
      data-scroll-story-intro-complete={
        isIntroComplete ? "true" : "false"
      }
      data-scroll-story-reduced-motion={
        prefersReducedMotion ? "true" : "false"
      }
      data-scroll-story-sequence={sequence.key}
      data-scroll-story-stop={activeIndex}
      ref={sectionRef}
    >
      <div className="scroll-story-stage">
        <canvas
          aria-hidden="true"
          className="scroll-story-canvas"
          data-frame={sequence.firstFrame}
          data-ready="false"
          data-sequence={sequence.key}
          ref={canvasRef}
        />
        <video
          aria-hidden="true"
          className="scroll-story-video"
          data-active="false"
          data-direction="forward"
          disablePictureInPicture
          key={`${sequence.key}-forward`}
          muted
          playsInline
          preload="auto"
          ref={forwardVideoRef}
          src={sequence.forwardVideoPath}
        />
        <video
          aria-hidden="true"
          className="scroll-story-video"
          data-active="false"
          data-direction="reverse"
          disablePictureInPicture
          key={`${sequence.key}-reverse`}
          muted
          playsInline
          preload="auto"
          ref={reverseVideoRef}
          src={sequence.reverseVideoPath}
        />
        <div aria-hidden="true" className="scroll-story-vignette" />
        <div aria-hidden="true" className="scroll-story-edge-fade" />

        <div className="scroll-story-copy-layer">
          {scrollStorySlides.map((slide, slideIndex) => {
            const isActive = activeIndex === slideIndex;

            return (
              <div
                aria-hidden={!isActive}
                className="scroll-story-chapter"
                data-active={isActive ? "true" : "false"}
                data-scroll-story-chapter-index={slideIndex}
                key={slide.id}
              >
                {slide.panels.map((panel, panelIndex) => {
                  const placement =
                    panel.placement[sequence.key];

                  return (
                    <div
                      className="scroll-story-copy"
                      data-copy-scrim={
                        "scrim" in placement && placement.scrim
                          ? "true"
                          : "false"
                      }
                      data-scroll-story-copy
                      data-scroll-story-copy-id={panel.id}
                      key={panel.id}
                      style={copyPanelStyle(placement)}
                    >
                      <StoryHeading
                        isPrimary={
                          slideIndex === 0 && panelIndex === 0
                        }
                      >
                        {panel.title}
                      </StoryHeading>
                      <div className="scroll-story-copy-body">
                        {panel.paragraphs.map((paragraph) => (
                          <p
                            data-scroll-story-paragraph
                            key={paragraph}
                          >
                            <WordRevealText className="scroll-story-copy-paragraph">
                              {paragraph}
                            </WordRevealText>
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
