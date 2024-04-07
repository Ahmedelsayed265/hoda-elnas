import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const LoginForm = ({ setStepName }) => {
  const [formType, setFormType] = useState("email");
  const { t } = useTranslation();

  return (
    <div className="form_container">
      <div className="tabs">
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          {t("auth.loginByEmail")}
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          {t("auth.loginByPhone")}
        </button>
      </div>
      {formType === "email" ? (
        <EmailForm setStepName={setStepName} />
      ) : (
        <PhoneForm setStepName={setStepName} />
      )}
    </div>
  );
};

export default LoginForm;
