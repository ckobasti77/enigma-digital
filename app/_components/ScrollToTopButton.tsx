"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={clsx(
        "btn-blur fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white shadow-lg transition-all duration-300",
        "hover:border-white/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isVisible
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-2"
      )}
    >
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M6.25 11.25 10 7.5l3.75 3.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M10 7.5V15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
