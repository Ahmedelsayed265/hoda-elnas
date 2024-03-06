import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Nav = () => {
  const header = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) {
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

  return (
    <header ref={header}>
      <nav className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav_links">
          <ul>
            <li className="nav_link">
              <NavLink to="/" end>
                الرئيسية
              </NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/courses">الكورسات</NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/subscriptions">الاشتركات</NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/promotions">المرقيات</NavLink>
            </li>
            <li className="nav_link">
              <div className="drop">
                المزيد <i className="fa-regular fa-angle-down"></i>
              </div>
            </li>
          </ul>
        </div>
        <div className="utils">
          <ul>
            <li>
              <Link to="/login">تسجيل الدخول</Link>
            </li>
            <li>|</li>
            <li>
              <Link to="/register"> إنشاء حساب</Link>
            </li>
            <li>
              <div className="search_btn">
                <i className="fa-regular fa-magnifying-glass"></i>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
