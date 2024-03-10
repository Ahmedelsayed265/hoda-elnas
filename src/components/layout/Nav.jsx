import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setLanguage } from "../../redux/slices/language";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import NavDropDown from "../ui/NavDropDown";
import langIcon from "../../assets/images/lang.svg";
import logo from "../../assets/images/logo.png";
import avatar from "../../assets/images/user.png";
import ProfileDropDown from "../ui/ProfileDropDown";

const Nav = () => {
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const [isTogglerActive, setIsTogglerActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
          <div className="d-flex align-items-center gap-3">
            <button className="lang_toggler" onClick={handleLang}>
              {lang === "ar" ? "English" : "العربية"}
              <img src={langIcon} alt="lang" />
            </button>
            <div
              className="menu-btn"
              onClick={() => setIsTogglerActive(!isTogglerActive)}
            >
              <div
                className={`menu-bar ${isTogglerActive ? "active" : ""}`}
              ></div>
            </div>
          </div>
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
                to="/subscriptions"
                onClick={() => setIsTogglerActive(false)}
              >
                {t("subscriptions")}
              </NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/visuals" onClick={() => setIsTogglerActive(false)}>
                {t("visuals")}
              </NavLink>
            </li>
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
            {logged === true && (
              <>
                <li className="nav_link hide-lg">
                  <NavLink
                    to="/profile"
                    onClick={() => setIsTogglerActive(false)}
                  >
                    {t("personalProfile")}
                  </NavLink>
                </li>
                <li className="nav_link hide-lg">
                  <NavLink
                    to="/logout"
                    onClick={() => setIsTogglerActive(false)}
                  >
                    {t("logout")}
                  </NavLink>
                </li>
              </>
            )}
            <li key="more" className="nav_link">
              <div className="drop" onClick={() => setIsOpen(!isOpen)}>
                {t("more")} <i className="far fa-angle-down"></i>
              </div>
              <NavDropDown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setIsTogglerActive={setIsTogglerActive}
              />
            </li>
          </ul>
        </div>
        <div className="utils">
          <ul>
            {logged === false && (
              <>
                <li>
                  <Link to="/login">{t("login")}</Link>
                </li>
                <li>|</li>
                <li>
                  <Link to="/register">{t("register")}</Link>
                </li>
              </>
            )}
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
              <div className="search_btn">
                <i className="far fa-search"></i>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
