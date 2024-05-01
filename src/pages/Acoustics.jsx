import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/sounds/SideBar";
import { Route, Routes } from "react-router-dom";
import RecentSounds from "../components/sounds/RecentSounds";
import PlayLists from "../components/sounds/PlayLists";
import Categories from "../components/sounds/Categories";
import MyLibirary from "../components/sounds/MyLibirary";
import MyPlayLists from "../components/sounds/MyPlayLists";

const Acoustics = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <section className="acoustics">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <SideBar
              menuOpen={menuOpen}
              menuRef={menuRef}
              setMenuOpen={setMenuOpen}
            />
          </div>
          <div className="col-lg-9 col-12 p-2">
            <Routes>
              <Route path="*" element={<RecentSounds />} />
              <Route path="/departments" element={<Categories />} />
              <Route path="/playlists" element={<PlayLists />} />
              <Route path="/my-library" element={<MyLibirary />} />
              <Route path="/my-playlists" element={<MyPlayLists />} />
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

export default Acoustics;
