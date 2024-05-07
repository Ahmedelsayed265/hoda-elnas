import React from "react";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.jpeg";
import pagesIcon from "../../assets/images/pages.svg";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import useTruncateString from "../../hooks/useTruncateString";
const VisualCard = ({ file, onReact }) => {
  const hasAccess = useSelector((state) => state.authedUser.access_token);
  console.log(file);
  const truncatedString = useTruncateString(file?.description);
  return (
    <div className="audio-card">
      <Link to={`/visuals/${file?.slug}`} className="img">
        <img
          src={file?.background ? `${BASE_URL}${file?.background}` : book}
          alt="course"
        />
      </Link>
      <div className="content">
        <div to={`/visuals/${file?.slug}`} className="mb-2">
          <h4>{file?.name || "عنوان الصفحة"}</h4>
        </div>
        <p className="mb-2">{truncatedString || "وصف الصفحة"}</p>
        <div className="d-flex justify-content-between">
          <p>
            <img src={pagesIcon} alt="pages" />
            <span>الصفحات: 300</span>
          </p>
          <div
            className={`likes_container justify-content-end ${
              file?.paid === true && !hasAccess ? "disabled" : ""
            }`}
          >
            <div className="likes">
              <button
                className={file?.user_reaction === "like" ? "active" : ""}
                onClick={() => onReact(file?.id, "like")}
              >
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
              <span>{file?.likes || 0}</span>
            </div>
            <div className="dislikes">
              <button
                className={file?.user_reaction === "dislike" ? "active" : ""}
                onClick={() => onReact(file?.id, "dislike")}
              >
                <i className="fa-solid fa-thumbs-down"></i>
              </button>
              <span>{file?.dislikes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualCard;
