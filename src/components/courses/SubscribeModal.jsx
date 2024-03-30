import { Modal } from "react-bootstrap";
import React from "react";

const SubscribeModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
    </Modal>
  );
};

export default SubscribeModal;
