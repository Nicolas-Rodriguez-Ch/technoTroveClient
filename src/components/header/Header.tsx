import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { banner } from "../../assets/images";

const Header = () => {
  return (
    <main className="bg-custom-blue text-custom-mint p-4 flex justify-between">
      <section className="flex gap-1 md:gap-4 items-center">
        <img
          className="w-[100px] md:w-[150px]"
          src={banner}
          alt="Techno Trove"
        />
        <h1 className="text-lg md:text-3xl">Techno Trove</h1>
      </section>
      <section>
        <GiHamburgerMenu />
      </section>
    </main>
  );
};

export default Header;
