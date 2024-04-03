import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";

const CourseCard = ({ course }) => {
  return (
    <div className="custom-card">
      <Link to={`/courses/${course?.slug}`} className="img">
        <img src={`${BASE_URL}${course?.background}`} alt="course" />
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
