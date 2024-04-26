import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StarsList from "../../../layout/StarsList";

const PopUp = ({ showModal, setShowModal, target }) => {
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
          {target?.level_name}{" "}
          {target?.level_status && <span className="completed">( {t("dashboard.completed")} )</span>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-modal">
        <ul>
          {target?.level_description?.split("\r\n").map((des, index) => (
            <li key={index}>{des}</li>
          ))}
        </ul>
        {target?.level_status && (
          <div className="d-flex gap-2 align-items-center">
            <span className="completed">{t("dashboard.rate")}: </span>
            <StarsList rate={target?.level_status?.grade} />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PopUp;
