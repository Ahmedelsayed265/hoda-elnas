import React from "react";
import course from "../../assets/images/c1.jpeg";
import { Link } from "react-router-dom";

const CourseCard = () => {
  return (
    <div className="course-card">
      <div className="img">
        <img src={course} alt="course" />
      </div>
      <div className="content">
        <div className="d-flex qlign-items-center justify-content-between">
          <h4>كورس صفات المؤمن</h4>
          <Link to="/courses/1">
            <i className="fa-regular fa-arrow-left-long"></i>
          </Link>
        </div>
        <p>
          اجعل القرءان صاحبًا لك. معلمين مؤهّلين لتعليمك القرآن وحب القرآن
          والتعلق بالقرآن، مهمتنا هو أن نجعل القرآن جزءًا من يومك.
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
