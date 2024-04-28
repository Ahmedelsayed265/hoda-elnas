import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import JobCard from "../components/layout/JobCard";
import axios from "./../util/axios";
import { toast } from "react-toastify";

const Jobs = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/hr/List_jobs/");
        if (res.status === 200) {
          setJobs(res?.data?.message);
        } else {
          toast.error(res?.response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  console.log(jobs);
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
