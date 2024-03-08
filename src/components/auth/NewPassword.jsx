import React, { useState } from "react";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import PasswordField from "../ui/form-elements/PasswordField";

const NewPassword = ({ formData, setFormData }) => {
  const [loading] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="form_wrapper">
      <div className="page_preif">
        <div className="content">
          <div className="circle" />
          <h1>{t("auth.addNewPass")}</h1>
          <p>{t("auth.addNewPassSubTitle")}</p>
        </div>
      </div>
      <div className="form_container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <form className="form-ui">
          <PasswordField
            label={t("auth.newPassword")}
            htmlFor="new_password"
            id="new_password"
            value={formData.new_password}
            formData={formData}
            setFormData={setFormData}
            icon={<i className="fa-regular fa-lock-keyhole"></i>}
          />
          <PasswordField
            label={t("auth.confirmNewPassword")}
            htmlFor="confirm_password"
            id="confirm_password"
            value={formData.confrimed_password}
            formData={formData}
            setFormData={setFormData}
            icon={<i className="fa-regular fa-lock-keyhole"></i>}
          />
          <SubmitButton name={t("auth.confirm")} loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
