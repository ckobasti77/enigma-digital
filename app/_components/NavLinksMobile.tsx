"use client";

import { navLinks } from "@/constants/navLinks";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { LucideIcon } from "lucide-react";

export type DropdownLink = {
  id: number;
  to: string;
  headline: string;
  subheadline: string;
  icon: LucideIcon;
};

export type NavLink = {
  id: number;
  to: string;
  text: string;
  cta?: boolean;
  dropdownLinks?: DropdownLink[];
};

type NavLinksMobileProps = {
  toggleNav: () => void;
  navOpen: boolean;
  currentDropdown: number;
  setCurrentDropdown: React.Dispatch<React.SetStateAction<number>>;
};

const NavLinks = ({
  toggleNav,
  navOpen,
  currentDropdown,
  setCurrentDropdown,
}: NavLinksMobileProps) => {

  const secondaryLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div
      className={`z-9999 bg-black w-full -translate-y-[1000px] opacity-0 transition-all duration-500 gap-y-3 absolute top-20 bg-gradient-to-bl from-pink-400 via-teal-400 to-blue-400 pb-0.5 rounded-b-xl ${
        navOpen && "translate-y-0 opacity-100"
      }`}
    >
      <div className="bg-black p-6 rounded-b-xl flex lg:hidden flex-col gap-y-3">
        {navLinks.map((link: NavLink, i: number) => (
          <div key={i}>
            <Link
              href={link.dropdownLinks ? "/" : link.to}
              className={`text-white/90 hover:text-white text-start text-xl group cursor-pointer primary-link transition-all duration-500 
            ${
              navOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-96"
            }`}
              style={{ transitionDelay: `${i * 200 + 500}ms` }}
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
            {link.dropdownLinks && (
              <div
                className={`flex lg:hidden flex-col w-full gap-y-3 px-6 transition-all opacity-0 h-0 ${
                  currentDropdown === link.id &&
                  `h-[240px] opacity-100 py-3`
                }`}
              >
                {link.dropdownLinks.map((dropdownLink: DropdownLink, i: number) => {
                  const Icon = dropdownLink.icon; 
                  return (
                    <Link
                      ref={secondaryLinkRef}
                      href={`${link.to}/${dropdownLink.to}`}
                      key={i}
                      className={`flex items-center gap-2 text-white/90 hover:text-white text-start text-xl group cursor-pointer transition-all 
                    
                    }`}
                      style={{ transitionDelay: `${i * 100 + 250}ms` }}
                    >
                      <Icon className="w-5 h-5 mt-[4px]" />{" "}
                      {dropdownLink.headline}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
