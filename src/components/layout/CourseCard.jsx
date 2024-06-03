import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="custom-card">
      <Link to={`/courses/${course?.slug}`} className="img">
        <img src={course?.background} alt="course" />
      </Link>
      <div className="content">
        <div className="d-flex align-items-start justify-content-between">
          <h4>{course?.name}</h4>
          <Link to={`/courses/${course?.slug}`}>
            <i className="fa-regular fa-arrow-left-long"></i>
          </Link>
        </div>
        <p>{course?.bio}</p>
      </div>
    </div>
  );
};

export default CourseCard;
