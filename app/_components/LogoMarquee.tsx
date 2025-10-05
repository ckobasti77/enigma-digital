"use client";

import Image from "next/image";

type LogoConfig = {
  name: string;
  src: string;
};

const logos: LogoConfig[] = [
  { name: "Linear", src: "/logos/linear.svg" },
  { name: "Vercel", src: "/logos/vercel.svg" },
  { name: "Supabase", src: "/logos/supabase.svg" },
  { name: "PostHog", src: "/logos/posthog.svg" },
  { name: "Sanity", src: "/logos/sanity.svg" },
  { name: "Plausible Analytics", src: "/logos/plausibleanalytics.svg" },
  { name: "ClickUp", src: "/logos/clickup.svg" },
  { name: "Webflow", src: "/logos/webflow.svg" },
];

export default function LogoMarquee() {
  const marqueeItems = [...logos, ...logos];

  return (
    <section
      aria-label="Client logos"
      className="relative isolate w-full  bg-slate-950 py-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.5em] text-slate-400/80">
          Trusted by teams shipping fast
        </p> */}
        <div className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent"
          />
          <ul className="flex min-w-max animate-marquee items-center gap-16 py-2">
            {marqueeItems.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`}
                className="flex h-14 w-40 items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={56}
                  className="h-10 w-auto origin-center invert"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
