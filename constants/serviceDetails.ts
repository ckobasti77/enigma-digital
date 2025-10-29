import type { PageHeroProps } from "@/app/_components/PageHero";
import type { ServiceFloatingKey } from "@/constants/serviceFloatingObjects";
import {
  BadgeCheck,
  Code2,
  Figma,
  Gauge,
  Globe2,
  Megaphone,
  MessageSquare,
  Palette,
  Route,
  Search,
  ShieldCheck,
  SignalHigh,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Server,
} from 'lucide-react';

type ServiceDetail = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: NonNullable<PageHeroProps["metrics"]>;
  highlights: NonNullable<PageHeroProps["highlights"]>;
  ctas: NonNullable<PageHeroProps["ctas"]>;
  footnote?: string;
  floatingServiceKey: ServiceFloatingKey;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "web-development": {
    floatingServiceKey: "web-development",
    eyebrow: "Engineering excellence",
    title: "Web platforms engineered for growth and resilience",
    description:
      "From high-converting marketing sites to complex SaaS workflows, we architect maintainable experiences with performance, observability, and scalability baked in from sprint one.",
    metrics: [
      { value: "<2s", label: "First paint target" },
      { value: "99.9%", label: "Availability SLO" },
      { value: "4 wks", label: "MVP launch window" },
    ],
    highlights: [
      {
        title: "Stacks tailored to your roadmap",
        body: "TypeScript-first architecture, component libraries, and CI/CD pipelines shaped around your team’s skills and constraints.",
        icon: Code2,
      },
      {
        title: "Performance tuned from day one",
        body: "We obsess over Core Web Vitals, caching, and resilient infrastructure so your platform feels instant for every visitor.",
        icon: Gauge,
      },
      {
        title: "Secure, observable foundations",
        body: "Authentication, logging, and automated QA guardrails are part of the build so you can scale with confidence.",
        icon: Server,
      },
    ],
    ctas: [
      { href: "/contact", label: "Start your build" },
      { href: "/projects", label: "Review engineering work", variant: "secondary" },
    ],
    footnote: "Tech we reach for: Next.js, Remix, Astro, Playwright, GraphQL, Edge functions, and the platforms that best meet your goals.",
  },
  "ui-ux-design": {
    floatingServiceKey: "ui-ux-design",
    eyebrow: "Design systems",
    title: "Interfaces that feel effortless everywhere",
    description:
      "Research-driven UX, polished UI, and design systems that scale with your product. We co-create with stakeholders and hand off clean tokens, libraries, and documentation.",
    metrics: [
      { value: "10+", label: "User sessions" },
      { value: "3x", label: "Prototype velocity" },
      { value: "AA", label: "Accessibility baseline" },
    ],
    highlights: [
      {
        title: "Insight-led discovery",
        body: "Jobs-to-be-done interviews, analytics dives, and co-creation workshops shape every design decision.",
        icon: Users,
      },
      {
        title: "Design systems ready for dev",
        body: "Structured tokens, component variants, and Figma libraries keep designers and engineers shipping in sync.",
        icon: Figma,
      },
      {
        title: "Craft that separates your brand",
        body: "Micro-interactions, tone of voice, and visual polish that elevate the experience without sacrificing usability.",
        icon: Sparkles,
      },
    ],
    ctas: [
      { href: "/contact", label: "Request a design workshop" },
      { href: "/projects", label: "See design transformations", variant: "secondary" },
    ],
    footnote: "Deliverables include research readouts, service blueprints, annotated flows, and developer-ready documentation.",
  },
  "mobile-app-development": {
    floatingServiceKey: "mobile-app-development",
    eyebrow: "Mobile product",
    title: "Native experiences engineered for retention",
    description:
      "From concept to App Store release, we ship iOS and Android products that pair delightful UX with production-grade performance, analytics, and release management.",
    metrics: [
      { value: "8 wks", label: "Launch to store" },
      { value: "60 fps", label: "Performance target" },
      { value: "99.5%", label: "Crash-free sessions" },
    ],
    highlights: [
      {
        title: "Cross-platform foundations",
        body: "React Native and Flutter builds with shared logic, native modules where it counts, and CI ready for your release cadence.",
        icon: Smartphone,
      },
      {
        title: "Flows optimised for on-the-go",
        body: "Offline states, push strategies, and funnel analytics tuned to keep users engaged wherever they are.",
        icon: Route,
      },
      {
        title: "Security and compliance baked in",
        body: "Secure storage, auth, and monitoring from the first build so you clear audits and app reviews without friction.",
        icon: ShieldCheck,
      },
    ],
    ctas: [
      { href: "/contact", label: "Plan your app" },
      { href: "/projects", label: "View mobile launches", variant: "secondary" },
    ],
    footnote: "We cover release management, store optimisation, analytics wiring, and the rituals your in-house team needs to keep shipping.",
  },
  "seo-geo": {
    floatingServiceKey: "seo-geo",
    eyebrow: "Visibility",
    title: "Be discoverable where your audience is searching",
    description:
      "Technical SEO, geo expansion, and content architecture that compound organic growth. We ship audits, roadmaps, and implementation with your team or ours.",
    metrics: [
      { value: "30%", label: "Traffic lift target" },
      { value: "90d", label: "Roadmap cadence" },
      { value: "50+", label: "Pages optimised" },
    ],
    highlights: [
      {
        title: "Technical foundations",
        body: "Schema, speed, crawl budgets, and internationalisation configured so your site earns authority.",
        icon: Search,
      },
      {
        title: "Local and geo expansion",
        body: "Location pages, translations, and listings managed to put you in front of regional audiences fast.",
        icon: Globe2,
      },
      {
        title: "Transparent reporting",
        body: "Dashboards that track rankings, share of voice, and revenue impact so every optimisation stays accountable.",
        icon: SignalHigh,
      },
    ],
    ctas: [
      { href: "/contact", label: "Request an SEO audit" },
      { href: "/projects", label: "View growth stories", variant: "secondary" },
    ],
    footnote: "We integrate with your content and performance teams, keeping experiments, learnings, and playbooks in one shared workspace.",
  },
  branding: {
    floatingServiceKey: "branding",
    eyebrow: "Brand identity",
    title: "Brands that feel cohesive from pixels to packaging",
    description:
      "Positioning, voice, and visual systems that scale with your product. We craft identities that translate across web, mobile, decks, and sales enablement.",
    metrics: [
      { value: "4 wks", label: "Brand sprint" },
      { value: "6+", label: "Asset suites" },
      { value: "100%", label: "Guideline clarity" },
    ],
    highlights: [
      {
        title: "Strategic positioning",
        body: "Audience, competitors, and differentiation distilled into a clear, ownable story.",
        icon: Target,
      },
      {
        title: "Visual systems that flex",
        body: "Logos, typography, colour, and motion guidelines built to adapt across every touchpoint.",
        icon: Palette,
      },
      {
        title: "Voice & launch assets",
        body: "Messaging pillars, pitch decks, and rollout playbooks to keep teams aligned post-launch.",
        icon: BadgeCheck,
      },
    ],
    ctas: [
      { href: "/contact", label: "Kick off your brand sprint" },
      { href: "/projects", label: "See identity work", variant: "secondary" },
    ],
    footnote: "Expect collaborative workshops, moodboards, and layered files ready for designers, developers, and marketing alike.",
  },
  "social-media": {
    floatingServiceKey: "social-media",
    eyebrow: "Community & content",
    title: "Make every touchpoint earn attention",
    description:
      "Campaign strategy, creator-ready assets, and analytics loops that grow engaged communities across the platforms that matter to you.",
    metrics: [
      { value: "5x", label: "Engagement lift" },
      { value: "12", label: "Campaigns quarterly" },
      { value: "24h", label: "Creative turnaround" },
    ],
    highlights: [
      {
        title: "Platform-native creative",
        body: "Motion, copy, and formats tuned to how people consume on TikTok, Instagram, LinkedIn, and beyond.",
        icon: Megaphone,
      },
      {
        title: "Audience development",
        body: "Community playbooks, influencer partnerships, and paid-retargeting loops that compound reach.",
        icon: Users,
      },
      {
        title: "Real-time optimisation",
        body: "Daily dashboards with experiments, learnings, and next moves so momentum never drops.",
        icon: MessageSquare,
      },
    ],
    ctas: [
      { href: "/contact", label: "Launch your campaign" },
      { href: "/projects", label: "Review social wins", variant: "secondary" },
    ],
    footnote: "We plug into your analytics stack, handle community moderation guidelines, and hand over repeatable playbooks.",
  },
};








