import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SelectPayMethod from "../upgrade/SelectPayMethod";
import useUserLocation from "../../../hooks/useUserLocation";
import CompleteProcess from "./CompleteProcess";

const RenewModal = ({
  showModal,
  setShowModal,
  formData,
  sub,
  setFormData,
  courseLoading
}) => {
  const { t } = useTranslation();
  const [stepName, setStepName] = useState("payment_method");
  const [method, setMethod] = useState({});
  const locationData = useUserLocation();
  const location = locationData?.country;

  const course = null;
  let targetComponent;

  if (stepName === "payment_method") {
    targetComponent = (
      <SelectPayMethod
        formData={formData}
        setStepName={setStepName}
        courseLoading={courseLoading}
        method={method}
        setMethod={setMethod}
      />
    );
  } else {
    targetComponent = (
      <CompleteProcess
        setStepName={setStepName}
        formData={formData}
        location={location}
        sub={sub}
        setFormData={setFormData}
        course={course}
        method={method}
      />
    );
  }
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("renewSub")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="subcribeModal">
        {/* tabs */}
        <div className="container pb-3">
          <div className="row m-0 justify-content-between wizard_tabs gap-0">
            <div className="col-lg-4 col-12 p-2">
              <div
                className={`wizard_tab ${
                  stepName === "payment_method" ? "active" : ""
                }`}
              >
                <div className="num">
                  <span> 1</span>
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
                  <span>2</span>
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

export default RenewModal;
