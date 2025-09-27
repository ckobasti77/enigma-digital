"use client";

import { navLinks } from "@/constants/navLinks";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
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

type NavLinksProps = {
  currentDropdown: number;
  setCurrentDropdown: React.Dispatch<React.SetStateAction<number>>;
};

const NavLinks = ({ currentDropdown, setCurrentDropdown }: NavLinksProps) => {
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useGSAP(() => {
    gsap.fromTo(
      ".primary-link",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        fontWeight: 600,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    Object.entries(dropdownRefs.current).forEach(([id, el]) => {
      if (!el) return;
      if (Number(id) === currentDropdown) {
        gsap.to(el, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          display: "block",
        });
      } else {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          display: "none",
        });
      }
    });
  }, [currentDropdown]);

  return (
    <div className="hidden xl:flex items-center gap-x-6 relative">
      {navLinks.map((link: NavLink, i: number) => (
        <div
          key={i}
          className="relative"
          onMouseEnter={() => link.dropdownLinks && setCurrentDropdown(link.id)}
          onMouseLeave={() => setCurrentDropdown(0)}
        >
          <Link
            href={link.to}
            className={`primary-link flex items-center text-white/90 hover:text-white text-center text-xl group cursor-pointer ${
              link.cta &&
              "rounded-full bg-gradient-to-bl from-pink-400 via-teal-400 to-blue-400 p-0.5"
            }`}
          >
            <div className={`${link.cta && 'bg-black rounded-full px-4 py-1 grid place-items-center'}`}>
              {link.text}
            </div>
            {link.dropdownLinks && (
              <ChevronDown
                className={`ml-1 mt-1 inline h-5 w-5 transition-transform ${
                  currentDropdown === link.id ? "rotate-180" : ""
                }`}
              />
            )}
          </Link>

          {link.dropdownLinks && (
            <div
              //@ts-expect-error/some-bs
              ref={(el) => (dropdownRefs.current[link.id] = el)}
              className="z-50 absolute bg-gradient-to-bl from-pink-400 via-teal-400 to-blue-400 pb-0.5 top-full right-0 mt-2 w-[750px] bg-black/90 rounded-b-xl shadow-lg overflow-hidden hidden"
            >
              <div className="bg-black rounded-b-xl">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 w-full">
                  {link.dropdownLinks.map((dropdownLink: DropdownLink, j: number) => {
                    const Icon = dropdownLink.icon;
                    return (
                      <Link
                        key={j}
                        href={`${link.to}/${dropdownLink.to}`}
                        className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-md transition"
                      >
                        <Icon className="w-6 h-6 mt-1 text-cyan-300" />
                        <div>
                          <h2 className="text-base font-semibold text-white">
                            {dropdownLink.headline}
                          </h2>
                          <h3 className="text-sm text-white/70">
                            {dropdownLink.subheadline}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
