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
      <Modal.Body>
        <p>
          {t("dashboard.editAppointment")} {t("dashboard.day")} {rowData?.day}{" "}
          {t("dashboard.from")} {rowData?.starttime} {t("dashboard.to")}{" "}
          {rowData?.endtime}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default EditAppointmentModal;
