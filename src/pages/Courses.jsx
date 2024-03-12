import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import CourseCard from "../components/layout/CourseCard";
import { useTranslation } from "react-i18next";

const Courses = () => {
  const { t } = useTranslation();
  const backLinks = [
    {
      name: t("home"),
      path: "/"
    }
  ];
  return (
    <>
      <SectionHeader pageName={t("courses")} backLinks={backLinks} />
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
