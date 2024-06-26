import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/settings/SideBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditAccount from "../components/settings/EditAccount";
import { useCookies } from "react-cookie";
import Coupons from "../components/settings/Coupons";
import ShareWithFriend from './../components/settings/ShareWithFriend';

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOpenMenuBtn = event.target.closest(".open_menu");
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !isOpenMenuBtn
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="profile_sec">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-3 col-md-4 col-6 p-lg-2 p-0">
            <SideBar
              menuOpen={menuOpen}
              menuRef={menuRef}
              setMenuOpen={setMenuOpen}
            />
          </div>
          <div className="col-lg-9 col-12 p-2">
            <Routes>
              <Route path="/" element={<EditAccount />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/share-with-friend" element={<ShareWithFriend />} />
            </Routes>
          </div>
        </div>
        <button className="open_menu" onClick={toggleMenu}>
          <i className="fa-light fa-bars"></i>
        </button>
      </div>
    </section>
  );
};

export default Profile;
