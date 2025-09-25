"use client";

import { navLinks } from "@/constants/navLinks";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

type NavLinksMobileProps = {
  toggleNav: () => void;
  navOpen: boolean;
};

const NavLinks = ({ toggleNav, navOpen }: NavLinksMobileProps) => {
  const [currentDropdown, setCurrentDropdown] = useState(0);


  return (
    <div className="flex lg:hidden flex-col w-full gap-y-3 absolute top-20 px-6">
      {navLinks.map((link: any, i: number) => (
        <>
          <Link
            href={link.dropdownLinks ? "/" : link.to}
            key={i}
            className="text-white/90 hover:text-white text-start text-xl group cursor-pointer"
          >
            {link.text}
            {link.dropdownLinks ? (
              <ChevronUp
                onClick={() => {
                  if (currentDropdown === link.id) {
                    setCurrentDropdown(0);
                  } else {
                    setCurrentDropdown(link.id);
                  }
                }}
                className={`ml-1 mb-1 group-hover:rotate-180 transition-all h-5 w-5 inline ${
                  currentDropdown === link.id && "rotate-180"
                }`}
              />
            ) : (
              ""
            )}
          </Link>
          {currentDropdown === link.id && (
            <div className="flex lg:hidden flex-col w-full gap-y-3 px-6">
              {link.dropdownLinks.map((dropdownLink: any, i: number) => (
                <Link
                  href={`${link.to}/${dropdownLink.to}`}
                  key={i}
                  className="text-white/90 hover:text-white text-start text-xl group cursor-pointer"
                >
                  {dropdownLink.headline}
                </Link>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default NavLinks;
