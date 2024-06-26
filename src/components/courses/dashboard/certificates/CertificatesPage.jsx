import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../../util/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import DataLoader from "../../../ui/DataLoader";
import CertificateCard from "../cards/CertificateCard";

const CertificatesPage = () => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forWhom, setForWhom] = useState("");

  useEffect(() => {
    setForWhom(t("dashboard.allStudents"));
  }, [lang, t]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/list_Student/?subscription_id=${subscriptionId}`
        );
        if (response.status === 200) {
          setSubscriptionStudents(response?.data?.message);
          if (response?.data?.message?.length === 0) {
            toast.error(t("dashboard.noStudentsSubTitle"));
            navigate(`/dashboard/${subscriptionId}/course-students`);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url;
        if (forWhom === t("dashboard.allStudents")) {
          url = `/members/List_certificates/?sub_id=${subscriptionId}`;
        } else {
          const studentId = subscriptionStudents.find(
            (s) => s.name === forWhom
          ).studentclass_id;
          url = `/members/List_certificates/?student_id=${studentId}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setCertificates(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId, forWhom, lang, subscriptionStudents]);

  return (
    <section className="course_reports">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="header flex-row">
              <div className="title">
                <h5>{t("dashboard.certificates")}</h5>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {forWhom}
                </Dropdown.Toggle>
                <Dropdown.Menu dir={lang === "ar" ? "rtl" : "ltr"}>
                  <Dropdown.Item
                    onClick={() => setForWhom(t("dashboard.allStudents"))}
                  >
                    {t("dashboard.allStudents")}
                  </Dropdown.Item>
                  {subscriptionStudents?.map((student) => (
                    <Dropdown.Item
                      key={student?.id}
                      onClick={() => setForWhom(student?.name)}
                    >
                      {student?.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        {loading ? (
          <DataLoader />
        ) : (
          <>
            {certificates?.length === 0 ? (
              <div className="noStudents">
                <h5>{t("dashboard.noCertificates")}</h5>
              </div>
            ) : (
              <div className="row m-0 mt-2">
                {certificates?.map((certificate) => (
                  <div
                    className="col-lg-6 col-md-6 col-12 p-2"
                    key={certificate?.certificate_id}
                  >
                    <CertificateCard certificate={certificate} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CertificatesPage;
