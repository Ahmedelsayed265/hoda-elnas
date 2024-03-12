import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BestCoursesSlider from "./BestCoursesSlider";

const BestCourses = () => {
  const { t } = useTranslation();
  return (
    <section className="best_courses">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="section_title">
              <h3>{t("homePage.bestCourses")}</h3>
              <Link to="/courses">
                {t("homePage.allCourses")}{" "}
                <i className="fa-regular fa-arrow-left-long"></i>
              </Link>
            </div>
          </div>
          <div className="col-12 p-2">
            <BestCoursesSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestCourses;
