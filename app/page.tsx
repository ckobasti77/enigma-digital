import Hero from "./_components/Hero";
import Timeline from "./_components/Timeline";
import EffectiveSoftware from "./_components/EffectiveSoftware";
import ServiceCards from "./_components/ServiceCards";
import LogoMarquee from "./_components/LogoMarquee";
import { getHeroFrameSources } from "@/lib/heroFrames";

export default async function Home() {
  const heroFrameSources = await getHeroFrameSources();

  return (
    <>
      <Hero frameSources={heroFrameSources} />
      <LogoMarquee />
      <Timeline />
      <EffectiveSoftware />
      <ServiceCards />
    </>
  );
}
