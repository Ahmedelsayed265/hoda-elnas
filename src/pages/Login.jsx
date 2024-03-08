import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import EmailForm from "../components/auth/EmailForm";
import PhoneForm from "../components/auth/PhoneForm";

const Login = () => {
  const [formType, setFormType] = useState("email");
  const { t } = useTranslation();
  let formComponent;
  if (formType === "email") {
    formComponent = <EmailForm />;
  } else {
    formComponent = <PhoneForm />;
  }
  return (
    <section className="auth">
      <div className="form_wrapper">
        <div className="page_preif">
          <div className="content">
            <div className="circle" />
            <h1>{t("auth.login")}</h1>
            <p>{t("auth.subTitle")}</p>
            <h6>
              {t("auth.noAccount")}{" "}
              <Link to="/register">{t("auth.createAccount")}</Link>
            </h6>
          </div>
        </div>
        <div className="form_container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="welcome">
            <h4>{t("auth.welcome")}</h4>
            <p>{t("auth.enterYourInfo")}</p>
          </div>
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
          {formComponent}
        </div>
      </div>
    </section>
  );
};

export default Login;
