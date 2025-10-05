'use client';

import PageHero from "@/app/_components/PageHero";
import { navLinks } from "@/constants/navLinks";

const servicesLink = navLinks.find((link) => link.text === "Services");
const serviceHighlights =
  servicesLink?.dropdownLinks.map((service) => ({
    title: service.headline,
    body: service.subheadline,
    icon: service.icon,
  })) ?? [];

const Services = () => {
  return (
    <PageHero
      eyebrow="What we make happen"
      title="A modular stack of services built to ship results"
      description="Pick a single capability or assemble a full product squad. Strategy, design, and technology stay tightly aligned, so every sprint delivers measurable progress toward your goals."
      metrics={[
        { value: "30+", label: "Launches shipped" },
        { value: "8 wks", label: "Average delivery" },
        { value: "98%", label: "Client retention" },
      ]}
      ctas={[
        { href: "/contact", label: "Scope your stack" },
        { href: "/projects", label: "See it in action", variant: "secondary" },
      ]}
      highlights={serviceHighlights}
      footnote="Need something bespoke? We mix and match pods around your roadmap, then hand over with documentation and enablement built in."
    />
  );
};

export default Services;

