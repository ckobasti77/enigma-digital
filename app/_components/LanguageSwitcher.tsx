"use client";

import clsx from "clsx";
import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import type { Locale } from "@/lib/i18n";

const localeOptions: Array<{ locale: Locale; label: string }> = [
  { locale: "sr", label: "SR" },
  { locale: "en", label: "EN" },
];

const switcherLabels: Record<Locale, string> = {
  sr: "Prebaci jezik sajta",
  en: "Switch site language",
};

const ariaLabels: Record<Locale, Record<Locale, string>> = {
  sr: {
    sr: "Prikaži sajt na srpskom",
    en: "Prikaži sajt na engleskom",
  },
  en: {
    sr: "Switch site to Serbian",
    en: "Switch site to English",
  },
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="inline-flex h-10 items-center gap-0.5 rounded-full border border-theme bg-card px-1 text-theme-primary shadow-theme transition-theme sm:h-11 sm:gap-1"
      aria-label={switcherLabels[locale]}
      data-no-translate="true"
    >
      <Languages className="ml-1 hidden h-4 w-4 text-cyan-400 sm:block" aria-hidden="true" />
      {localeOptions.map((option) => {
        const active = option.locale === locale;

        return (
          <button
            key={option.locale}
            type="button"
            aria-label={ariaLabels[locale][option.locale]}
            aria-pressed={active}
            onClick={() => setLocale(option.locale)}
            className={clsx(
              "min-w-8 rounded-full px-2 py-1.5 text-xs font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400/40 sm:min-w-9 sm:px-2.5",
              active
                ? "bg-foreground text-background"
                : "text-theme-muted hover:bg-muted hover:text-theme-primary"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
