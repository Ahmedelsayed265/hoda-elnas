import React from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AddAudioToPlayListModal = ({ setShowModal, showModal }) => {
  const { t } = useTranslation();
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="noPlayLists">
          <h6>{t("sounds.noPlayLists")}</h6>
          <p>{t("sounds.noPlayListsText")}</p>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            {t("sounds.close")}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddAudioToPlayListModal;
