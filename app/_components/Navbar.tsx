"use client";

import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Burger from "./Burger";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [currentDropdown, setCurrentDropdown] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > scrollPos) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setScrollPos(currentScrollPos);
      setCurrentDropdown(0);
      setNavOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollPos]);

  const toggleNav = useCallback(() => {
    if (navOpen) {
      setCurrentDropdown(0);
    }
    setNavOpen((prev) => !prev);
  }, [navOpen]);

  return (
    <>
      <div
        className={clsx(
          "fixed left-0 top-0 z-50 w-full transition-transform duration-300",
          scrollPos <= 0 ? "bg-transparent" : "bg-blur",
          showNav ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="relative inline-flex items-center"
            aria-label="Enigma Code početna"
          >
            <span className="relative block h-9 w-[9.5rem] overflow-hidden sm:h-10 sm:w-[10.5rem]">
              <Image
                src="/logo-horizontal.png"
                alt="Enigma Code"
                fill
                priority
                sizes="168px"
                className="object-contain scale-[2.45]"
              />
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <NavLinks
              setCurrentDropdown={setCurrentDropdown}
              currentDropdown={currentDropdown}
            />
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Burger toggleNav={toggleNav} navOpen={navOpen} />
          </div>
        </div>
      </div>

      <NavLinksMobile
        setCurrentDropdown={setCurrentDropdown}
        currentDropdown={currentDropdown}
        toggleNav={toggleNav}
        navOpen={navOpen}
      />
    </>
  );
};

export default Navbar;
