import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StarsList from "../../../layout/StarsList";

const StepPopUp = ({ showModal, setShowModal, target }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {target?.step_name}{" "}
          {target?.step_status?.checked === true && (
            <span className="completed">( {t("dashboard.completed")} )</span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-modal">
        <ul>
          {target?.step_description?.split("\r\n").map((des, index) => (
            <li key={index}> {des}</li>
          ))}
        </ul>
        {target?.step_status?.checked === true && (
          <div className="d-flex gap-2 align-items-center">
            <span className="completed">{t("dashboard.rate")}: </span>
            <StarsList rate={target?.step_status?.grade} />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default StepPopUp;
