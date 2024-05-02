import React from "react";
import { Link } from "react-router-dom";
import audioPoster from "../../assets/images/audio.jpeg";
import sound from "../../assets/images/Headphones.svg";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { setId, setSrc } from "../../redux/slices/audioSrc";

const AudioCard = ({ audio }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.audioSrc.id);
  const playSound = (file, id) => {
    if (file) {
      const decodedUrlBase64 = decodeURIComponent(file);
      const decodedUrl = atob(decodedUrlBase64);
      dispatch(setSrc(`${BASE_URL}${decodedUrl}`));
      dispatch(setId(id));
    }
  };

  const stopSound = () => {
    dispatch(setSrc(""));
    dispatch(setId(""));
  };

  return (
    <div className="audio-card">
      <Link className="img">
        <img
          src={
            audio?.background ? `${BASE_URL}${audio?.background}` : audioPoster
          }
          alt="course"
        />
      </Link>
      <div className="content">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Link>
            <h4>{audio?.name || "عنوان الصوت"}</h4>
          </Link>
          {id === audio?.id ? (
            <div className="play_btn" onClick={stopSound}>
              <i className="fa-duotone fa-pause"></i>
            </div>
          ) : (
            <div
              className="play_btn"
              onClick={() => playSound(audio?.file, audio?.id)}
            >
              <i className="fa-duotone fa-play"></i>
            </div>
          )}
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
