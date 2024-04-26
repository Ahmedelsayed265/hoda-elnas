import React from "react";
import { Modal } from "react-bootstrap";

const StepPopUp = ({ showModal, setShowModal, target }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{target?.step_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-modal">
        <ul>
          {target?.step_description?.split("\r\n").map((des, index) => (
            <li key={index}> {des}</li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default StepPopUp;
