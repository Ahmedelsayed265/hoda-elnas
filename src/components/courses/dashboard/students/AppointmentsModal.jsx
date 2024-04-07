import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Availabilty from "../chooseAppointmentSteps/Availabilty";
import Timings from "../chooseAppointmentSteps/Timings";
import Goal from "../chooseAppointmentSteps/Goal";
import Instructor from "../chooseAppointmentSteps/Instructor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";

const AppointmentsModal = ({ showModal, setShowModal, studentId }) => {
  const { subscriptionId } = useParams();
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;
  const [timeOptions, setTimeOptions] = useState("specific");
  const [enrollLoading, setEnrollLoading] = useState(false);

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
    goal_id: 2,
    option_id: 1,
    subscription_id: +subscriptionId,
    instructor_id: null
  });

  useEffect(() => {
    setEnrollmentData((prev) => ({
      ...prev,
      student_id: studentId,
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
  }, [timeOptions, cpw, studentId]);

  const handleEnroll = async () => {
    setEnrollLoading(true);
    console.log(enrollmentData.instructor_id);
    try {
      const reponse = await axios.post("/members/enroll_Student/", {
        subscription_id: +subscriptionId,
        appointments: enrollmentData.appointments,
        student_id: studentId,
        goal_id: enrollmentData.goal_id,
        option_id: enrollmentData.option_id,
        instructor_id: enrollmentData.instructor_id
      });
      if (reponse.status === 200 && reponse.data.status === "success") {
        setShowModal(false);
        toast.success(t("dashboard.enrolledSuccessfully"));
      } else {
        setShowModal(false);
        toast.error(t("dashboard.enrollmentFailed"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEnrollLoading(false);
    }
  };

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
              enrollLoading={enrollLoading}
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              setStep={setStep}
              handleEnroll={handleEnroll}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentsModal;
