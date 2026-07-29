import Hero from "./_components/Hero";
import Timeline from "./_components/Timeline";
import EffectiveSoftware from "./_components/EffectiveSoftware";
import ServiceCards from "./_components/ServiceCards";
import { TechSection } from "@/components/logo-marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TechSection />
      <Timeline />
      <EffectiveSoftware />
      <ServiceCards />
    </>
  );
}

