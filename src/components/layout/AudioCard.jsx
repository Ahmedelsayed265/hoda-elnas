import React from "react";
import { Link } from "react-router-dom";
import audioPoster from "../../assets/images/audio.jpeg";
import sound from "../../assets/images/Headphones.svg";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setId,
  setIsPlaying,
  setName,
  setSrc
} from "../../redux/slices/audioSrc";
import { useTranslation } from "react-i18next";
import useTruncateString from "../../hooks/useTruncateString";

const AudioCard = ({ audio }) => {
  const truncatedString = useTruncateString(audio?.description);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const id = useSelector((state) => state.audioSrc.id);
  const isPlaying = useSelector((state) => state.audioSrc.isPlaying);

  const playSound = (file, id) => {
    if (file) {
      const decodedUrlBase64 = decodeURIComponent(file);
      const decodedUrl = atob(decodedUrlBase64);
      dispatch(setSrc(`${BASE_URL}${decodedUrl}`));
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
      <div className="img">
        <img
          src={
            audio?.background ? `${BASE_URL}${audio?.background}` : audioPoster
          }
          alt="course"
        />
        {audio?.paid === true && (
          <Link to="/library-subscribe" className="subscribe">
            {t("sounds.subscribeNow")}
          </Link>
        )}
      </div>
      <div className="content">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link to={`/audios/${audio?.id}`}>
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
        <div className="d-flex align-items-center justify-content-between mt-2">
          <p>
            <img src={sound} alt="sound" />
            <span>{audio?.length || "00:00:00"}</span>
          </p>
          <div
            className={`likes_container ${
              audio?.paid === true ? "disabled" : ""
            }`}
          >
            <div className="likes">
              <button>
                <i className="fa-solid fa-thumbs-up"></i>
              </button>
              <span>{audio?.likes || 0}</span>
            </div>
            <div className="dislikes">
              <button>
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
