"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current || !cursorRef.current) return;

    const letters = titleRef.current.querySelectorAll<HTMLElement>(".letter");

    // sva slova sakrivena
    gsap.set(letters, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    const parentRect = titleRef.current.getBoundingClientRect();

    // 👇 PRVO slovo - inicijalna pozicija cursora
    if (letters.length > 0) {
      const firstRect = letters[0].getBoundingClientRect();
      tl.set(cursorRef.current, {
        x: firstRect.left - parentRect.left,
        y: firstRect.top - parentRect.top,
        opacity: 1,
      });
    }

    // loop kroz sva slova
    letters.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const x = rect.right - parentRect.left; // desna ivica slova
      const y = rect.top - parentRect.top;

      tl.to(cursorRef.current, { x, y, duration: 0, ease: "none" })
        .to(cursorRef.current, { opacity: 0, duration: 0.07 })
        .to(cursorRef.current, { opacity: 1, duration: 0.07 })
        .to(el, { opacity: 1, duration: 0.01 }, "<");
    });

    // nakon poslednjeg slova ugasi cursor
    tl.to(cursorRef.current, { opacity: 0, duration: 0.1 });
  }, []);

  const text = "Obsess Customers With Your Brand";

  return (
    <h1
      ref={titleRef}
      style={{ fontFamily: "var(--font-terminal)" }}
      className="
        relative font-deltha text-white leading-tight
        text-2xl sm:text-3xl md:text-5xl xl:text-6xl
        whitespace -normal
      "
    >
      {text.split("").map((ch, i) => (
        <span key={i} className="letter inline">
          {ch}
        </span>
      ))}

      {/* cursor */}
      <span ref={cursorRef} className="absolute top-0 -left-[0.65em] w-[0.65em] h-[1em] bg-white" />
    </h1>
  );
}
