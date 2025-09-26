"use client";

import { navLinks } from "@/constants/navLinks";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
  // useGSAP(() => {
  //     gsap.to(".primary-link", {
  //       opacity: 1,
  //       x: 0,
  //       fontWeight: 600,
  //       duration: 1,
  //       stagger: 0.25,
  //     });
  //   }, []);

  return (
    <div
      className={`bg-black flex lg:hidden flex-col w-full -translate-y-[1000px] opacity-0 transition-all duration-500 gap-y-3 absolute top-20 px-6 ${
        navOpen && "translate-y-0 opacity-100"
      }`}
    >
      {navLinks.map((link: any, i: number) => (
        <>
          <Link
            href={link.dropdownLinks ? "/" : link.to}
            key={i}
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
          {currentDropdown === link.id && (
            <div className={`flex lg:hidden flex-col w-full gap-y-3 px-6`}>
              {link.dropdownLinks.map((dropdownLink: any, i: number) => {
                const Icon = dropdownLink.icon; // 👈 izvučeš komponentu ikone
                return (
                  <Link
                    href={`${link.to}/${dropdownLink.to}`}
                    key={i}
                    className={`flex items-center gap-2 text-white/90 hover:text-white text-start text-xl group cursor-pointer transition-all ${
                      currentDropdown === link.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                    }`}
                    style={{ transitionDelay: `${i * 100 + 250}ms` }}
                  >
                    <Icon className="w-5 h-5 mt-[4px]" />{" "}
                    {/* 👈 renderuješ ikonicu */}
                    {dropdownLink.headline}
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default NavLinks;
