import React, { useRef, useState } from "react";
import StarsList from "./StarsList";
import waves from "../../assets/images/waves.svg";
import { BASE_URL } from "../../constants";

const TestimonialCard = ({ feedback }) => {
  const [play, setPlay] = useState(false);
  const audio = useRef();

  const togglePlay = () => {
    if (audio.current.paused) {
      audio.current.play();
      setPlay(true);
    } else {
      audio.current.pause();
      audio.current.currentTime = 0;
      setPlay(false);
    }
  };

  const handleAudioEnd = () => {
    setPlay(false);
  };

  return (
    <div className="testimonial_card">
      <div className="sound">
        <div className="img">
          <img src={waves} alt="sound" />
        </div>
        <div className="play_btn" onClick={togglePlay}>
          {play ? (
            <i className="fa-duotone fa-pause"></i>
          ) : (
            <i className="fa-duotone fa-play"></i>
          )}
        </div>
      </div>
      <p>{feedback?.title}</p>
      <StarsList rate={feedback?.rate} />
      <audio ref={audio} className="hidden_audio" onEnded={handleAudioEnd}>
        <source src={`${BASE_URL}${feedback?.review}`} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default TestimonialCard;
