import React from "react";
import AutoTypingConsole from "@/components/ui/auto-typing-console";
import CtaButton from "@/components/ui/cta-button";

const HeroLeft = () => {
  return (
    <div className="max-w-lg flex flex-col items-start space-y-6">
      <AutoTypingConsole text={"Obsess Clients With Your Brand"} />
      <p className="text-lg text-white/70 font-extralight tracking-wider upper">
        Enigma IT creates stunning websites, SEO strategies, and digital
        marketing solutions.
      </p>
      <div className="flex gap-x-6 items-center">
        <CtaButton href="/contact" text="Contact Us" bordered={true} />
        <CtaButton href="/projects" text="Our Work" bordered={false} />
      </div>
    
    </div>
  );
};

export default HeroLeft;
