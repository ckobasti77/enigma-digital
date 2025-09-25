import React from "react";

type BurgerProps = {
  navOpen: boolean;
  toggleNav: () => void; // funkcija koja ne prima argumente i ne vraća ništa
};

const Burger = ({
  navOpen,
  toggleNav,
}: BurgerProps) => {
  return (
    <div
      onClick={toggleNav}
      className={`visible scale-[.6] xl:hidden w-[50px] center cursor-pointer before:content-[''] before:duration-500 before:my-[7px] before:rounded-[3px] before:h-[7px] before:block before:bg-white after:content-[''] after:duration-500 after:my-[7px] after:rounded-[3px] after:h-[7px] after:block after:bg-white transform peer ${
        navOpen
          ? "before:translate-y-[14.5px] before:rotate-[135deg] after:-translate-y-[13px] after:-rotate-[135deg]"
          : "before:translate-y-[0px] before:rotate-[0deg] after:translate-y-[0px] after:rotate-[0deg]"
      }`}
    >
      <div
        className={`duration-500 my-[7px] rounded-[3px] h-[7px] block bg-white ${
          navOpen && "transform scale-0"
        }`}
      ></div>
    </div>
  );
};

export default Burger;