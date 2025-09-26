import { Button } from "@/components/ui/button";
import React from "react";
import HeroTitle from "./HeroTitle";

const HeroLeft = () => {
  return (
    <div className="max-w-lg flex flex-col items-start space-y-6">
      <HeroTitle />
      <p className="text-lg text-[#e0e0e0]">
        Enigma IT creates stunning websites, SEO strategies, and digital
        marketing solutions.
      </p>
      <Button variant={"enigma"} size="lg">Get Started</Button>
    </div>
  );
};

export default HeroLeft;
