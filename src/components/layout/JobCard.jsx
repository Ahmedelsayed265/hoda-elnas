import React from "react";
import { Link } from "react-router-dom";
import jobposter from "../../assets/images/videoPoster.png";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../constants";

const JobCard = ({ job }) => {
  const { t } = useTranslation();
  return (
    <div className="job-card">
      <div className="img">
        <img
          src={job?.background ? `${BASE_URL}${job?.background}` : jobposter}
          alt="course"
        />
      </div>
      <div className="content">
        <h4>{job?.title}</h4>
        <p>{job?.job_type}</p>
        <Link to={`/jobs/${job?.id}`}>{t("details")}</Link>
      </div>
    </div>
  );
};

export default JobCard;
