import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavDropDown = ({ isOpen, setIsOpen }) => {
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
          <NavLink to="/students">الطلاب</NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/settings">الإعدادات</NavLink>
        </li>
        <li className="nav_link">
          <NavLink to="/jobs">الوظائف</NavLink>
        </li>
      </ul>
    </motion.div>
  );
};

export default NavDropDown;
