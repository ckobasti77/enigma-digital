// app/page.tsx
import { Button } from "@/components/ui/button";
import LaptopScene from "./_components/LaptopScene";
import HeroLeft from "./_components/HeroLeft";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col xl:flex-row justify-normal xl:justify-between items-center gap-y-32 py-32 px-6 xl:px-20">
      {/* Left column */}
      <HeroLeft />

      {/* Right column */}
      <div className="flex justify-center">
        <LaptopScene />
      </div>
    </main>
  );
}
