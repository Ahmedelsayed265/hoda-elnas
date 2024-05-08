import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ConfirmDeleteModal = ({
  showModal,
  setShowModal,
  text,
  target,
  onDelete,
  buttonText
}) => {
  const { t } = useTranslation();
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body className="confirm-delete">
        <p>
          {text} {target}
        </p>
        <div className="d-flex justify-content-end gap-3">
          <button onClick={() => setShowModal(false)} className="cancel-btn">
            {t("cancel")}
          </button>
          <button className="delete-btn" onClick={onDelete}>
            {buttonText}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
