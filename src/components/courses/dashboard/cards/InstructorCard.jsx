import React from "react";
import man from "../../../../assets/images/man.svg";
import woman from "../../../../assets/images/woman.svg";

const InstructorCard = ({ id }) => {
  return (
    <label htmlFor={id} className="instructor-card">
      <input type="radio" name="instructor" id={id} />
      <div className="content">
        <div className="img">
          <img src={man} alt="" />
        </div>
        <h6>الشيخ سعد</h6>
        <p>هوجزءًا هوجزءًا لتعليمك القرآن مهمتنا هوجزءًا من يومك.</p>
        <ul>
          <li>مهارات متكاملة</li>
          <li>مهارات متكاملة</li>
          <li>مهارات متكاملة</li>
          <li>مهارات متكاملة</li>
        </ul>
      </div>
    </label>
  );
};

export default InstructorCard;
