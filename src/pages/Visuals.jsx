import React, { useEffect, useRef, useState } from "react";
import SideBar from "../components/Visuals/SideBar";
import { Route, Routes } from "react-router-dom";
import RecentVisuals from "../components/Visuals/RecentVisuals";
import Categories from "./../components/Visuals/Categories";
import Category from "../components/Visuals/Category";
import PlayLists from "../components/Visuals/PlayLists";
import Visual from "../components/Visuals/Visual";
import PlayList from "../components/Visuals/PlayList";
import Favourites from "../components/Visuals/Favourites";
import MyLists from "../components/Visuals/MyLists";
import MyList from "../components/Visuals/MyList";
import VisualContent from "../components/Visuals/VisualContent";

const Visuals = () => {
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
    <section className="library_section">
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
              <Route path="/" element={<RecentVisuals />} />
              <Route path="/:slug" element={<Visual />} />
              <Route path="/:slug/view-content" element={<VisualContent />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:slug" element={<Category />} />
              <Route path="/playlists/*" element={<PlayLists />} />
              <Route path="/playlists/:slug" element={<PlayList />} />
              <Route path="/my-library" element={<Favourites />} />
              <Route path="/my-playlists/*" element={<MyLists />} />
              <Route path="/my-playlists/:id" element={<MyList />} />
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

export default Visuals;
