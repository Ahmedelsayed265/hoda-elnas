import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import home from "../../assets/images/home.svg";
import list from "../../assets/images/list.svg";
import deps from "../../assets/images/grid.svg";
import lib from "../../assets/images/lib.svg";
import myLists from "../../assets/images/myLists.svg";

const SideBar = ({ menuOpen, setMenuOpen, menuRef }) => {
  const { t } = useTranslation();
  return (
    <aside className={`sideMenu ${menuOpen ? "open" : ""}`} ref={menuRef}>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="">
            <img src={home} alt="home" />
            {t("dashboard.home")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="categories">
            <img src={deps} alt="departments" />
            {t("sounds.departments")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="playlists">
            <img src={list} alt="playlists" />
            {t("sounds.playLists")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="my-library">
            <img src={lib} alt="library" />
            {t("sounds.library")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="my-playlists">
            <img src={myLists} alt="myLists" />
            {t("sounds.myLists")}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
