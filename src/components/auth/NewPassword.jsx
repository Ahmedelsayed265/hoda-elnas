import React, { useState } from "react";
import SubmitButton from "../ui/form-elements/SubmitButton";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.svg";
import PasswordField from "../ui/form-elements/PasswordField";
import { toast } from "react-toastify";
import axios from "./../../util/axios";
import { useNavigate } from "react-router-dom";

const NewPassword = ({ emailToSend, phoneToSend }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    function: "resetpassword",
    password: "",
    confirmpassword: "",
    email: emailToSend,
    phone: phoneToSend
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/accounts/resetpass/", formData);
      toast.success(t("auth.passwordChangedSuccessfully"));
      navigate("/login");
    } catch (error) {
      console.log("error =>", error);
    } finally {
      setLoading(false);
    }
  };
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
        <form className="form-ui" onSubmit={handleSubmit}>
          <PasswordField
            label={t("auth.newPassword")}
            htmlFor="password"
            id="new_password"
            value={formData.password}
            formData={formData}
            setFormData={setFormData}
            icon={<i className="fa-regular fa-lock-keyhole"></i>}
          />
          <PasswordField
            label={t("auth.confirmNewPassword")}
            htmlFor="confirmpassword"
            id="confirm_password"
            value={formData.confirmpassword}
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
