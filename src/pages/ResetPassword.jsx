import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SubmitButton from "../components/ui/form-elements/SubmitButton";
import logo from "../assets/images/logo.png";
import PhoneField from "../components/ui/form-elements/PhoneField";

const ResetPassword = () => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  return (
    <section className="auth">
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
          <form className="form-ui">
            {/* phone */}
            <PhoneField
              label={t("auth.phone")}
              icon={<i className="fa-sharp fa-light fa-phone"></i>}
              formData={formData}
              setFormData={setFormData}
              value={formData.phone}
              id="phone"
            />
            <SubmitButton name={t("auth.send")} loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
