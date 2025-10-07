"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";

type ThemeMode = "light" | "dark";
type ThemeToggleOrigin = { x: number; y: number };
type ThemeToggleOptions = {
  origin?: ThemeToggleOrigin;
  animated?: boolean;
};

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (value: ThemeMode, options?: ThemeToggleOptions) => void;
  toggleTheme: (options?: ThemeToggleOptions) => void;
  isTransitioning: boolean;
};

type ThemeTransitionState = {
  target: ThemeMode;
  origin: {
    xPercent: number;
    yPercent: number;
  };
  committed: boolean;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const TRANSITION_DURATION_MS = 820;

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === "light" || value === "dark";

const applyDocumentTheme = (value: ThemeMode) => {
  const root = document.documentElement;

  root.classList.toggle("dark", value === "dark");
  root.dataset.theme = value;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [transition, setTransition] = useState<ThemeTransitionState | null>(null);
  const commitTimeoutRef = useRef<number | null>(null);

  const clearCommitTimeout = useCallback(() => {
    if (commitTimeoutRef.current !== null) {
      window.clearTimeout(commitTimeoutRef.current);
      commitTimeoutRef.current = null;
    }
  }, []);

  const commitTheme = useCallback((value: ThemeMode) => {
    setThemeState(value);

    if (typeof document !== "undefined") {
      applyDocumentTheme(value);
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", value);
    }
  }, []);

  const startAnimatedTransition = useCallback(
    (target: ThemeMode, origin?: ThemeToggleOrigin) => {
      if (transition) return;

      if (typeof window === "undefined") {
        commitTheme(target);
        return;
      }

      const { innerWidth, innerHeight } = window;
      const originX = origin?.x ?? innerWidth / 2;
      const originY = origin?.y ?? innerHeight / 2;
      const xPercent = clamp((originX / innerWidth) * 100, 0, 100);
      const yPercent = clamp((originY / innerHeight) * 100, 0, 100);

      setTransition({
        target,
        origin: { xPercent, yPercent },
        committed: false,
      });
    },
    [transition, commitTheme]
  );

  const setTheme = useCallback(
    (value: ThemeMode, options?: ThemeToggleOptions) => {
      const animated = options?.animated ?? true;

      if (!animated) {
        commitTheme(value);
        return;
      }

      startAnimatedTransition(value, options?.origin);
    },
    [commitTheme, startAnimatedTransition]
  );

  const toggleTheme = useCallback(
    (options?: ThemeToggleOptions) => {
      const nextTheme: ThemeMode = theme === "dark" ? "light" : "dark";
      const animated = options?.animated ?? true;

      if (!animated) {
        commitTheme(nextTheme);
        return;
      }

      startAnimatedTransition(nextTheme, options?.origin);
    },
    [theme, commitTheme, startAnimatedTransition]
  );

  useEffect(() => {
    if (!transition || typeof window === "undefined") return;

    clearCommitTimeout();

    commitTimeoutRef.current = window.setTimeout(() => {
      commitTheme(transition.target);
      setTransition((prev) => (prev ? { ...prev, committed: true } : prev));
      commitTimeoutRef.current = null;
    }, Math.round(TRANSITION_DURATION_MS * 0.55));

    return () => {
      clearCommitTimeout();
    };
  }, [transition, commitTheme, clearCommitTimeout]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem("theme");

    if (isThemeMode(stored)) {
      commitTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    commitTheme(prefersDark ? "dark" : "light");
  }, [commitTheme]);

  const handleTransitionEnd = useCallback(() => {
    if (!transition) return;

    clearCommitTimeout();

    if (!transition.committed) {
      commitTheme(transition.target);
    }

    setTransition(null);
  }, [transition, clearCommitTimeout, commitTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isTransitioning: Boolean(transition),
    }),
    [theme, setTheme, toggleTheme, transition]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {transition && (
        <div className="theme-transition">
          <span
            className={`theme-transition__circle theme-transition__circle--${transition.target}`}
            style={{
              "--transition-x": `${transition.origin.xPercent}%`,
              "--transition-y": `${transition.origin.yPercent}%`,
            } as CSSProperties}
            onAnimationEnd={handleTransitionEnd}
          />
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
