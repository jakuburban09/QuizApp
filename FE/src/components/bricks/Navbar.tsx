import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Icon } from "./Icon";
import { Logo } from "../Logo";
import { MenuIcon } from "../MenuIcon";
import Button, { IconPosition } from "./Button";
import { Color } from "helpers/enums";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [nav, setNav] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { i18n } = useTranslation();

  const handleClick = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = "hidden"; // Zablokuje scroll
    } else {
      document.body.style.overflow = "unset"; // Povolí scroll
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    console.log(lng);
    const pathParts = location.pathname.split("/");
    pathParts[1] = lng; // Change the language part of the URL
    const newPath = pathParts.join("/");
    history.push(newPath);
  };

  const currentLanguage = i18n.language;

  const generateLink = (path: string) => {
    const pathParts = location.pathname.split("/");
    pathParts[1] = currentLanguage; // Set the language part of the URL
    return `/${currentLanguage}${path}`;
  };

  return (
    <nav className="flex justify-between px-4 py-3 items-center rounded-xl bg-purpleishWhiteOpacity nav mb-14 shadow-basic">
      <Link to={generateLink("/")}>
        <Logo />
      </Link>
      <ul className="hidden md:flex gap-6 items-center">
        <Link to={generateLink("/")}>
          <li>{t("navbar.home")}</li>
        </Link>
        <Link to={generateLink("/quiz")}>
          <li>{t("navbar.quizzes")}</li>
        </Link>
        <Link to={generateLink("/createQuiz")}>
          <li>{t("navbar.createQuiz")}</li>
        </Link>
        <Link to={generateLink("/login")}>
          <li>{t("navbar.login")}</li>
        </Link>
        <Link to={generateLink("/register")}>
          <li>{t("navbar.register")}</li>
        </Link>
        {currentLanguage === "en" ? (
          <Button
            onClickButton={() => changeLanguage("cs")}
            hiearchy="secondary"
            className="w-auto"
          >
            <ReactCountryFlag countryCode="CZ" />
          </Button>
        ) : (
          <Button
            onClickButton={() => changeLanguage("en")}
            hiearchy="secondary"
            className="w-auto"
          >
            <ReactCountryFlag countryCode="US" />
          </Button>
        )}
      </ul>
      {/* Hamburger or Close Icon */}
      <div className="md:hidden z-10">
        {nav ? (
          <Icon iconName="SignDoNotEnter" color="white" />
        ) : (
          <div className="flex gap-2">
            {currentLanguage === "en" ? (
              <Button
                onClickButton={() => changeLanguage("cs")}
                hiearchy="tertiaty"
                color={Color.Transparent}
                className="w-auto p-2"
              >
                <ReactCountryFlag style={{ fontSize: 24 }} countryCode="CZ" />
              </Button>
            ) : (
              <Button
                onClickButton={() => changeLanguage("en")}
                hiearchy="tertiaty"
                color={Color.Transparent}
                className="w-auto p-2"
              >
                <ReactCountryFlag style={{ fontSize: 24 }} countryCode="US" />
              </Button>
            )}
            <Button
              onClickButton={() => handleClick()}
              color={Color.Transparent}
              className="p-0"
            >
              <MenuIcon />
            </Button>
          </div>
        )}
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
          <Link to={generateLink("/")}>
            <Logo />
          </Link>
          <div></div>
          <div className="flex gap-2">
            {currentLanguage === "en" ? (
              <Button
                onClickButton={() => changeLanguage("cs")}
                hiearchy="tertiaty"
                color={Color.Transparent}
                className="w-auto p-2"
              >
                <ReactCountryFlag style={{ fontSize: 24 }} countryCode="CZ" />
              </Button>
            ) : (
              <Button
                onClickButton={() => changeLanguage("en")}
                hiearchy="tertiaty"
                color={Color.Transparent}
                className="w-auto p-2"
              >
                <ReactCountryFlag style={{ fontSize: 24 }} countryCode="US" />
              </Button>
            )}
            <Button
              icon={{ iconName: "XLg" }}
              iconPosition={IconPosition.Right}
              color={Color.Red600}
              onClickButton={handleClick}
              className="w-auto px-[14px] py-3"
            >
              {" "}
            </Button>
          </div>
        </div>

        <div className="h-[calc(100%_-_80px)] flex flex-col justify-center items-center">
          <Link to={generateLink("/")}>
            <li className="hover:text-teal-700 text-purpleDark">
              {t("navbar.home")}
            </li>
          </Link>
          <Link to={generateLink("/quiz")}>
            <li className="hover:text-teal-700 text-purpleDark">
              {t("navbar.quizzes")}
            </li>
          </Link>
          <Link to={generateLink("/createQuiz")}>
            <li>{t("navbar.createQuiz")}</li>
          </Link>
          <Link to={generateLink("/login")}>
          <li>{t("navbar.login")}</li>
        </Link>
        <Link to={generateLink("/register")}>
          <li>{t("navbar.register")}</li>
        </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
