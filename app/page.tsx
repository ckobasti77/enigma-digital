'use client'

import Hero from "./_components/Hero";
import Timeline from "./_components/Timeline";
import EffectiveSoftware from "./_components/EffectiveSoftware";
import ServiceCards from "./_components/ServiceCards";
import LogoMarquee from "./_components/LogoMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Timeline />
      <EffectiveSoftware />
      <ServiceCards />
    </>
  );
}
