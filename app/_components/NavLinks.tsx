import { navLinks } from "@/constants/navLinks";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavLinks = () => {
  return (
    <div className='hidden xl:flex gap-x-5'>
      {navLinks.map((link: any, i: number) => (
        <Link href={link.to} key={i} className="text-white/90 hover:text-white text-center text-xl group cursor-pointer">
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
