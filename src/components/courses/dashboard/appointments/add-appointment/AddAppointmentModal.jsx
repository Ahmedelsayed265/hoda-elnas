import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { DAYS_EN } from "../../../../../constants";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChooseStudent from "./ChooseStudent";
import Availabilty from "../Availabilty";
import Timings from "../Timings";
import Instructor from "./Instructor";
import axios from "../../../../../util/axios";
import ChooseAppointments from "./ChooseAppointments";

const AddAppointmentModal = ({
  showModal,
  setShowModal,
  subscriptionStudents,
  setAppointments
}) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [timeOptions, setTimeOptions] = useState("specific");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [findInstructorLoading, setFindInstructorLoading] = useState(false);
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;

  const initialSpesificTiming = {
    day: "",
    starttime: ""
  };
  const initialRangeTiming = {
    day: "",
    starttime: "",
    endtime: ""
  };

  const [formData, setFormData] = useState({
    student_id: null,
    instructor: true,
    subscription_id: +subscriptionId,
    instructor_id: null,
    appointments: []
  });

  useEffect(() => {
    setFormData((prev) => ({
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

  const handleChangeInstructor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const appointments = [...formData.appointments];
      const updatedAppointments = appointments.map((appointment) => ({
        ...appointment,
        day: DAYS_EN[appointment.day]
      }));
      const updatedAppointmentsFinal = updatedAppointments.map(
        (appointment) => {
          const { endtime, ...rest } = appointment;
          return rest;
        }
      );
      if (
        !formData.instructor &&
        updatedAppointmentsFinal.some((a) => a.starttime === "")
      ) {
        toast.error(t("dashboard.missingAppointmentTime"));
        setLoading(false);
        return;
      }
      const payLoad = {
        subscription_id: formData.subscription_id,
        studentclass_id: formData.student_id,
        appointments: updatedAppointments,
        instructor_id: formData.instructor_id,
        instructor_status: "new_instructor"
      };
      if (!formData.instructor) {
        payLoad.appointments = updatedAppointmentsFinal;
      }
      const response = await axios.post(
        `/instructor/Set_New_appointment/`,
        payLoad
      );
      if (response.status === 200) {
        toast.success(t("dashboard.instructorChanged"));
        setAppointments(response.data.object);
        setShowModal(false);
        setStep(1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindInstructor = async (e) => {
    e.preventDefault();
    setFindInstructorLoading(true);
    try {
      const appointments = [...formData.appointments];
      const updatedAppointments = appointments.map((appointment) => ({
        ...appointment,
        day: DAYS_EN[appointment.day]
      }));
      const updatedAppointmentsFinal = updatedAppointments.map(
        (appointment) => {
          const { endtime, ...rest } = appointment;
          return rest;
        }
      );
      if (
        !formData.instructor &&
        updatedAppointmentsFinal.some((a) => a.starttime === "")
      ) {
        toast.error(t("dashboard.missingAppointmentTime"));
        setLoading(false);
        return;
      }
      const payLoad = {
        subscription_id: formData.subscription_id,
        studentclass_id: formData.student_id,
        appointments: updatedAppointments,
        instructor_status: "new_instructor"
      };
      if (!formData.instructor) {
        payLoad.appointments = updatedAppointmentsFinal;
      }
      const response = await axios.post(
        `/instructor/Set_New_appointment/`,
        payLoad
      );
      if (response.status === 200) {
        toast.success(t("findInstructor"));
        setShowModal(false);
        setStep(1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFindInstructorLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        setStep(1);
      }}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("dashboard.addNewAppointment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="appointments-modal">
        <div className="tabs">
          <div className={`tab ${step === 1 ? "active" : ""}`}>
            <h6>{t("dashboard.chooseStudnet")}</h6>
          </div>
          {!formData.instructor && (
            <>
              <div className={`tab ${step === 2 ? "active" : ""}`}>
                <h6>{t("dashboard.availabilty")}</h6>
              </div>
              <div className={`tab ${step === 3 ? "active" : ""}`}>
                <h6>{t("dashboard.myAppointmentsInmModal")}</h6>
              </div>
              <div className={`tab ${step === 4 ? "active" : ""}`}>
                <h6>{t("dashboard.instructor")}</h6>
              </div>
            </>
          )}
          {formData.instructor && (
            <div className={`tab ${step === 5 ? "active" : ""}`}>
              <h6>{t("dashboard.chhoseAppointment")}</h6>
            </div>
          )}
        </div>
        <div className="container mt-3">
          {step === 1 && (
            <ChooseStudent
              subscriptionStudents={subscriptionStudents}
              setStep={setStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <Availabilty
              formData={formData}
              setFormData={setFormData}
              timeOptions={timeOptions}
              setTimeOptions={setTimeOptions}
              setStep={setStep}
            />
          )}
          {step === 3 && (
            <Timings
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <Instructor
              handleChangeInstructor={handleChangeInstructor}
              loading={loading}
              subscriptionStudents={subscriptionStudents}
              formData={formData}
              setFormData={setFormData}
              handleFindInstructor={handleFindInstructor}
              findInstructorLoading={findInstructorLoading}
              setStep={setStep}
              timeOptions={timeOptions}
            />
          )}
          {step === 5 && (
            <ChooseAppointments
              formData={formData}
              setStep={setStep}
              setFormData={setFormData}
              setAppointments={setAppointments}
              setShowModal={setShowModal}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddAppointmentModal;
