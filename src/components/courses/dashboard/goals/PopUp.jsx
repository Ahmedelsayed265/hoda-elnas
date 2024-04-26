import React from "react";
import { Modal } from "react-bootstrap";

const PopUp = ({ showModal, setShowModal, target }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{target?.level_name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-modal">
        <ul>
          {target?.level_description?.split("\r\n").map((des, index) => (
            <li key={index}>{des}</li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default PopUp;
