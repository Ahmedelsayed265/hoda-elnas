import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoginOrRegiester from "../courses/subscription/auth/LoginOrRegiester";
import SelectPayMethod from "./SelectPayMethod";
import CompleteProcess from "./CompleteProcess";

const SubscribeModal = ({ showModal, setShowModal, plan, location }) => {
  const { t } = useTranslation();
  const [stepName, setStepName] = useState("payment_method");
  const [method, setMethod] = useState({});
  const logged = useSelector((state) => state.authedUser.logged);
  let targetComponent;
  useEffect(() => {
    if (!logged) {
      setStepName("login");
    } else {
      setStepName("payment_method");
    }
  }, [logged]);
  if (stepName === "login") {
    targetComponent = <LoginOrRegiester setStepName={setStepName} />;
  } else if (stepName === "payment_method") {
    targetComponent = (
      <SelectPayMethod
        setStepName={setStepName}
        plan={plan}
        method={method}
        setMethod={setMethod}
      />
    );
  } else {
    targetComponent = (
      <CompleteProcess
        setStepName={setStepName}
        plan={plan}
        location={location}
        method={method}
      />
    );
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
          <div className="row m-0 justify-content-between wizard_tabs gap-0">
            {!logged && (
              <div className="col-lg-4 col-12 p-2">
                <div
                  className={`wizard_tab ${
                    stepName === "login" ? "active" : ""
                  }`}
                >
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
                className={`wizard_tab ${
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
                className={`wizard_tab ${
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
