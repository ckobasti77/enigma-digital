export type HomeHeroServiceIcon = "globe" | "shop" | "systems" | "mobile";

export const homeHero = {
  backgroundImage: "/assets/hero/growth-background.png",
  badge: "Custom digitalna rešenja",
  headline: "Gradimo digitalne proizvode koji izgledaju moćno i rade još bolje.",
  headlineLead: "Gradimo digitalne proizvode koji izgledaju moćno i",
  headlineRows: [
    "Gradimo digitalne",
    "proizvode koji izgledaju",
    "moćno i",
  ],
  headlineAccent: "rade još bolje.",
  subtitle:
    "Websajtovi, web-shopovi, digitalni sistemi i mobilne aplikacije - projektovani da unaprede prodaju, automatizuju procese i podignu utisak vašeg brenda.",
  primaryCta: {
    label: "Zakažite konsultacije",
    href: "/contact",
  },
  secondaryCta: {
    label: "Pogledajte radove",
    href: "/projects",
  },
  services: [
    { label: "Websajtovi", icon: "globe" },
    { label: "Web-shopovi", icon: "shop" },
    { label: "Digitalni sistemi", icon: "systems" },
    { label: "Mobilne aplikacije", icon: "mobile" },
  ] satisfies Array<{ label: string; icon: HomeHeroServiceIcon }>,
  growthLines: {
    top: "Više upita.",
    accent: "Više prodaja.",
    bottom: "Brži rast.",
  },
  metrics: [
    { value: "+148%", label: "više upita" },
    { value: "3.2x", label: "više prodaja" },
    { value: "24/7", label: "automatizacija" },
    { value: "62%", label: "brži odgovor" },
  ],
  colors: {
    backgroundFrom: "#020712",
    backgroundMid: "#030916",
    backgroundTo: "#050B18",
    text: "rgba(255,255,255,0.92)",
    muted: "rgba(255,255,255,0.65)",
    border: "rgba(148,197,255,0.18)",
    blue: "#2563EB",
    cyan: "#22D3EE",
    cyanDark: "#06B6D4",
    glowSoft: "rgba(0,153,255,0.25)",
    glowStrong: "rgba(0,153,255,0.45)",
  },
} as const;
