"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { HERO_SEQUENCE_CONFIG } from "@/constants/heroScrollytelling";

export type HeroFrameSequenceHandle = {
  drawFrame: (index: number) => void;
  getLoadedFrameCount: () => number;
};

type HeroFrameSequenceProps = {
  frameSources: string[];
  initialFrameIndex?: number;
  priorityFrameIndexes?: number[];
  reducedMotion?: boolean;
  className?: string;
};

type IdleDeadlineLike = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: (deadline: IdleDeadlineLike) => void,
    options?: { timeout?: number }
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const clampIndex = (index: number, frameCount: number) =>
  Math.min(Math.max(Math.round(index), 0), Math.max(frameCount - 1, 0));

function drawImageContain(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  dpr: number
) {
  const context = canvas.getContext("2d");
  if (!context || !image.naturalWidth || !image.naturalHeight) return;

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  const targetWidth = Math.round(width * dpr);
  const targetHeight = Math.round(height * dpr);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#02050d";
  context.fillRect(0, 0, width, height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  const canvasRatio = width / height;
  const imageRatio = image.naturalWidth / image.naturalHeight;
  let drawWidth = width;
  let drawHeight = height;
  let drawX = 0;
  let drawY = 0;

  if (imageRatio > canvasRatio) {
    drawWidth = width;
    drawHeight = width / imageRatio;
    drawY =
      height > width * 1.2
        ? Math.max(88, (height - drawHeight) * 0.24)
        : (height - drawHeight) / 2;
  } else {
    drawHeight = height;
    drawWidth = height * imageRatio;
    drawX = (width - drawWidth) / 2;
  }

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

const HeroFrameSequence = forwardRef<
  HeroFrameSequenceHandle,
  HeroFrameSequenceProps
>(function HeroFrameSequence(
  {
    frameSources,
    initialFrameIndex = 0,
    priorityFrameIndexes = [],
    reducedMotion = false,
    className,
  },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const loadingRef = useRef<Set<number>>(new Set());
  const loadedRef = useRef<Set<number>>(new Set());
  const requestedFrameRef = useRef(initialFrameIndex);
  const lastDrawnFrameRef = useRef(-1);
  const pendingDrawFrameRef = useRef(initialFrameIndex);
  const rafRef = useRef(0);
  const idleHandleRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const cancelledRef = useRef(false);

  const getDpr = useCallback(
    () =>
      Math.min(
        window.devicePixelRatio || 1,
        HERO_SEQUENCE_CONFIG.dprLimit
      ),
    []
  );

  const scheduleCanvasDraw = useCallback(
    (index: number) => {
      pendingDrawFrameRef.current = clampIndex(index, frameSources.length);
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;

        const canvas = canvasRef.current;
        const image = imagesRef.current[pendingDrawFrameRef.current];
        if (!canvas || !image || !loadedRef.current.has(pendingDrawFrameRef.current)) {
          return;
        }

        drawImageContain(canvas, image, getDpr());
        lastDrawnFrameRef.current = pendingDrawFrameRef.current;
      });
    },
    [frameSources.length, getDpr]
  );

  const loadFrame = useCallback(
    (index: number) => {
      const frameIndex = clampIndex(index, frameSources.length);
      const source = frameSources[frameIndex];

      if (
        !source ||
        imagesRef.current[frameIndex] ||
        loadingRef.current.has(frameIndex)
      ) {
        return;
      }

      loadingRef.current.add(frameIndex);

      const image = new Image();
      image.decoding = "async";
      image.fetchPriority =
        frameIndex <= HERO_SEQUENCE_CONFIG.initialPreloadCount ? "high" : "low";
      image.onload = () => {
        if (cancelledRef.current) return;
        loadingRef.current.delete(frameIndex);
        loadedRef.current.add(frameIndex);

        if (requestedFrameRef.current === frameIndex) {
          scheduleCanvasDraw(frameIndex);
        }
      };
      image.onerror = () => {
        loadingRef.current.delete(frameIndex);
      };
      image.src = source;
      imagesRef.current[frameIndex] = image;
    },
    [frameSources, scheduleCanvasDraw]
  );

  const preloadNearbyFrames = useCallback(
    (index: number) => {
      if (reducedMotion) return;

      const frameIndex = clampIndex(index, frameSources.length);
      const radius = HERO_SEQUENCE_CONFIG.nearbyFrameRadius;

      for (let offset = 0; offset <= radius; offset += 1) {
        loadFrame(frameIndex + offset);
        if (offset > 0) {
          loadFrame(frameIndex - offset);
        }
      }
    },
    [frameSources.length, loadFrame, reducedMotion]
  );

  const drawFrame = useCallback(
    (index: number) => {
      const frameIndex = clampIndex(index, frameSources.length);
      requestedFrameRef.current = frameIndex;
      preloadNearbyFrames(frameIndex);

      if (loadedRef.current.has(frameIndex)) {
        scheduleCanvasDraw(frameIndex);
        return;
      }

      loadFrame(frameIndex);
    },
    [frameSources.length, loadFrame, preloadNearbyFrames, scheduleCanvasDraw]
  );

  useImperativeHandle(
    ref,
    () => ({
      drawFrame,
      getLoadedFrameCount: () => loadedRef.current.size,
    }),
    [drawFrame]
  );

  useEffect(() => {
    cancelledRef.current = false;
    imagesRef.current = Array.from({ length: frameSources.length }, () => null);
    loadingRef.current = new Set();
    loadedRef.current = new Set();
    requestedFrameRef.current = initialFrameIndex;
    lastDrawnFrameRef.current = -1;
    pendingDrawFrameRef.current = initialFrameIndex;

    const firstFrameIndexes = Array.from(
      {
        length: Math.min(
          HERO_SEQUENCE_CONFIG.initialPreloadCount,
          frameSources.length
        ),
      },
      (_, index) => index
    );

    const immediateFrameIndexes = new Set([
      initialFrameIndex,
      ...firstFrameIndexes,
      ...priorityFrameIndexes,
    ]);

    immediateFrameIndexes.forEach((index) => loadFrame(index));
    drawFrame(initialFrameIndex);

    if (!reducedMotion) {
      let nextIdleIndex = 0;
      const idleWindow = window as WindowWithIdleCallback;

      const scheduleIdlePreload = () => {
        if (cancelledRef.current || nextIdleIndex >= frameSources.length) {
          return;
        }

        const runChunk = () => {
          let loadedThisChunk = 0;

          while (
            nextIdleIndex < frameSources.length &&
            loadedThisChunk < HERO_SEQUENCE_CONFIG.idleChunkSize
          ) {
            loadFrame(nextIdleIndex);
            nextIdleIndex += 1;
            loadedThisChunk += 1;
          }

          scheduleIdlePreload();
        };

        if (idleWindow.requestIdleCallback) {
          idleHandleRef.current = idleWindow.requestIdleCallback(
            () => runChunk(),
            { timeout: 800 }
          );
        } else {
          idleHandleRef.current = window.setTimeout(
            runChunk,
            HERO_SEQUENCE_CONFIG.idleDelayMs
          );
        }
      };

      scheduleIdlePreload();
    }

    const resizeDraw = () => {
      const frameIndex =
        lastDrawnFrameRef.current >= 0
          ? lastDrawnFrameRef.current
          : requestedFrameRef.current;
      scheduleCanvasDraw(frameIndex);
    };

    if (canvasRef.current && "ResizeObserver" in window) {
      resizeObserverRef.current = new ResizeObserver(resizeDraw);
      resizeObserverRef.current.observe(canvasRef.current);
    }

    window.addEventListener("resize", resizeDraw, { passive: true });

    return () => {
      cancelledRef.current = true;

      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (idleHandleRef.current !== null) {
        const idleWindow = window as WindowWithIdleCallback;
        if (idleWindow.cancelIdleCallback) {
          idleWindow.cancelIdleCallback(idleHandleRef.current);
        } else {
          window.clearTimeout(idleHandleRef.current);
        }
      }

      resizeObserverRef.current?.disconnect();
      window.removeEventListener("resize", resizeDraw);
    };
  }, [
    drawFrame,
    frameSources.length,
    initialFrameIndex,
    loadFrame,
    priorityFrameIndexes,
    reducedMotion,
    scheduleCanvasDraw,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
    />
  );
});

export default HeroFrameSequence;
