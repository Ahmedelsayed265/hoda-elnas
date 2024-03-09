import React from "react";
import { Link } from "react-router-dom";
import thumb from "../../assets/images/quranIcon.png";

const SectionHeader = () => {
  return (
    <section className="section-header">
      <div className="container">
        <div className="content">
          <h1>الكورسات</h1>
          <p>
            <Link to="/">الرئيسية</Link> / <span>الكورسات</span>
          </p>
        </div>
        <div className="thunb">
          <img src={thumb} alt="thumb" />
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
