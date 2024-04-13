import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import AssignmentCard from "../cards/AssignmentCard";
import DataLoader from "./../../../ui/DataLoader";

const Assignments = () => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forWhom, setForWhom] = useState("");
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
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
          url = `/instructor/list_assignment/?sub_id=${subscriptionId}`;
        } else {
          const studentId = subscriptionStudents.find(
            (s) => s.name === forWhom
          ).studentclass_id;
          url = `/instructor/list_assignment/?student_id=${studentId}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setAssignments(response?.data?.message);
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
    <section className="assignments">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="header">
              <div className="title">
                <h5>{t("dashboard.tasks")}</h5>
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
            {assignments?.length === 0 ? (
              <div className="noStudents">
                <h5>{t("dashboard.noTasks")}</h5>
              </div>
            ) : (
              <>
                <div className="row m-0 mt-0">
                  {assignments
                    .filter((a) => a?.status === "pending")
                    ?.map((assignment) => (
                      <div
                        className="col-lg-6 col-md-6 col-12 p-2"
                        key={assignment?.id}
                      >
                        <AssignmentCard
                          assignment={assignment}
                          path={`/dashboard/${subscriptionId}/assignments/${assignment?.assignment_id}`}
                        />
                      </div>
                    ))}
                </div>
                <div className="row m-0 mt-3">
                  <div className="col-12 p-2">
                    <div className="row_header">
                      <h6>{t("dashboard.inReviewTasks")}</h6>
                    </div>
                  </div>
                  {assignments
                    .filter((a) => a?.status === "submitted")
                    ?.map((assignment) => (
                      <div className="col-lg-6 col-md-6 col-12 p-2">
                        <AssignmentCard
                          path={`/dashboard/${subscriptionId}/assignments/${assignment?.assignment_id}`}
                          key={assignment?.id}
                          assignment={assignment}
                        />
                      </div>
                    ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Assignments;
