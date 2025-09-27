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
      <button
        className="
          group relative inline-flex items-center whitespace-nowrap
          font-bold uppercase tracking-wide cursor-pointer
          text-cyan-300 rounded-full overflow-hidden
          transition-all duration-500 ease-out
        "
      >
        <span className="relative z-10 px-6">Get Started</span>

        <span className="relative z-10 flex items-center justify-center h-10 w-10">
          ➜
        </span>

        <span
          className="
            absolute right-0 h-10 w-10 rounded-full
            bg-gradient-to-r from-pink-500 to-cyan-400
            shadow-[0_0_10px_#ec4899,0_0_20px_#22d3ee]
            transition-all duration-500 ease-out
            group-hover:w-full group-hover:rounded-full
          "
        />
      </button>
    </div>
  );
};

export default HeroLeft;
