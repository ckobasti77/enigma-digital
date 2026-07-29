export type HeroCopyPlacement = {
  bottom?: string;
  left?: string;
  maxWidth: {
    cap: number;
    viewportPercent: number;
  };
  right?: string;
  scrim?: boolean;
  textAlign: "left" | "center" | "right";
  top?: string;
  translateX?: "-50%";
};

export type ScrollStoryPanel = {
  id: string;
  paragraphs: readonly string[];
  placement: {
    desktop: HeroCopyPlacement;
    mobile: HeroCopyPlacement;
  };
  revealDelay?: number;
  title: string;
};

export type ScrollStorySlide = {
  frameGroup: 0 | 1 | 2;
  frames: {
    desktop: number;
    mobile: number;
  };
  id: string;
  panels: readonly ScrollStoryPanel[];
};

export const scrollStorySlides = [
  {
    frameGroup: 0,
    frames: {
      desktop: 91,
      mobile: 91,
    },
    id: "business",
    panels: [
      {
        id: "business-intro",
        paragraphs: [
          "a naše je da vam otežamo — NOVČANIK.",
          "Ono što mi radimo, za vas i treba da ostane — ENIGMA.",
        ],
        placement: {
          desktop: {
            bottom: "clamp(5rem, 8svh, 7rem)",
            left: "50%",
            maxWidth: {
              cap: 900,
              viewportPercent: 62,
            },
            textAlign: "center",
            translateX: "-50%",
          },
          mobile: {
            bottom: "clamp(2.5rem, 5svh, 4rem)",
            left: "50%",
            maxWidth: {
              cap: 520,
              viewportPercent: 88,
            },
            textAlign: "center",
            translateX: "-50%",
          },
        },
        title: "Vaše je da vodite svoj posao,",
      },
    ],
  },
  {
    frameGroup: 1,
    frames: {
      desktop: 242,
      mobile: 183,
    },
    id: "complete-digital",
    panels: [
      {
        id: "problem",
        paragraphs: ["i ostave vas da sami shvatite šta dalje..."],
        placement: {
          desktop: {
            left: "clamp(2rem, 4vw, 5rem)",
            maxWidth: {
              cap: 520,
              viewportPercent: 32,
            },
            scrim: true,
            textAlign: "left",
            top: "clamp(7.5rem, 16svh, 10rem)",
          },
          mobile: {
            left: "50%",
            maxWidth: {
              cap: 520,
              viewportPercent: 88,
            },
            scrim: true,
            textAlign: "center",
            top: "clamp(6.25rem, 11svh, 7.75rem)",
            translateX: "-50%",
          },
        },
        title: "Dok vam drugi prodaju „websajt”",
      },
      {
        id: "solution",
        paragraphs: [
          "websajt, mobilnu aplikaciju, privatni sistem i reklame",
          "koje dovode klijente, mušterije ili kupce.",
        ],
        placement: {
          desktop: {
            maxWidth: {
              cap: 560,
              viewportPercent: 34,
            },
            right: "clamp(2rem, 4vw, 5rem)",
            scrim: true,
            textAlign: "right",
            top: "clamp(7.5rem, 16svh, 10rem)",
          },
          mobile: {
            bottom: "clamp(2rem, 4svh, 3rem)",
            left: "50%",
            maxWidth: {
              cap: 540,
              viewportPercent: 90,
            },
            scrim: true,
            textAlign: "center",
            translateX: "-50%",
          },
        },
        revealDelay: 0.18,
        title: "Mi pravimo kompletan digitalni nastup:",
      },
    ],
  },
  {
    frameGroup: 2,
    frames: {
      desktop: 394,
      mobile: 334,
    },
    id: "partnership",
    panels: [
      {
        id: "execution",
        paragraphs: [
          "Naš tim korak po korak planira, crta, kodira i pokreće sve od nule.",
        ],
        placement: {
          desktop: {
            left: "clamp(2rem, 4vw, 5rem)",
            maxWidth: {
              cap: 570,
              viewportPercent: 34,
            },
            scrim: true,
            textAlign: "left",
            top: "clamp(7.25rem, 14svh, 9rem)",
          },
          mobile: {
            left: "50%",
            maxWidth: {
              cap: 520,
              viewportPercent: 88,
            },
            scrim: true,
            textAlign: "center",
            top: "clamp(6.25rem, 10svh, 7.5rem)",
            translateX: "-50%",
          },
        },
        title: "Ne bavimo se WordPressom i šablonima.",
      },
      {
        id: "outcome",
        paragraphs: [
          "Trudimo se da vas što manje zamaramo našim delom posla (ukoliko to ne želite),",
          "i omogućavamo vam više slobodnog vremena, organizovaniji biznis i deblji novčanik.",
        ],
        placement: {
          desktop: {
            maxWidth: {
              cap: 600,
              viewportPercent: 36,
            },
            right: "clamp(2rem, 4vw, 5rem)",
            scrim: true,
            textAlign: "right",
            top: "clamp(7.25rem, 14svh, 9rem)",
          },
          mobile: {
            bottom: "clamp(1.75rem, 3svh, 2.5rem)",
            left: "50%",
            maxWidth: {
              cap: 550,
              viewportPercent: 90,
            },
            scrim: true,
            textAlign: "center",
            translateX: "-50%",
          },
        },
        revealDelay: 0.18,
        title: "Vi vodite biznis. Mi vodimo digitalni deo.",
      },
    ],
  },
] as const satisfies readonly ScrollStorySlide[];
