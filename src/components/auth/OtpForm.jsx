import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";
import logo from "../../assets/images/logo.png";
import Otpcontainer from "./OtpContainer";

const OtpForm = ({ formData, setFormData }) => {
  const [loading] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="form_wrapper">
      <div className="page_preif">
        <div className="content">
          <div className="circle" />
          <h1>{t("auth.enterOtp")}</h1>
          <p>{t("auth.enterCodeTitle")}</p>
        </div>
      </div>
      <div className="form_container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="reset_otp_title">
          <p>
            {t("auth.pleaseEnterCode")} <span>+9960123456</span>
          </p>
        </div>
        <form className="form-ui">
          <Otpcontainer formData={formData} setFormData={setFormData} />
          <div className="resend">
            <p>{t("auth.resendCode")}</p>
            <span className="counterDown">00:59</span>
          </div>
          <SubmitButton name={t("auth.confirm")} loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default OtpForm;
