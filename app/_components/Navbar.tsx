"use client";

import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import Burger from "./Burger";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";
import LogoMark3D from "./LogoMark3D";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [currentDropdown, setCurrentDropdown] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > scrollPos) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setScrollPos(currentScrollPos);
      setNavOpen(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollPos]);

  const toggleNav = useCallback(() => {
    setNavOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!navOpen) setCurrentDropdown(0);
  }, [navOpen]);

  return (
    <div
      className={clsx(
        "fixed left-0 top-0 z-50 w-full transition-transform duration-300",
        scrollPos <= 0 ? "bg-transparent" : "bg-blur",
        showNav ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 transition-colors",
          navOpen ? "bg-black/90" : "bg-transparent"
        )}
      >
        <Link
          href="/"
          style={{ fontFamily: "var(--font-deltha)" }}
          className="relative inline-flex items-center gap-3 text-3xl font-deltha font-bold bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent"
        >
          {/* ENIGMA{" "}
          <span
            style={{ fontFamily: "var(--font-deltha)" }}
            className="absolute -bottom-1 -right-3 text-sm font-deltha font-black text-white"
          >
            digital
          </span> */}

          {/* <EnigmaLogo /> */}
          <LogoMark3D />
          <Image
            src={
              theme === "dark"
                ? "/assets/logo-text-dark.png"
                : "/assets/logo-text-light.png"
            }
            alt="Enigma Digital logotype"
            width={100}
            height={100}
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6">
          <NavLinks
            setCurrentDropdown={setCurrentDropdown}
            currentDropdown={currentDropdown}
          />
          <ThemeSwitcher />
          <Burger toggleNav={toggleNav} navOpen={navOpen} />
        </div>
      </div>

      <NavLinksMobile
        setCurrentDropdown={setCurrentDropdown}
        currentDropdown={currentDropdown}
        toggleNav={toggleNav}
        navOpen={navOpen}
      />
    </div>
  );
};

export default Navbar;
