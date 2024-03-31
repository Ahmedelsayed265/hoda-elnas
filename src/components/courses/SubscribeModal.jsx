import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoginOrRegiester from "./LoginOrRegiester";

const SubscribeModal = ({ showModal, setShowModal, formData }) => {
  const { t } = useTranslation();
  const [stepName, setStepName] = useState("payment_method");
  const logged = useSelector((state) => state.authedUser.logged);
  let targetComponent;
  useEffect(() => {
    if (!logged) {
      setStepName("login");
    }
  }, [logged]);
  if (stepName === "login") {
    targetComponent = <LoginOrRegiester setStepName={setStepName} />;
  }
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body className="subcribeModal">
        {/* tabs */}
        <div className="container pb-3">
          <div className="row m-0 justify-content-between tabs">
            {!logged && (
              <div className="col-lg-4 col-12 p-2">
                <div className={`tab ${stepName === "login" ? "active" : ""}`}>
                  <div className="num">
                    <span>1</span>
                  </div>
                  <div className="content">
                    <h6>{t("courseSubscribe.authentication")}</h6>
                    <p>{t("courseSubscribe.loginOrRegister")}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="col-lg-4 col-12 p-2">
              <div
                className={`tab ${
                  stepName === "payment_method" ? "active" : ""
                }`}
              >
                <div className="num">
                  <span>{!logged ? 2 : 1}</span>
                </div>
                <div className="content">
                  <h6>{t("courseSubscribe.paymentMethods")}</h6>
                  <p>{t("courseSubscribe.paymentMethodsSubTitle")}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div
                className={`tab ${
                  stepName === "complete_process" ? "active" : ""
                }`}
              >
                <div className="num">
                  <span>{!logged ? 3 : 2}</span>
                </div>
                <div className="content">
                  <h6>{t("courseSubscribe.completeProcess")}</h6>
                  <p>{t("courseSubscribe.completeProcessSubTitle")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="m-0 mt-4">{targetComponent}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SubscribeModal;
