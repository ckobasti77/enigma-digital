"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type AutoTypingConsoleType = {
    text: string;
    className?: string;
}

export default function AutoTypingConsole({ text, className } : AutoTypingConsoleType) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current || !cursorRef.current) return;

    const letters = titleRef.current.querySelectorAll<HTMLElement>(".letter");

    gsap.set(letters, { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    const parentRect = titleRef.current.getBoundingClientRect();

    if (letters.length > 0) {
      const firstRect = letters[0].getBoundingClientRect();
      tl.set(cursorRef.current, {
        x: firstRect.left - parentRect.left,
        y: firstRect.top - parentRect.top,
        opacity: 1,
      });
    }

    letters.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const x = rect.right - parentRect.left; 
      const y = rect.top - parentRect.top;

      tl.to(cursorRef.current, { x, y, duration: 0, ease: "none" })
        .to(cursorRef.current, { opacity: 0, duration: 0.07 })
        .to(cursorRef.current, { opacity: 1, duration: 0.07 })
        .to(el, { opacity: 1, duration: 0.01 }, "<");
    });

    tl.to(cursorRef.current, { opacity: 0, duration: 0.1 });
  }, []);

  return (
    <h1
      ref={titleRef}
      className={`
        relative  text-white leading-tight
        text-5xl
        whitespace -normal font-broken-console
        ${className}
      `}
    >
      {text.split("").map((ch, i) => (
        <span key={i} className="letter inline">
          {ch}
        </span>
      ))}

      <span ref={cursorRef} className="absolute -top-2.5 -left-[0.65em] w-[0.65em] h-[1em] bg-white" />
    </h1>
  );
}
