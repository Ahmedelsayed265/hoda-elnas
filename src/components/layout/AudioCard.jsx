import React from "react";
import { Link } from "react-router-dom";
import audioPoster from "../../assets/images/audio.jpeg";
import sound from "../../assets/images/Headphones.svg";

const AudioCard = () => {
  return (
    <div className="audio-card">
      <Link to="/courses/1" className="img">
        <img src={audioPoster} alt="course" />
      </Link>
      <div className="content">
        <div className="d-flex qlign-items-center justify-content-between">
          <Link to="/courses/1">
            <h4>تفسير القران الكريم</h4>
          </Link>
          <div className="play_btn">
            <i className="fa-duotone fa-play"></i>
          </div>
        </div>
        <p>بصوت الشيخ وليث الريان</p>
        <p>
          <img src={sound} alt="sound" />
          <span>20 دقيقة</span>
        </p>
      </div>
    </div>
  );
};

export default AudioCard;
