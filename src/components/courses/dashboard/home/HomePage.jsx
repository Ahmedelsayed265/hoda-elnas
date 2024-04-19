import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppointmentCard from "../cards/AppointmentCard";
import DataLoader from "./../../../ui/DataLoader";
import ChangeInstructorModal from "../appointments/ChangeInstructorModal";

const HomePage = () => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [showChangeInstructorModal, setShowChangeInstructorModal] =
    useState(false);
  const [forWhom, setForWhom] = useState("");
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setForWhom(t("dashboard.allStudents"));
  }, [lang, t]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (forWhom === t("dashboard.allStudents")) {
          url = `/members/List_appointments/?sub_id=${subscriptionId}&nearest=true`;
        } else {
          const studentId = subscriptionStudents.find(
            (s) => s.name === forWhom
          ).studentclass_id;
          url = `/members/List_appointments/?student_id=${studentId}&nearest=true`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setAppointments(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
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
                <h5>{t("dashboard.nextAppointments")}</h5>
              </div>
              <div className="d-flex gap-2 buttons">
                <button onClick={() => setShowChangeInstructorModal(true)}>
                  {t("dashboard.changeInstructor")}
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
            <div className="col-lg-12 col-12 p-2 mb-2">
              <div className="appointment_grid">
                {appointments?.map((appointment) => (
                  <AppointmentCard
                    key={appointment?.id}
                    appointment={appointment}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ChangeInstructorModal
        subscriptionStudents={subscriptionStudents}
        showModal={showChangeInstructorModal}
        setShowModal={setShowChangeInstructorModal}
      />
    </section>
  );
};

export default HomePage;
