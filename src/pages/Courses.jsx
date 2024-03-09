import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import CourseCard from "../components/layout/CourseCard";

const Courses = () => {
  return (
    <>
      <SectionHeader />
      <section className="courses">
        <div className="container">
          <div className="row">
            <div className="col-12 p-2">
              <div class="search">
                <form action="" class="inner_search__form">
                  <input type="text" placeholder="إبحث عن كورس" />
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard />
            </div>
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard />
            </div>
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard />
            </div>
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard />
            </div>
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard />
            </div>
            <div className="col-lg-4 col-md-6 col-12 p-2">
              <CourseCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
