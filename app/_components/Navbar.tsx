"use client";

import { Menu } from "lucide-react";
import React, { useCallback, useState } from "react";
import Burger from "./Burger";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = useCallback(() => {
    setNavOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="w-full py-4 px-6 flex justify-between bg-transparent">
        <img src="/./assets/logo.png" alt="logo" height={0} width={200} />
        <Burger toggleNav={toggleNav} navOpen={navOpen} />
        <NavLinks />
      </div>
      <NavLinksMobile toggleNav={toggleNav} navOpen={navOpen} />
    </>
  );
};

export default Navbar;
