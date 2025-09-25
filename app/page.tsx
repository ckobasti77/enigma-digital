// app/page.tsx
import { Button } from "@/components/ui/button";
import LaptopScene from "./_components/LaptopScene";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 lg:px-20">
      {/* Left column */}
      <div className="flex-1 max-w-lg space-y-6">
        <h1 className="text-5xl font-bold">We Build Web Experiences</h1>
        <p className="text-lg text-muted-foreground">
          Enigma IT creates stunning websites, SEO strategies, and digital marketing solutions.
        </p>
        <Button size="lg">Get Started</Button>
      </div>

      {/* Right column */}
      <div className="flex-1 flex justify-center">
        {/* <LaptopScene /> */}
      </div>
    </main>
  );
}
