"use client";

import { Menu } from "lucide-react";
import React, { useCallback, useState } from "react";
import Burger from "./Burger";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState(0);

  const toggleNav = useCallback(() => {
    setNavOpen((prev) => !prev);

    if (navOpen && currentDropdown !== 0) setCurrentDropdown(0);
  }, []);

  return (
    <>
      <div className="w-full py-4 px-6 xl:px-20 flex items-center justify-between bg-transparent">
        {/* <img src="/./assets/logo.png" alt="logo" height={0} width={200} /> */}
        <h1 style={{ fontFamily: "var(--font-deltha)" }} className="text-3xl font-deltha relative font-bold bg-gradient-to-r from-blue-500 to-pink-400  bg-clip-text text-transparent inline-block">ENIGMA <span style={{ fontFamily: "var(--font-deltha)" }} className="absolute -bottom-1 text-sm -right-3 font-deltha font-black text-white">digital</span></h1>
        
        <Burger toggleNav={toggleNav} navOpen={navOpen} />
        <NavLinks />
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
