import React from "react";
import { useTranslation } from "react-i18next";

const Goal = ({ formData, setFormData, setStep }) => {
  const { t } = useTranslation();
  return (
    <div className="row m-0">
      <div className="col-12 p-2 d-flex justify-content-between">
        <button className="back" onClick={() => setStep(2)}>
          {t("dashboard.back")}
        </button>
        <button className="continue" onClick={() => setStep(4)}>
          {t("dashboard.next")}
        </button>
      </div>
    </div>
  );
};

export default Goal;
