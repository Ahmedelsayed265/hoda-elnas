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
import { DAYS_EN } from "../../../../constants";

const AppointmentsModal = ({
  showModal,
  setShowModal,
  studentId,
  subscriptionStudents,
  setSubscriptionStudents
}) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [goals, setGoals] = useState([]);
  const [step, setStep] = useState(1);
  const [maxStudents, setMaxStudents] = useState(null);
  const [findInstructorLoading, setFindInstructorLoading] = useState(false);
  const [timeOptions, setTimeOptions] = useState("specific");
  const [enrollLoading, setEnrollLoading] = useState(false);
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;

  // +++++++++++++ enrollment payload +++++++++++++ //
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
    goal_id: "",
    option_id: "",
    custom_option_id: "",
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
  // +++++++++++++ enrollment payload +++++++++++++ //

  // fetch students in subscription
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(
          `/members/List_student_subs/?id=${subscriptionId}`
        );
        if (response?.status === 200) {
          setMaxStudents(response?.data?.message[0]?.student_number);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubscription();
  }, [subscriptionId]);

  // fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `/members/List_student_subs/?id=${subscriptionId}`
        );
        if (response?.status === 200) {
          const courseId = response?.data?.message[0]?.course_id;
          const response2 = await axios.get(
            `/learningcenter/List_goal/?course_id=${courseId}&student_id=${studentId}`
          );
          setGoals(response2.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGoals();
  }, [studentId, subscriptionId]);

  const handleEnroll = async () => {
    setEnrollLoading(true);
    if (
      subscriptionStudents &&
      maxStudents &&
      subscriptionStudents?.length >= maxStudents
    ) {
      toast.error(t("dashboard.maxStudents"));
      setEnrollLoading(false);
      return;
    }
    const appointments = [...enrollmentData.appointments];
    const updatedAppointments = appointments.map((appointment) => ({
      ...appointment,
      day: DAYS_EN[appointment.day]
    }));
    const updatedAppointmentsFinal = updatedAppointments.map((appointment) => {
      const { endtime, ...rest } = appointment;
      return rest;
    });
    if (updatedAppointmentsFinal.some((a) => a.starttime === "")) {
      toast.error(t("dashboard.missingAppointmentTime"));
      setEnrollLoading(false);
      return;
    }
    try {
      const response = await axios.post("/members/enroll_Student/", {
        subscription_id: +subscriptionId,
        appointments: updatedAppointmentsFinal,
        student_id: studentId,
        goal_id: enrollmentData.goal_id,
        option_id: enrollmentData.option_id,
        instructor_id: enrollmentData.instructor_id
      });
      if (response.status === 200 && response.data.status === "success") {
        setShowModal(false);
        toast.success(t("dashboard.enrolledSuccessfully"));
        setSubscriptionStudents((prev) => [...prev, response?.data?.object[0]]);
        setStep(1);
        setEnrollmentData({
          goal_id: "",
          option_id: "",
          custom_option_id: "",
          subscription_id: +subscriptionId,
          instructor_id: null,
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
        });
      } else {
        setShowModal(false);
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleFindInstructor = async () => {
    setFindInstructorLoading(true);
    const appointments = [...enrollmentData.appointments];
    const updatedAppointments = appointments.map((appointment) => ({
      ...appointment,
      day: DAYS_EN[appointment.day]
    }));
    const updatedAppointmentsFinal = updatedAppointments.map((appointment) => {
      const { endtime, ...rest } = appointment;
      return rest;
    });
    if (updatedAppointmentsFinal.some((a) => a.starttime === "")) {
      toast.error(t("dashboard.missingAppointmentTime"));
      setEnrollLoading(false);
      return;
    }
    try {
      const response = await axios.post("/members/enroll_Student/", {
        subscription_id: +subscriptionId,
        appointments: updatedAppointmentsFinal,
        student_id: studentId,
        goal_id: enrollmentData.goal_id,
        option_id: enrollmentData.option_id
      });
      if (response.status === 200 && response.data.status === "success") {
        setShowModal(false);
        toast.success(t("findInstructor"));
        setStep(1);
        setEnrollmentData({
          goal_id: "",
          option_id: "",
          custom_option_id: "",
          subscription_id: +subscriptionId,
          instructor_id: null,
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
        });
      } else {
        setShowModal(false);
        toast.error(response?.response?.data?.message);
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
              goals={goals}
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <Instructor
              enrollLoading={enrollLoading}
              setEnrollmentData={setEnrollmentData}
              formData={enrollmentData}
              setFormData={setEnrollmentData}
              setStep={setStep}
              handleFindInstructor={handleFindInstructor}
              findInstructorLoading={findInstructorLoading}
              handleEnroll={handleEnroll}
              timeOptions={timeOptions}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentsModal;
