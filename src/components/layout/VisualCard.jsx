import React from "react";
import { Link } from "react-router-dom";
import book from "../../assets/images/book.jpeg";
import pagesIcon from "../../assets/images/pages.svg";
import { useSelector } from "react-redux";
import useTruncateString from "../../hooks/useTruncateString";
import videoIcon from "../../assets/images/video.svg";
import { useTranslation } from "react-i18next";
const VisualCard = ({ file, onReact, hasRemoveBtn, onRemove }) => {
  const { t } = useTranslation();
  const truncatedString = useTruncateString(file?.description);
  const hasAccess = useSelector((state) => state.authedUser.access_token);

  return (
    <div className="audio-card">
      <Link to={`/visuals/${file?.slug}`} className="img">
        <img src={file?.background ? file?.background : book} alt="course" />
        {file?.paid === true && (
          <Link to="/library-subscribe" className="subscribe">
            {t("sounds.subscribeNow")}
          </Link>
        )}
        {hasRemoveBtn && (
          <Link className="remove" onClick={() => onRemove(file?.id)}>
            <i className="fa-solid fa-trash-xmark"></i>
          </Link>
        )}
      </Link>
      <div className="content">
        <div to={`/visuals/${file?.slug}`} className="mb-2">
          <h4>{file?.name || "عنوان الصفحة"}</h4>
        </div>
        <p className="mb-2">{truncatedString || "وصف الصفحة"}</p>
        <div className="d-flex justify-content-between">
          <p>
            {file?.type === "PDF" ? (
              <img src={pagesIcon} alt="pages" />
            ) : (
              <img src={videoIcon} alt="pages" />
            )}
            {file?.type === "PDF" ? (
              <span>
                {t("sounds.pages")}: {file?.length || "0"}
              </span>
            ) : (
              <span>
                {t("sounds.videoDuration")}: {file?.length || "00:00:00"}
              </span>
            )}
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
