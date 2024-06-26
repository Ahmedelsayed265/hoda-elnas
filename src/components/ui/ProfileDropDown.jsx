import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ProfileDropDown = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const variants = {
    open: {
      display: "block"
    },
    closed: {
      display: "none"
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdownButton = event.target.closest(".profile");
      if (!isDropdownButton) {
        setIsOpen(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpen, dropdownRef]);
  return (
    <motion.div
      variants={variants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit="closed"
      className="drop_menu"
    >
      <ul>
        <li className="nav_link">
          <NavLink to="/profile">
            <i className="fa-light fa-circle-user"></i> {t("personalProfile")}
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/my-students">
            <i className="fa-light fa-user-group"></i> {t("students")}
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/my-courses">
            <i className="fa-regular fa-tv"></i> {t("myCourses")}
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/my-subscriptions">
            <i className="fa-sharp fa-light fa-folder-open"></i>{" "}
            {t("mySubscriptions")}
          </NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/logout">
            <i className="fa-regular fa-arrow-right-from-bracket"></i>{" "}
            {t("logout")}
          </NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default ProfileDropDown;
