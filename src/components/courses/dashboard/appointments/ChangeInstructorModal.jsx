import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChooseStudent from "./ChooseStudent";
import Availabilty from "./Availabilty";
import Timings from "./Timings";
import Instructor from "./Instructor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { DAYS_EN } from "../../../../constants";

const ChangeInstructorModal = ({
  showModal,
  setShowModal,
  subscriptionStudents
}) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [timeOptions, setTimeOptions] = useState("specific");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reasons, setReasons] = useState([]);
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
    oldAppointments: true,
    changing_reason_id: "",
    subscription_id: +subscriptionId,
    instructor_id: null
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/instructor/List_instructor_changing_reason/`
        );
        if (response.status === 200) {
          setReasons(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
        !formData.oldAppointments &&
        updatedAppointmentsFinal.some((a) => a.starttime === "")
      ) {
        toast.error(t("dashboard.missingAppointmentTime"));
        setLoading(false);
        return;
      }
      const payLoad = {
        student_id: formData.student_id,
        instructor_id: formData.instructor_id,
        changing_reason_id: formData.changing_reason_id,
        same_time: formData.oldAppointments
      };
      if (!formData.oldAppointments) {
        payLoad.appointments = updatedAppointmentsFinal;
      }
      const response = await axios.post(
        `/instructor/Change_instructor/`,
        payLoad
      );
      if (response.status === 200) {
        toast.success(t("dashboard.instructorChanged"));
        setShowModal(false);
        setStep(1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        <Modal.Title>{t("dashboard.changeInstructor")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="appointments-modal">
        <div className="tabs">
          <div className={`tab ${step === 1 ? "active" : ""}`}>
            <h6>{t("dashboard.chooseStudnet")}</h6>
          </div>
          {!formData.oldAppointments && (
            <>
              <div className={`tab ${step === 2 ? "active" : ""}`}>
                <h6>{t("dashboard.availabilty")}</h6>
              </div>
              <div className={`tab ${step === 3 ? "active" : ""}`}>
                <h6>{t("dashboard.myAppointmentsInmModal")}</h6>
              </div>
            </>
          )}
          <div className={`tab ${step === 4 ? "active" : ""}`}>
            <h6>{t("dashboard.instructor")}</h6>
          </div>
        </div>
        <div className="container mt-3">
          {step === 1 && (
            <ChooseStudent
              subscriptionStudents={subscriptionStudents}
              setStep={setStep}
              reasons={reasons}
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
              setStep={setStep}
              timeOptions={timeOptions}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeInstructorModal;
