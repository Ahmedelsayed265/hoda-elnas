import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.svg";
import ResetByMail from "./ResetByMail";
import ResetByPhone from "./ResetByPhone";

const ResetForm = ({ setFormComponent, setPhone, setEmail }) => {
  const [formType, setFormType] = useState("email");
  const { t } = useTranslation();
  let component;
  if (formType === "email") {
    component = (
      <ResetByMail setEmail={setEmail} setFormComponent={setFormComponent} />
    );
  } else {
    component = (
      <ResetByPhone setPhone={setPhone} setFormComponent={setFormComponent} />
    );
  }
  return (
    <div className="form_wrapper">
      <div className="page_preif">
        <div className="content">
          <div className="circle" />
          <h1>{t("auth.forgotPassword")}</h1>
          <p>{t("auth.enterYourPhone")}</p>
        </div>
      </div>
      <div className="form_container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="welcome">
          <h4>{t("auth.changePassword")}</h4>
          <p>{t("auth.enterPhoneToGetCode")}</p>
        </div>
        <div className="tabs">
          <button
            className={formType === "email" ? "active" : ""}
            onClick={() => setFormType("email")}
          >
            {t("auth.sendByEmail")}
          </button>
          <button
            className={formType === "phone" ? "active" : ""}
            onClick={() => setFormType("phone")}
          >
            {t("auth.sendByPhone")}
          </button>
        </div>
        {component}
      </div>
    </div>
  );
};

export default ResetForm;
