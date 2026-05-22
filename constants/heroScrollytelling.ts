export const HERO_FRAME_DIRECTORY = "hero-frames";
export const HERO_FRAME_PUBLIC_PATH = "/hero-frames";

export const HERO_SEQUENCE_CONFIG = {
  checkpointCount: 5,
  initialPreloadCount: 18,
  nearbyFrameRadius: 9,
  idleChunkSize: 4,
  idleDelayMs: 120,
  dprLimit: 2,
  scrub: 1.15,
};

export type HeroCheckpoint = {
  eyebrow: string;
  headline: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

export const heroCheckpoints: HeroCheckpoint[] = [
  {
    eyebrow: "01 / Prisustvo",
    headline: "Vaš sajt može više.",
    subtitle:
      "Ne treba vam samo lep ekran. Treba vam digitalno prisustvo koje gradi poverenje i pokreće interesovanje.",
    primaryCta: {
      label: "Zakažite konsultaciju",
      href: "/contact",
    },
    secondaryCta: {
      label: "Pogledajte proces",
      href: "#timeline-spine",
    },
  },
  {
    eyebrow: "02 / Signali",
    headline: "Pravi klijenti počinju da se javljaju.",
    subtitle:
      "Kada su poruka, dizajn i struktura jasni, posetioci lakše postaju upiti, pozivi i zakazani razgovori.",
    primaryCta: {
      label: "Pokrenite rast",
      href: "/contact",
    },
    secondaryCta: {
      label: "Vidite kako radi",
      href: "#timeline-spine",
    },
  },
  {
    eyebrow: "03 / Potražnja",
    headline: "Više pažnje. Bolji upiti.",
    subtitle:
      "Snažno digitalno prisustvo ne donosi samo više klikova. Donosi više relevantnih prilika za vaš biznis.",
    primaryCta: {
      label: "Privucite bolje klijente",
      href: "/contact",
    },
    secondaryCta: {
      label: "Pogledajte rezultate",
      href: "/projects",
    },
  },
  {
    eyebrow: "04 / Sistem",
    headline: "Pažnja bez sistema je haos.",
    subtitle:
      "Enigma Code povezuje strategiju, dizajn, razvoj i tokove upita u sistem koji vodi korisnika od interesovanja do akcije.",
    primaryCta: {
      label: "Izgradite sistem",
      href: "/contact",
    },
    secondaryCta: {
      label: "Naš proces",
      href: "#timeline-spine",
    },
  },
  {
    eyebrow: "05 / Rast",
    headline: "Digitalni sistem koji prodaje poverenje.",
    subtitle:
      "Pravimo premium sajtove, web aplikacije i digitalne sisteme za firme koje žele ozbiljniji nastup, bolje klijente i merljiv rast.",
    primaryCta: {
      label: "Zatražite analizu sajta",
      href: "/contact",
    },
    secondaryCta: {
      label: "Kontakt",
      href: "/contact",
    },
  },
];
