import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setLanguage } from "../../redux/slices/language";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import langIcon from "../../assets/images/lang.svg";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/avatar.jpg";
import ProfileDropDown from "../ui/ProfileDropDown";

const Nav = () => {
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const [isTogglerActive, setIsTogglerActive] = useState(false);
  const header = useRef(null);
  const { t } = useTranslation();

  const logged = useSelector((state) => state.authedUser.logged);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.current.classList.add("sticky");
      } else {
        header.current.classList.remove("sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLang = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    dispatch(setLanguage(newLang));
    i18next.changeLanguage(newLang);
    document.querySelector("body").classList.toggle("en", newLang === "en");
    setIsTogglerActive(false);
  };

  return (
    <header ref={header}>
      <nav className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className={`nav_links ${isTogglerActive ? "active" : ""}`}>
          <ul>
            <li className="nav_link">
              <NavLink to="/" end onClick={() => setIsTogglerActive(false)}>
                {t("home")}
              </NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/courses" onClick={() => setIsTogglerActive(false)}>
                {t("courses")}
              </NavLink>
            </li>
            <li className="nav_link">
              <NavLink
                to="/acoustics"
                onClick={() => setIsTogglerActive(false)}
              >
                {t("audios")}
              </NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/visuals" onClick={() => setIsTogglerActive(false)}>
                {t("visuals")}
              </NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/jobs" onClick={() => setIsTogglerActive(false)}>
                {t("jobs")}
              </NavLink>
            </li>{" "}
            {logged === false && (
              <>
                <li className="nav_link hide-lg">
                  <NavLink
                    to="/login"
                    onClick={() => setIsTogglerActive(false)}
                  >
                    {t("login")}
                  </NavLink>
                </li>
                <li className="nav_link hide-lg">
                  <NavLink
                    to="/register"
                    onClick={() => setIsTogglerActive(false)}
                  >
                    {t("register")}
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="utils">
          <ul>
            {logged === false && (
              <ul className="hide-sm">
                <li>
                  <Link to="/login">{t("login")}</Link>
                </li>
                <li>|</li>
                <li>
                  <Link to="/register">{t("register")}</Link>
                </li>
              </ul>
            )}
            <li>
              <button className="lang_toggler" onClick={handleLang}>
                <span>{lang === "ar" ? "عربي" : "English"}</span>
                <img src={langIcon} alt="lang" />
              </button>
            </li>
            {logged === true && (
              <li>
                <div
                  className="profile"
                  onClick={() =>
                    setIsProfileDropDownOpen(!isProfileDropDownOpen)
                  }
                >
                  <img src={avatar} alt="user_avatar" />
                  <ProfileDropDown
                    isOpen={isProfileDropDownOpen}
                    setIsOpen={setIsProfileDropDownOpen}
                  />
                </div>
              </li>
            )}
            <li>
              <div
                className="menu-btn"
                onClick={() => setIsTogglerActive(!isTogglerActive)}
              >
                <div
                  className={`menu-bar ${isTogglerActive ? "active" : ""}`}
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
