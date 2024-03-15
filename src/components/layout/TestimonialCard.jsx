import React from "react";
import StarsList from "./StarsList";
import waves from "../../assets/images/waves.svg";

const TestimonialCard = () => {
  return (
    <div className="testimonial_card">
      <div className="sound">
        <div className="img">
          <img src={waves} alt="sound" />
        </div>
        <div className="play_btn">
          <i className="fa-duotone fa-play"></i>
        </div>
      </div>
      <p>صراحه تدريس ممتاذ</p>
      <StarsList />
    </div>
  );
};

export default TestimonialCard;
