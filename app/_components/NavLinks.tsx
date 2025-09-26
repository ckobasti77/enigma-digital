import { navLinks } from "@/constants/navLinks";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const NavLinks = () => {
  useGSAP(() => {
    gsap.to(".primary-link", {
      opacity: 1,
      y: 0,
      fontWeight: 600,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <div className='hidden xl:flex gap-x-5'>
      {navLinks.map((link: any, i: number) => (
        <Link href={link.to} key={i} className="text-white/90 hover:text-white text-center text-xl group cursor-pointer opacity-0 -translate-y-96 primary-link">
          {link.text}
          {link.dropdownLinks ? (
            <ChevronUp className="ml-1 mb-1 group-hover:rotate-180 transition-all h-5 w-5 inline" />
          ) : (
            ""
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
