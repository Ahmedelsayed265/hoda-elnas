import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Availabilty from "./Availabilty";
import Timings from "./Timings";
import Goal from "./Goal";
import Instructor from "./Instructor";

const AppointmentsModal = ({ showModal, setShowModal }) => {
  const [formData, setFormData] = useState({
    appointmentsType: "fixed"
  });
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <Timings
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
            />
          )}
          {step === 3 && (
            <Goal
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <Instructor
              formData={formData}
              setFormData={setFormData}
              setStep={setStep}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AppointmentsModal;
