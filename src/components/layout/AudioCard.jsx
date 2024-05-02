import React from "react";
import { Link } from "react-router-dom";
import audioPoster from "../../assets/images/audio.jpeg";
import sound from "../../assets/images/Headphones.svg";
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { setSrc } from "../../redux/slices/audioSrc";

const AudioCard = ({ audio }) => {
  const dispatch = useDispatch();
  const playSound = (file) => {
    if (file) {
      const decodedUrlBase64 = decodeURIComponent(file);
      const decodedUrl = atob(decodedUrlBase64);
      dispatch(setSrc(`${BASE_URL}${decodedUrl}`));
    }
  };
  return (
    <div className="audio-card">
      <Link to="/courses/1" className="img">
        <img
          src={
            audio?.background ? `${BASE_URL}${audio?.background}` : audioPoster
          }
          alt="course"
        />
      </Link>
      <div className="content">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link to="/courses/1">
            <h4>{audio?.name || "عنوان الصوت"}</h4>
          </Link>
          <div className="play_btn" onClick={() => playSound(audio?.file)}>
            <i className="fa-duotone fa-play"></i>
          </div>
        </div>
        <p>{audio?.description || "وصف الصوت"}</p>
        <p>
          <img src={sound} alt="sound" />
          <span>{audio?.length || "00:00:00"}</span>
        </p>
      </div>
    </div>
  );
};

export default AudioCard;
