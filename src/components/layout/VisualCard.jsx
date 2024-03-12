import React from "react";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.jpeg";
import pagesIcon from "../../assets/images/pages.svg";
const VisualCard = () => {
  return (
    <Link to="/visuals/1" className="custom-card longImg">
      <div className="img">
        <img src={book} alt="course" />
      </div>
      <div className="content">
        <div className="d-flex align-items-center justify-content-between">
          <h4>كورس صفات المؤمن</h4>
        </div>
        <p>
          <img src={pagesIcon} alt="pages" />
          <span>الصفحات: 300</span>
        </p>
      </div>
    </Link>
  );
};

export default VisualCard;
