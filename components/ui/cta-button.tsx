import Link from "next/link";
import React from "react";

type CtaButtonProps = {
    href: string;
    text: string;
    className?: string;
    bordered: boolean;
}

const CtaButton = ({ href, text, className, bordered }: CtaButtonProps) => {
  return (
    <Link
      href={href}
      className={`font-aeonik tracking-widest font-extralight flex items-center text-white/90 hover:text-white text-center text-lg group cursor-pointer rounded-lg bg-gradient-to-r from-pink-400 via-teal-400 to-blue-400 p-0.5 bg-[length:200%_200%] bg-left transition-all duration-500 ease-out hover:bg-right ${className}`}
    >
      <div
        className={`bg-black rounded-md px-4 py-1 grid place-items-center ${bordered ? 'group-hover:bg-transparent' : 'bg-transparent'}  transition-all`}
      >
        {text}
      </div>
    </Link>
  );
};

export default CtaButton;
