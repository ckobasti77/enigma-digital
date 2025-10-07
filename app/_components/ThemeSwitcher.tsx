"use client";

import { useCallback } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import clsx from "clsx";

type ThemeSwitcherProps = {
  variant?: "solid" | "ghost";
  className?: string;
};

const ThemeSwitcher = ({ variant = "solid", className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      toggleTheme({ origin, animated: true });
    },
    [toggleTheme]
  );

  const baseClasses =
    "relative group flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-70";
  const variantClasses =
    variant === "ghost"
      ? "border border-theme bg-transparent text-theme-primary transition-all duration-600 hover:bg-muted"
      : "border border-theme bg-card text-theme-primary shadow-theme transition-all duration-600 hover:bg-muted";

  const iconClasses = "h-5 w-5 transition-transform duration-300";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      className={clsx(baseClasses, variantClasses, className)}
      disabled={isTransitioning}
    >
      {theme === "dark" ? (
        <Sun
          className={clsx(iconClasses, "text-amber-300 scale-105")}
          aria-hidden="true"
        />
      ) : (
        <Moon
          className={clsx(iconClasses, "text-theme-muted")}
          aria-hidden="true"
        />
      )}
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/0 via-cyan-400/0 to-cyan-400/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
    </button>
  );
};

export default ThemeSwitcher;
