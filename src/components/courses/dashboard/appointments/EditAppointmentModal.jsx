import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const EditAppointmentModal = ({ showModal, setShowModal, rowData }) => {
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("dashboard.editAppointment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="editAppointmentModal">
        <p className="editappointment">
          {t("dashboard.appointmentEdit")} {t("dashboard.day")}{" "}
          <span>{rowData?.day}</span> {t("dashboard.from")}{" "}
          <span>{rowData?.starttime}</span> {t("dashboard.to")}{" "}
          <span>{rowData?.endtime}</span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default EditAppointmentModal;
