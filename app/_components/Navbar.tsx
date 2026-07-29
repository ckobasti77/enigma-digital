"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Burger from "./Burger";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { siteEdgeGutterClass } from "./siteEdgeGutter";
import SocialDropdown from "./SocialDropdown";

const Navbar = () => {
  const [showNav, setShowNav] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState(0);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const updateNavigationState = () => {
      const currentScrollPos = window.scrollY;
      const nextScrolled = currentScrollPos > 0;
      const shouldShowNav =
        currentScrollPos <= lastScrollYRef.current || currentScrollPos < 8;

      setShowNav((current) =>
        current === shouldShowNav ? current : shouldShowNav
      );
      setIsScrolled((current) =>
        current === nextScrolled ? current : nextScrolled
      );

      if (currentScrollPos !== lastScrollYRef.current) {
        setCurrentDropdown((current) => (current === 0 ? current : 0));
        setNavOpen((current) => (current ? false : current));
      }

      lastScrollYRef.current = currentScrollPos;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      rafRef.current = window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

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
          siteEdgeGutterClass,
          isScrolled ? "bg-blur" : "bg-transparent",
          showNav ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="mx-auto flex w-full items-center justify-between px-[var(--site-edge-gutter)] py-4">
          <Link
            href="/"
            className="relative inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            aria-label="Enigma IT početna"
          >
            <Image
              src="/logos/logo-emblem.png"
              alt="Enigma IT emblem"
              className="h-auto w-[40px] drop-shadow-[0_0_16px_rgba(0,183,255,0.26)] sm:w-[46px] lg:w-[52px]"
              width={1024}
              height={1024}
              priority
              sizes="(min-width: 1024px) 52px, (min-width: 640px) 46px, 40px"
              style={{ height: "auto" }}
            />
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-6">
            <NavLinks
              setCurrentDropdown={setCurrentDropdown}
              currentDropdown={currentDropdown}
            />
            <SocialDropdown />
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
