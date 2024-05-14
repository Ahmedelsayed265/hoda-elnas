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
import EditAppointmentModal from "../appointments/EditAppointmentModal";
import ConfirmDeleteModal from "../../../ui/ConfirmDeleteModal";
import { DAYS_EN } from "../../../../constants";

const HomePage = () => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rowData, setRowData] = useState({});
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

  const fetchAppointmentsData = async () => {
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

  useEffect(() => {
    fetchAppointmentsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId, forWhom, lang, subscriptionStudents]);

  const handleEdit = (id) => {
    setShowEditModal(true);
    setRowData(appointments.find((a) => a.id === id));
  };

  const handleEditAppointment = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
    try {
      const day = DAYS_EN[formData.day];
      const res = await axios.put(`/instructor/Change_Time/${rowData?.id}/`, {
        ...formData,
        day: day
      });
      if (res.status === 200) {
        toast.success(t("dashboard.editAppointmentSuccess"));
        setShowEditModal(false);
        fetchAppointmentsData();
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (id) => {
    setShowCancelModal(true);
    setRowData(appointments.find((a) => a.id === id));
  };

  const handleCancelSession = async (id) => {
    try {
      const response = await axios.post(`/instructor/Cancel_session/${id}/`);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        fetchAppointmentsData();
        setShowCancelModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
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
      <EditAppointmentModal
        rowData={rowData}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        loading={loading}
        onEdit={handleEditAppointment}
        setAppointments={setAppointments}
      />
      <ConfirmDeleteModal
        buttonText={t("dashboard.cancelAppointment")}
        showModal={showCancelModal}
        setShowModal={setShowCancelModal}
        onDelete={() => handleCancelSession(rowData?.id)}
        text={t("dashboard.cancelAppointmentText")}
      />
    </section>
  );
};

export default HomePage;
