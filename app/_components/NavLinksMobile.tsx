"use client";

import React from "react";

import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { navLinks } from "@/constants/navLinks";

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

const normalize = (s: string) => s.replace(/^\/+|\/+$/g, "");
const absPath = (s: string) => (s.startsWith("/") ? s : `/${s}`);
const joinPath = (...parts: string[]) =>
  "/" + parts.filter(Boolean).map(normalize).join("/");

const NavLinksMobile = ({
  toggleNav,
  navOpen,
  currentDropdown,
  setCurrentDropdown,
}: NavLinksMobileProps) => {
  return (
    <div
      className={`tracking-wider z-[9999] w-full absolute top-20 transition-all duration-500
      bg-gradient-to-bl from-pink-400 via-teal-400 to-blue-400 rounded-b-xl pb-0.5
      ${navOpen ? "translate-y-0 opacity-100" : "-translate-y-[1000px] opacity-0"}`}
    >
      <div className="bg-black p-6 rounded-b-xl flex lg:hidden flex-col gap-y-3 w-full">
        {navLinks.map((link: NavLink, i: number) => {
          const hasDropdown = !!link.dropdownLinks?.length;

          return (
            <div key={link.id} className="w-full">
              {hasDropdown ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentDropdown((prev) => (prev === link.id ? 0 : link.id))
                  }
                  className={`w-full text-left text-white/90 hover:text-white text-xl group flex items-center`}
                  style={{ transitionDelay: `${i * 200 + 500}ms` }}
                >
                  <span>{link.text}</span>
                  <ChevronUp
                    className={`ml-2 h-5 w-5 transition-transform ${
                      currentDropdown === link.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={absPath(link.to)}
                  onClick={() => {
                    setCurrentDropdown(0);
                    toggleNav();
                  }}
                  className={`text-white/90 hover:text-white text-start text-xl group cursor-pointer primary-link transition-all duration-500`}
                  style={{ transitionDelay: `${i * 200 + 500}ms` }}
                >
                  {link.text}
                </Link>
              )}

              {hasDropdown && (
                <div
                  className={`flex flex-col w-full gap-y-3 px-6 overflow-hidden transition-all
                    ${currentDropdown === link.id ? "opacity-100 py-3 max-h-[1000px]" : "opacity-0 max-h-0"}`}
                >
                  {link.dropdownLinks!.map((dropdownLink: DropdownLink, j: number) => {
                    const Icon = dropdownLink.icon;
                    const href = joinPath(link.to, dropdownLink.to);

                    return (
                      <Link
                        key={dropdownLink.id}
                        href={href}
                        onClick={() => {
                          setCurrentDropdown(0);
                          toggleNav();
                        }}
                        className="flex items-center gap-2 text-white/90 hover:text-white text-start text-lg group cursor-pointer transition-all"
                        style={{ transitionDelay: `${j * 100 + 250}ms` }}
                      >
                        <Icon className="w-5 h-5 mt-[2px] text-cyan-300" />
                        <span>{dropdownLink.headline}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinksMobile;
