import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Logo } from "../Logo";
import { Menu } from "../Menu";
import Button, { IconPosition } from "./Button";
import { Color } from "helpers/enums";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState(false);

  const handleClick = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden"; // Zablokuje scroll
    } else {
      document.body.style.overflow = "unset"; // Povolí scroll
    }
  };

  return (
    <nav className="flex justify-between px-4 py-3 items-center rounded-xl bg-purpleishWhiteOpacity nav mb-14 shadow-basic">
      <Link to="/">
        <Logo />
      </Link>
      <ul className="hidden md:flex gap-6">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/quiz">
          <li>Quiz</li>
        </Link>
      </ul>
      {/* Hamburger or Close Icon */}
      <div className="md:hidden z-10" onClick={handleClick}>
        {nav ? <Icon iconName="SignDoNotEnter" color="white" /> : <Menu />}
      </div>
      {/* Mobile Menu */}
      <ul
        className={`${
          nav
            ? "opacity-100 transform translate-x-0 p-4"
            : "opacity-0 transform -translate-y-full"
        } absolute top-0 text-purpleDark left-0 w-full h-screen backdrop-blur-2xl text-2xl z-50`}
        onClick={() => {
          setNav(false);
          document.body.style.overflow = "unset"; // Povolí scroll po kliknutí na položku menu
        }}
      >
        <div className="w-full flex justify-between px-4 py-3 rounded-xl bg-purpleishWhiteOpacity shadow-basic">
          <Link to="/">
            <Logo />
          </Link>
          <Button
            icon={{ iconName: "XLg" }}
            iconPosition={IconPosition.Right}
            color={Color.Red600}
            onClickButton={handleClick}
          >
            {" "}
          </Button>
        </div>

        <div className="h-[calc(100%_-_80px)] flex flex-col justify-center items-center">
          <Link to="/">
            <li className="hover:text-teal-700 text-purpleDark">Home</li>
          </Link>
          <Link to="/quiz">
            <li className="hover:text-teal-700 text-purpleDark">Quiz</li>
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
