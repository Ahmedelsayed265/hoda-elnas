import { Modal } from "react-bootstrap";
import React from "react";

const VideoModal = ({ showModal, setShowModal, video }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton />
      <Modal.Body>
        <video controls autoPlay>
          <source src={video} type="video/mp4" />
        </video>
      </Modal.Body>
    </Modal>
  );
};

export default VideoModal;
