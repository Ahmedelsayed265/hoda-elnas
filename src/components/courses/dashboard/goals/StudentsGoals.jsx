import React, { useEffect, useState } from "react";
import axios from "./../../../../util/axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import GoalCard from "../cards/GoalCard";
import DataLoader from "../../../ui/DataLoader";
import AddGoalModal from "./AddGoalModal";
const StudentsGoals = () => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state) => state?.language?.lang);
  const [forWhom, setForWhom] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);

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
      setLoading(true);
      try {
        let url;
        if (forWhom === t("dashboard.allStudents")) {
          url = `/members/List_student_goal/?sub_id=${subscriptionId}`;
        } else {
          const studentId = subscriptionStudents.find(
            (s) => s.name === forWhom
          ).studentclass_id;
          url = `/members/List_student_goal/?student_id=${studentId}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setGoals(response?.data?.message);
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
    <section className="students_goals">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="header">
              <div className="title">
                <h5 className="forWhom">
                  {forWhom === t("dashboard.allStudents")
                    ? t("dashboard.allStudentGoals")
                    : t("dashboard.studentAppointment") + " " + forWhom}
                </h5>
              </div>
              <div className="d-flex gap-2 buttons">
                <button onClick={() => setShowAddModal(true)}>
                  {t("dashboard.addGoal")}
                </button>
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
        </div>
        {loading ? (
          <DataLoader />
        ) : (
          <div className="row m-0 mt-3">
            {goals?.map((goal) => (
              <div
                className="col-12 p-2"
                key={goal?.goal_detail?.studentgoal_id}
              >
                <GoalCard goal={goal} />
              </div>
            ))}
          </div>
        )}
      </div>
      <AddGoalModal showModal={showAddModal} setShowModal={setShowAddModal} />
    </section>
  );
};

export default StudentsGoals;
