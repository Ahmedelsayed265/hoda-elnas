import React from "react";
import { Link } from "react-router-dom";
import job from "../../assets/images/videoPoster.png";
import { useTranslation } from "react-i18next";

const JobCard = () => {
  const { t } = useTranslation();
  return (
    <div className="job-card">
      <div className="img">
        <img src={job} alt="course" />
      </div>
      <div className="content">
        <h4>معلم قران كريم</h4>
        <p>دوام كامل</p>
        <Link to={"/jobs/1"}>{t("details")}</Link>
      </div>
    </div>
  );
};

export default JobCard;
