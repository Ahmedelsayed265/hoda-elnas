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
          <NavLink end to="coupons">
            <i className="fa-solid fa-ticket-simple"></i>
            {t("coupons")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="share-with-friend">
            <i className="fa-sharp fa-solid fa-share"></i>
            {t("shareFriend")}
          </NavLink>
        </li>
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to="/logout">
            <i className="fa-regular fa-arrow-right-from-bracket"></i>
            {t("logout")}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
