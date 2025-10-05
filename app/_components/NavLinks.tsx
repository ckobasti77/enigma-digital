"use client";

import { navLinks } from "@/constants/navLinks";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
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

const normalize = (s: string) => s.replace(/^\/+|\/+$/g, "");
const absPath = (s: string) => (s.startsWith("/") ? s : `/${s}`);
const joinPath = (...parts: string[]) =>
  "/" + parts.filter(Boolean).map(normalize).join("/");

const NavLinks = ({ currentDropdown, setCurrentDropdown }: NavLinksProps) => {
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useGSAP(() => {
    gsap.fromTo(
      ".primary-link",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
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
          y: -10,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          display: "block",
        });
      } else {
        gsap.to(el, {
          y: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          display: "none",
        });
      }
    });
  }, [currentDropdown]);

  return (
    <div className="relative hidden items-center gap-8 xl:flex">
      {navLinks.map((link: NavLink) => {
        const isCTA = Boolean(link.cta);
        const linkClasses = clsx(
          "primary-link flex items-center gap-2 transition-colors",
          isCTA
            ? "rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 shadow-[0_12px_30px_rgba(8,47,73,0.35)]"
            : "text-xs uppercase tracking-[0.5em] font-extralight text-white/80 hover:text-white"
        );

        return (
          <div
            key={link.id}
            className="relative"
            onMouseEnter={() => link.dropdownLinks && setCurrentDropdown(link.id)}
            onMouseLeave={() => setCurrentDropdown(0)}
          >
            <Link
              style={{ fontFamily: "var(--font-aeonik)" }}
              href={absPath(link.to)}
              className={linkClasses}
            >
              <span>{link.text}</span>
              {link.dropdownLinks && (
                <ChevronDown
                  className={clsx(
                    "ml-1 mt-0.5 h-4 w-4 transition-transform",
                    currentDropdown === link.id && "rotate-180"
                  )}
                />
              )}
            </Link>

            {link.dropdownLinks && (
              <div
                //@ts-expect-error dynamic refs
                ref={(el) => (dropdownRefs.current[link.id] = el)}
                className="absolute top-full right-0 mt-2 hidden w-[720px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 pb-0.5 shadow-[0_30px_80px_rgba(8,47,73,0.45)]"
              >
                <div className="rounded-b-xl bg-slate-950">
                  <div className="grid w-full grid-cols-2 gap-4 p-4">
                    {link.dropdownLinks.map((dropdownLink: DropdownLink) => {
                      const Icon = dropdownLink.icon;
                      const href =
                        "/" + joinPath(link.to, dropdownLink.to).replace(/^\/+/, "");

                      return (
                        <Link
                          key={dropdownLink.id}
                          href={href}
                          style={{ fontFamily: "var(--font-aeonik)" }}
                          className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-white/10"
                        >
                          <Icon className="mt-1 h-6 w-6 text-cyan-300" />
                          <div>
                            <h2 className="text-[18px] text-white">
                              {dropdownLink.headline}
                            </h2>
                            <p className="text-sm font-extralight text-white/70">
                              {dropdownLink.subheadline}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
