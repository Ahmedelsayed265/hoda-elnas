import { Modal } from "react-bootstrap";
import React from "react";
import video from "../../assets/images/video.mp4";

const VideoModal = ({ showModal, setShowModal }) => {
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
