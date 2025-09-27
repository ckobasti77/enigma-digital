import HeroLeft from "./_components/HeroLeft";
import HeroRight from "./_components/HeroRight";

const Hero = () => {
  return (
    <main className="min-h-screen flex flex-col xl:flex-row justify-normal xl:justify-between items-center gap-y-12 pb-32 pt-16 px-6 xl:px-20">
      <HeroLeft />
      <HeroRight />
    </main>
  )
}

export default Hero
