import React, { useState } from "react";
import PasswordField from "../ui/form-elements/PasswordField";
import { useTranslation } from "react-i18next";
import PhoneField from "../ui/form-elements/PhoneField";
import { Link } from "react-router-dom";
import SubmitButton from "../ui/form-elements/SubmitButton";

const PhoneForm = () => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const { t } = useTranslation();
  return (
    <form className="form-ui">
      <PhoneField
        label={t("auth.phone")}
        icon={<i className="fa-sharp fa-light fa-phone"></i>}
        formData={formData}
        setFormData={setFormData}
        value={formData.phone}
        id="phone"
      />
      <PasswordField
        label={t("auth.password")}
        htmlFor="password"
        id="password"
        value={formData.password}
        formData={formData}
        setFormData={setFormData}
        icon={<i className="fa-regular fa-lock-keyhole"></i>}
      />
      <div className="d-flex justify-content-end forgot">
        <Link to="/reset-password">{t("auth.forgotPassword")}</Link>
      </div>
      <SubmitButton name={t("login")} loading={loading} />
    </form>
  );
};

export default PhoneForm;
