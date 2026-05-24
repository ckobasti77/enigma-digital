export const HERO_FRAME_DIRECTORY = "hero-frames";
export const HERO_FRAME_PUBLIC_PATH = "/hero-frames";

export const HERO_SEQUENCE_CONFIG = {
  initialPreloadCount: 61,
  highPriorityFrameCount: 24,
  nearbyFrameRadius: 12,
  idleChunkSize: 6,
  idleDelayMs: 120,
  dprLimit: 1.5,
  frameRightGuideAlignmentRatio: 1880 / 1916,
  textFrameCheckpoints: [0, 61, 122, 183, 243],
  textCheckpointLeadFrames: 4,
  textFillCompletionRatio: 0.52,
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
    headline: "Sajt koji stvara poverenje.",
    subtitle:
      "Jasna poruka, premium izgled i put koji posetioca vodi ka upitu.",
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
    headline: "Pravi klijenti se javljaju.",
    subtitle:
      "Kada je iskustvo precizno, interesovanje brže postaje razgovor.",
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
      "Ne jurimo klikove. Gradimo prisustvo koje privlači ozbiljne prilike.",
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
    headline: "Bez sistema, pažnja curi.",
    subtitle:
      "Strategija, dizajn i razvoj rade zajedno da korisnika vode do akcije.",
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
    headline: "Sistem koji prodaje poverenje.",
    subtitle:
      "Premium sajtovi i web sistemi za ozbiljniji nastup i merljiv rast.",
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
