import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import JobCard from "../components/layout/JobCard";
import axios from "./../util/axios";
import { toast } from "react-toastify";
import DataLoader from "../components/ui/DataLoader";

const Jobs = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/hr/List_jobs/?Hiring_status=Hiring");
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

  return (
    <section className="jobs_page">
      <div className="container">
        <div className="title">
          <h1>{t("availbleJobs")}</h1>
          <p>{t("availableJobsSubTitle")}</p>
        </div>
        {loading ? (
          <DataLoader />
        ) : (
          <div className="row m-0 justify-content-center">
            {jobs?.map((job) => (
              <div className="col-lg-3 col-md-4 col-6 p-2" key={job.id}>
                <JobCard job={job} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
