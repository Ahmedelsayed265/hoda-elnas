import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import audioPoster from "../../assets/images/audio.jpeg";
import sound from "../../assets/images/Headphones.svg";
import useTruncateString from "../../hooks/useTruncateString";
import {
  setId,
  setIsPlaying,
  setName,
  setSrc
} from "../../redux/slices/audioSrc";

const AudioCard = ({ audio, onReact, hasRemoveBtn, onRemove }) => {
  const truncatedString = useTruncateString(audio?.description);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const id = useSelector((state) => state.audioSrc.id);
  const isPlaying = useSelector((state) => state.audioSrc.isPlaying);
  const hasAccess = useSelector((state) => state.authedUser.access_token);

  const playSound = (file, id) => {
    if (file) {
      const decodedUrlBase64 = decodeURIComponent(file);
      const decodedUrl = atob(decodedUrlBase64);
      dispatch(setSrc(decodedUrl));
      dispatch(setId(id));
      dispatch(setIsPlaying(true));
      dispatch(setName(audio?.name));
    }
  };

  const stopSound = () => {
    dispatch(setSrc(""));
    dispatch(setId(""));
  };

  return (
    <div className="audio-card">
      <Link to={`/audios/${audio?.slug}`} className="img">
        <img
          src={audio?.background ? audio?.background : audioPoster}
          alt="course"
        />
        {audio?.paid === true && (
          <Link to="/library-subscribe" className="subscribe">
            {t("sounds.subscribeNow")}
          </Link>
        )}
        {hasRemoveBtn && (
          <Link className="remove" onClick={() => onRemove(audio?.id)}>
            <i className="fa-solid fa-trash-xmark"></i>
          </Link>
        )}
      </Link>
      <div className="content">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link to={`/audios/${audio?.slug}`}>
            <h4>{audio?.name || "عنوان الصوت"}</h4>
          </Link>
          {id === audio?.id && isPlaying === true ? (
            <div className="play_btn" onClick={stopSound}>
              <i className="fa-duotone fa-pause"></i>
            </div>
          ) : (
            <div
              className={`play_btn ${audio?.paid === true ? "lock" : ""}`}
              onClick={() => playSound(audio?.file, audio?.id)}
            >
              {audio?.paid === true ? (
                <i className="fa-sharp fa-solid fa-lock"></i>
              ) : (
                <i className="fa-duotone fa-play"></i>
              )}
            </div>
          )}
        </div>
        <p>{truncatedString || "وصف الصوت"}</p>
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <p>
            <img src={sound} alt="sound" />
            <span>{audio?.length || "00:00:00"}</span>
          </p>
          <div
            className={`likes_container ${
              audio?.paid === true || !hasAccess ? "disabled" : ""
            }`}
          >
            <div className="likes">
              <button
                className={
                  audio?.user_reaction === "like" && hasAccess ? "active" : ""
                }
                onClick={() => onReact(audio?.id, "like")}
              >
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
              <span>{audio?.likes || 0}</span>
            </div>
            <div className="dislikes">
              <button
                className={
                  audio?.user_reaction === "dislike" && hasAccess
                    ? "active"
                    : ""
                }
                onClick={() => onReact(audio?.id, "dislike")}
              >
                <i className="fa-solid fa-thumbs-down"></i>
              </button>
              <span>{audio?.dislikes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
