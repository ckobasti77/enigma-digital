import {
  Boxes,
  Brush,
  Megaphone,
  Monitor,
  Search,
  Smartphone,
  WandSparkles,
} from "lucide-react";

export const navLinks = [
  {
    id: 1,
    to: "/",
    text: "Home",
  },
  {
    id: 2,
    to: "services",
    text: "Services",
    dropdownLinks: [
      {
        id: 1,
        to: "web-development",
        headline: "Web development",
        subheadline: "Develop. Dominate. Scale.",
        icon: Monitor,
      },
      {
        id: 2,
        to: "ui-ux-design",
        headline: "UI | UX Design",
        subheadline: "Intuitive experiences, beautiful interfaces.",
        icon: Brush,
      },
      {
        id: 3,
        to: "mobile-app-development",
        headline: "Mobile App Development",
        subheadline: "From idea to app store.",
        icon: Smartphone,
      },
      {
        id: 4,
        to: "seo-geo",
        headline: "SEO & GEO",
        subheadline: "Appear at top on Google & Chatbots",
        icon: Search,
      },
      {
        id: 5,
        to: "branding",
        headline: "Branding",
        subheadline: "Instantly recognizable. Effortlessly remembered.",
        icon: WandSparkles,
      },
      {
        id: 6,
        to: "social-media",
        headline: "Social Media",
        subheadline: "Turning followers into fans",
        icon: Megaphone,
      },
    ],
  },
  {
    id: 3,
    to: "projects",
    text: 'Projects'
  },
  {
    id: 4,
    to: "about",
    text: 'About'
  },
  {
    id: 5,
    to: "contact",
    text: 'Contact Us',
    cta: true,
  },
];
