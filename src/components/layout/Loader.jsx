import React from "react";
import fav from "../../assets/images/fav.svg";
const Loader = () => {
  return (
    <div className="loader">
      <img src={fav} alt="fav" />
      <span></span>
    </div>
  );
};

export default Loader;
