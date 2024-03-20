import React from "react";
import { useTranslation } from "react-i18next";
import JobCard from "../components/layout/JobCard";

const Jobs = () => {
  const { t } = useTranslation();
  return (
    <section className="jobs_page">
      <div className="container">
        <div className="title">
          <h1>{t("availbleJobs")}</h1>
          <p>{t("availableJobsSubTitle")}</p>
        </div>
        <div className="row m-0">
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <JobCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <JobCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <JobCard />
          </div>
          <div className="col-lg-3 col-md-4 col-6 p-2">
            <JobCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
