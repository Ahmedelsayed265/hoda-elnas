import React, { useState } from "react";
import axios from "../util/axios";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../components/ui/form-elements/InputField";
import SubmitButton from "../components/ui/form-elements/SubmitButton";
import PhoneField from "../components/ui/form-elements/PhoneField";
import PasswordField from "../components/ui/form-elements/PasswordField";
import NameField from "../components/ui/form-elements/NameField";
import Gender from "../components/ui/form-elements/Gender";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    whatsapp_number: "",
    gender: ""
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/accounts/register/", formData);
      toast.success(t("auth.accountCreatedSuccessfully"));
      navigate("/login");
    } catch (error) {
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="auth">
      <div className="form_wrapper">
        <div className="page_preif">
          <div className="content">
            <div className="circle" />
            <h1>{t("auth.createAnAccount")}</h1>
            <p>{t("auth.subTitle")}</p>
            <h6>
              {t("auth.haveAnAccount")} <Link to="/login">{t("login")}</Link>
            </h6>
          </div>
        </div>
        <div className="form_container">
          <form className="form-ui" onSubmit={handleSubmit}>
            {/* name */}
            <NameField setFormData={setFormData} formData={formData} />
            {/* email */}
            <InputField
              label={t("auth.email")}
              placeholder={t("auth.emailPlaceHolder")}
              htmlFor="email"
              value={formData.email}
              formData={formData}
              id={"email"}
              setFormData={setFormData}
              icon={<i className="fa-light fa-envelope"></i>}
            />
            {/* phone */}
            <PhoneField
              label={t("auth.phone")}
              icon={<i className="fa-sharp fa-light fa-phone"></i>}
              formData={formData}
              setFormData={setFormData}
              value={formData.phone_number}
              id="phone_number"
            />
            {/* whats app */}
            <PhoneField
              label={t("auth.whatsapp")}
              icon={<i className="fa-brands fa-whatsapp"></i>}
              formData={formData}
              setFormData={setFormData}
              value={formData.whatsapp_number}
              id="whatsapp_number"
            />
            <div className="form_group">
              <PasswordField
                label={t("auth.password")}
                htmlFor="password"
                id="password"
                value={formData.password}
                formData={formData}
                setFormData={setFormData}
                icon={<i className="fa-regular fa-lock-keyhole"></i>}
              />
              <PasswordField
                label={t("auth.confirmNewPassword")}
                htmlFor="confirm_password"
                id="confirm_password"
                value={formData.confirm_password}
                formData={formData}
                setFormData={setFormData}
                icon={<i className="fa-regular fa-lock-keyhole"></i>}
              />
            </div>
            {/* gender */}
            <Gender
              setFormData={setFormData}
              formData={formData}
              dataKey="gender"
            />
            {/* agreement and submit */}
            <p className="continue">
              {t("auth.byContinue")}{" "}
              <Link to="/terms-conditions">{t("auth.termsAndCondition")}</Link>{" "}
              {t("auth.and")}{" "}
              <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>
            </p>
            <SubmitButton name={t("register")} loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
