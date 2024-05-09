import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import avatar from "../../assets/images/avatar.jpg";

const SideBar = ({ menuOpen, setMenuOpen, menuRef }) => {
  const user = useSelector((state) => state.authedUser.user);
  const { t } = useTranslation();
  return (
    <aside className={`sideMenu ${menuOpen ? "open" : ""}`} ref={menuRef}>
      <div className="user_img">
        <div className="img">
          <img src={user?.avatar || avatar} alt="user" />
        </div>
        <h6>{user?.name}</h6>
      </div>
      <ul>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="">
            <i className="fa-solid fa-user-pen"></i>
            {t("editAccount")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="categories">
            <i className="fa-solid fa-user-xmark"></i>
            {t("deleteAccount")}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
