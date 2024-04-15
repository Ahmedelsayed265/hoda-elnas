import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AddGoalModal = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("dashboard.addGoal")}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default AddGoalModal;
