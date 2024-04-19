import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ChooseStudent from "./ChooseStudent";
import Availabilty from "./Availabilty";
import Timings from "./Timings";
import Instructor from "./Instructor";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ChangeInstructorModal = ({
  showModal,
  setShowModal,
  subscriptionStudents
}) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [timeOptions, setTimeOptions] = useState("specific");
  const [step, setStep] = useState(1);
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
    changing_reason_id: 1,
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
              //   enrollLoading={enrollLoading}
              //   handleEnroll={handleEnroll}
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
