import React from "react";
import PhoneField from "../../../ui/form-elements/PhoneField";
import InputField from "../../../ui/form-elements/InputField";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInfo = ({ formData, setFormData, setStepName }) => {
  const { t } = useTranslation();

  const handleNext = () => {
    const { first_name, last_name, email, phone_number } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!first_name || !last_name || !email || !phone_number) {
      toast.error(t("courseSubscribe.fillAllFields"));
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error(t("courseSubscribe.invalidEmail"));
      return;
    }

    setStepName("payment_method");
  };

  return (
    <div className="row m-0">
      <div className="col-12 p-2">
        <form className="form-ui">
          <div className="form_group">
            <div className="input-field">
              <label htmlFor="firstName">{t("auth.firstName")}</label>
              <input
                placeholder={t("auth.abdallah")}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.first_name}
                required
                onChange={(e) => {
                  setFormData({ ...formData, first_name: e.target.value });
                }}
              />
            </div>
            <div className="input-field">
              <label htmlFor="firstName">{t("auth.lastName")}</label>
              <input
                placeholder={t("auth.rashed")}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.last_name}
                required
                onChange={(e) => {
                  setFormData({ ...formData, last_name: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="form_group">
            <InputField
              label={t("auth.email")}
              placeholder={t("auth.emailPlaceHolder")}
              htmlFor="email"
              type="email"
              value={formData.email}
              formData={formData}
              id={"email"}
              setFormData={setFormData}
              icon={<i className="fa-light fa-envelope"></i>}
            />
            <PhoneField
              label={t("auth.phone")}
              icon={<i className="fa-sharp fa-light fa-phone"></i>}
              formData={formData}
              setFormData={setFormData}
              value={formData.phone_number}
              id="phone_number"
            />
          </div>
        </form>
      </div>
      <div className="col-12 p-2 mt-3 d-flex justify-content-end">
        <button className="w-25 save_btn" onClick={handleNext}>
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
