import React, { useRef, useState, useEffect } from "react";
import StarsList from "./StarsList";
import { BASE_URL } from "../../constants";

const TestimonialCard = ({ feedback }) => {
  const [play, setPlay] = useState(false);
  const [overlayWidth, setOverlayWidth] = useState(0);
  const audio = useRef();
  const animationRef = useRef();

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const togglePlay = () => {
    if (!play) {
      audio.current.play();
      animateOverlay();
    } else {
      audio.current.pause();
      audio.current.currentTime = 0;
      setOverlayWidth(0);
      cancelAnimationFrame(animationRef.current);
    }
    setPlay(!play);
  };

  const animateOverlay = () => {
    if (!audio.current.paused) {
      const progress =
        (audio.current.currentTime / audio.current.duration) * 100;
      setOverlayWidth(progress);
      animationRef.current = requestAnimationFrame(animateOverlay);
    }
  };

  const handleAudioEnd = () => {
    setPlay(false);
    setOverlayWidth(0);
  };

  return (
    <div className="testimonial_card">
      <div className="sound">
        <div className="waves_img">
          <span className="wave"></span>
          <span
            className="overlay"
            style={{ width: `${overlayWidth}%` }}
          ></span>
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
      <audio
        ref={audio}
        className="hidden_audio"
        onEnded={handleAudioEnd}
        src={`${BASE_URL}${feedback?.review}`}
      />
    </div>
  );
};

export default TestimonialCard;
