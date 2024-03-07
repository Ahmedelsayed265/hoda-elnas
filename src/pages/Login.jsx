import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import InputField from "../components/ui/form-elements/InputField";
import PasswordField from "../components/ui/form-elements/PasswordField";
import SubmitButton from "./../components/ui/form-elements/SubmitButton";

const Login = () => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });
  const { t } = useTranslation();
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
          <form className="form-ui">
            <InputField
              label={t("auth.phone")}
              placeholder={t("auth.phonePlaceHolder")}
              type="tel"
              htmlFor="phone"
              value={formData.phone}
              formData={formData}
              id={"phone"}
              setFormData={setFormData}
              icon={<i className="fa-sharp fa-light fa-phone"></i>}
            />
            <PasswordField
              label={t("auth.phone")}
              placeholder={t("auth.phonePlaceHolder")}
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
        </div>
      </div>
    </section>
  );
};

export default Login;
