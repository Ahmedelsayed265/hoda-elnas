import React from "react";
import CourseCard from "../components/layout/CourseCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Courses = () => {
  const courses = useSelector((state) => state.courses.courses);
  const { t } = useTranslation();
  return (
    <section className="courses">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="search">
              <form action="" className="inner_search__form">
                <input type="text" placeholder={t("lookingForSomthing")} />
              </form>
            </div>
          </div>
          {courses?.map((course) => (
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
