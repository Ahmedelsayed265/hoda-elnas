import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NavDropDown = ({ isOpen, setIsOpen }) => {
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
      const isDropdownButton = event.target.closest(".drop");
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
          <NavLink to="/students">{t("students")}</NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/settings">{t("settings")}</NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/jobs">{t("jobs")}</NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default NavDropDown;
