import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "./../util/axios";
import DataLoader from "../components/ui/DataLoader";

const JobDetails = () => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/hr/List_jobs/?id=${id}`);
        if (response.status === 200) {
          setJob(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, lang]);

  return (
    <>
      {loading ? (
        <DataLoader />
      ) : (
        <section className="job_details">
          <div className="container">
            <div className="row m-0">
              <div className="col-lg-10 col-12 p-2">
                <div className="content">
                  <div className="job_title">
                    <div className="d-flex align-items-center justify-content-between">
                      <h4>
                        <i className="fa-light fa-briefcase"></i> {job?.title}
                      </h4>
                      <Link to="/jobs/1/apply">
                        {t("applyNow")}{" "}
                        <i className="fa-regular fa-arrow-up-left"></i>
                      </Link>
                    </div>
                    <ul className="d-flex gap-3">
                      <li>{job?.job_type}</li>
                      <li>{job?.experience}</li>
                    </ul>
                  </div>
                  <div className="about_job">
                    <p>{job?.description}</p>
                    <h6>{t("jobResponsibilities")}</h6>
                    <ul>
                      <li>تدريس الطلاب القراءة الصحيحة للقرآن الكريم.</li>
                      <li>
                        تعليم التجويد وتأكيد الأحكام الصوتية الصحيحة والمبادئ
                        اللغوية.
                      </li>
                      <li>
                        توجيه الطلاب في فهم معاني القرآن وتفسيرها بطريقة سهلة
                        ومفهومة.
                      </li>
                      <li>تعزيز القيم والأخلاق الإسلامية لدى الطلاب.</li>
                      <li>
                        مراجعة وتقييم أداء الطلاب ومساعدتهم في تحسين مهاراتهم في
                        القراءة والتجويد.
                      </li>
                    </ul>
                    <h6>{t("jobRequirements")}</h6>
                    <ul>
                      {job?.requirements
                        ?.split("\r\n")
                        .map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default JobDetails;
