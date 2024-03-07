import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import InputField from "../components/ui/form-elements/InputField";
import SubmitButton from "../components/ui/form-elements/SubmitButton";
import PhoneField from "../components/ui/form-elements/PhoneField";
import ImageUpload from "./../components/ui/form-elements/ImageUpload";

const Register = () => {
  const [loading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null
  });
  const { t } = useTranslation();

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
          <form className="form-ui">
            <ImageUpload formData={formData} setFormData={setFormData} />
            {/* name */}
            <InputField
              label={t("auth.name")}
              placeholder={t("auth.namePlaceHolder")}
              htmlFor="name"
              value={formData.name}
              formData={formData}
              id={"name"}
              setFormData={setFormData}
              icon={<i className="fa-light fa-user"></i>}
            />
            {/* email */}
            <InputField
              label={t("auth.email")}
              placeholder={t("auth.emailPlaceHolder")}
              htmlFor="email"
              value={formData.email}
              formData={formData}
              id={"emial"}
              setFormData={setFormData}
              icon={<i className="fa-light fa-envelope"></i>}
            />
            {/* phone */}
            <PhoneField
              label={t("auth.phone")}
              icon={<i className="fa-sharp fa-light fa-phone"></i>}
              formData={formData}
              setFormData={setFormData}
              value={formData.phone}
              id="phone"
            />
            {/* agreement and submit */}
            <div className="d-flex justify-content-center">
              <p className="continue">
                {t("auth.byContinue")}{" "}
                <Link to="/terms-conditions">
                  {t("auth.termsAndCondition")}
                </Link>{" "}
                {t("auth.and")}{" "}
                <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>{" "}
                {t("auth.reltiveToApp")}
              </p>
            </div>
            <SubmitButton name={t("register")} loading={loading} />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
