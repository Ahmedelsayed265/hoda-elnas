import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../constants";
import SubscribeForm from "./SubscribeForm";

const Subscribe = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === +id);
  return (
    <section className="subscribe">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 p-2 order-lg-0 order-1">
            <div className="course_header">
              <h3>{course?.name}</h3>
              <p>{course?.bio}</p>
            </div>
            <SubscribeForm course={course} />
          </div>
          <div className="col-lg-4 col-12 p-2 order-lg-1 order-0">
            <div className="image">
              <img
                src={`${BASE_URL}${course?.background}`}
                alt={course?.name}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
