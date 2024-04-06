import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Availabilty from "../chooseAppointmentSteps/Availabilty";
import Timings from "../chooseAppointmentSteps/Timings";
import Goal from "../chooseAppointmentSteps/Goal";
import Instructor from "../chooseAppointmentSteps/Instructor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AppointmentsModal = ({ showModal, setShowModal, studentId }) => {
  const { subscriptionId } = useParams();
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;
  const [timeOptions, setTimeOptions] = useState("specific");

  const initialSpesificTiming = {
    day: "",
    starttime: ""
  };

  const initialRangeTiming = {
    day: "",
    starttime: "",
    endtime: ""
  };

  const [enrollmentData, setEnrollmentData] = useState({
    student_id: studentId,
    goal_id: null,
    subscription_id: +subscriptionId,
    instructor_id: null
  });

  useEffect(() => {
    setEnrollmentData((prev) => ({
      ...prev,
      time_option: timeOptions,
      appointments:
        timeOptions === "specific"
          ? Array(cpw)
              .fill()
              .map(() => ({ ...initialSpesificTiming }))
          : Array(cpw)
              .fill()
              .map(() => ({ ...initialRangeTiming }))
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeOptions, cpw]);

  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("dashboard.appointmentsSet")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="appointments-modal">
        <div className="tabs">
          <div className={`tab ${step === 1 ? "active" : ""}`}>
            <h6>{t("dashboard.availabilty")}</h6>
          </div>
          <div className={`tab ${step === 2 ? "active" : ""}`}>
            <h6>{t("dashboard.myAppointmentsInmModal")}</h6>
          </div>
          <div className={`tab ${step === 3 ? "active" : ""}`}>
            <h6>{t("dashboard.goal")}</h6>
          </div>
          <div className={`tab ${step === 4 ? "active" : ""}`}>
            <h6>{t("dashboard.instructor")}</h6>
          </div>
        </div>
        <div className="container mt-3">
          {step === 1 && (
            <Availabilty
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              timeOptions={timeOptions}
              setTimeOptions={setTimeOptions}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <Timings
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              setStep={setStep}
            />
          )}
          {step === 3 && (
            <Goal
              studentId={studentId}
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <Instructor
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              setStep={setStep}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentsModal;
