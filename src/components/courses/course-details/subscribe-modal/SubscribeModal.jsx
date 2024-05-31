import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LoginOrRegiester from "../../../courses/subscription/auth/LoginOrRegiester";
import SelectPayMethod from "./SelectPayMethod";
import CompleteProcess from "./CompleteProcess";
import UserInfo from "./UserInfo";

const SubscribeModal = ({
  showModal,
  setShowModal,
  plan,
  location,
  paymentMethods,
  requiresLogin,
  studentsNumField
}) => {
  const { t } = useTranslation();
  const [stepName, setStepName] = useState("payment_method");
  const [method, setMethod] = useState({});
  const userId = useSelector((state) => state.authedUser?.user?.id);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: ""
  });
  let targetComponent;
  useEffect(() => {
    if (!userId && requiresLogin) {
      setStepName("login");
    } else if (!userId && !requiresLogin) {
      setStepName("user_info");
    } else {
      setStepName("payment_method");
    }
  }, [userId, requiresLogin]);
  if (stepName === "login") {
    targetComponent = <LoginOrRegiester setStepName={setStepName} />;
  } else if (stepName === "payment_method") {
    targetComponent = (
      <SelectPayMethod
        setStepName={setStepName}
        paymentMethods={paymentMethods}
        method={method}
        userId={userId}
        requiresLogin={requiresLogin}
        setMethod={setMethod}
      />
    );
  } else if (stepName === "user_info") {
    targetComponent = (
      <UserInfo
        formData={formData}
        setFormData={setFormData}
        setStepName={setStepName}
      />
    );
  } else {
    targetComponent = (
      <CompleteProcess
        setStepName={setStepName}
        plan={plan}
        requiresLogin={requiresLogin}
        formData={formData}
        location={location}
        method={method}
        studentsNumField={studentsNumField}
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
            {!userId && requiresLogin && (
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
            {!userId && !requiresLogin && (
              <div className="col-lg-4 col-12 p-2">
                <div
                  className={`wizard_tab ${
                    stepName === "user_info" ? "active" : ""
                  }`}
                >
                  <div className="num">
                    <span>1</span>
                  </div>
                  <div className="content">
                    <h6>{t("courseSubscribe.subscriperData")}</h6>
                    <p>{t("courseSubscribe.subscriperDataSubTitle")}</p>
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
                  <span>
                    {!userId || requiresLogin || !requiresLogin ? 2 : 1}
                  </span>
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
                  <span>
                    {!userId || requiresLogin || !requiresLogin ? 3 : 2}
                  </span>
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
