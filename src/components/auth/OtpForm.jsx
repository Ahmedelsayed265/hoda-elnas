import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "../ui/form-elements/SubmitButton";
import logo from "../../assets/images/logo.png";
import Otpcontainer from "./OtpContainer";

import { toast } from "react-toastify";
import axios from "./../../util/axios";

const OtpForm = ({ setFormComponent, emailToSend, phoneToSend }) => {
  const [formData, setFormData] = useState({
    function: "checkotp",
    otp: "",
    email: emailToSend,
    phone: phoneToSend
  });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/accounts/resetpass/", formData);
      setFormComponent("new-password");
    } catch (error) {
      toast.error(t("auth.otpIsNotCorrect"));
    } finally {
      setLoading(false);
    }
  };

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
        <form className="form-ui" onSubmit={handleSubmit}>
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
