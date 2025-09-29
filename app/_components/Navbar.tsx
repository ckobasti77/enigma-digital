"use client";

import React, { useCallback, useEffect, useState } from "react";
import Burger from "./Burger";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";
import Link from "next/link";

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
      className={`fixed top-0 left-0 ${scrollPos <= 0 ? 'bg-transparent' : 'bg-blur'} w-full z-50 transition-transform duration-300 ${
        showNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`w-full py-4 px-6 xl:px-20 flex items-center justify-between transition-colors ${
          navOpen ? "bg-black" : "bg-transparent"
        }`}
      >
        <Link
          href='/'
          style={{ fontFamily: "var(--font-deltha)" }}
          className="text-3xl font-deltha relative font-bold bg-gradient-to-r from-blue-500 to-pink-400 bg-clip-text text-transparent inline-block"
        >
          ENIGMA{" "}
          <span
            style={{ fontFamily: "var(--font-deltha)" }}
            className="absolute -bottom-1 text-sm -right-3 font-deltha font-black text-white"
          >
            digital
          </span>
        </Link>

        <Burger toggleNav={toggleNav} navOpen={navOpen} />
        <NavLinks
          setCurrentDropdown={setCurrentDropdown}
          currentDropdown={currentDropdown}
        />
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
