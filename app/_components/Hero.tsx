"use client";

import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";

const Hero = () => {
  return (
    <main className="bg-[url(/./assets/background2.avif)] bg-cover bg-repeat min-h-screen">
      <div className="bg-gradient-to-b from-transparent via-transparent to-black">
        <div className="flex flex-col xl:flex-row justify-normal xl:justify-between items-center gap-y-3 pb-32 pt-24 px-6 xl:px-20 w-full h-full bg-blur">
          <HeroLeft />
          <HeroRight />
        </div>
      </div>
    </main>
  );
};

export default Hero;
