import React from "react";
import { useTranslation } from "react-i18next";

const NameField = ({ setFormData, formData }) => {
  const { t } = useTranslation();
  return (
    <div className="form_group">
      <div className="input-field">
        <label htmlFor="firstName">
          <i className="fa-light fa-user"></i> {t("auth.firstName")}
        </label>
        <input
          placeholder={t("auth.abdallah")}
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstname}
          required
          onChange={(e) => {
            setFormData({ ...formData, firstname: e.target.value });
          }}
        />
      </div>
      <div className="input-field">
        <label htmlFor="firstName">
          <i className="fa-light fa-user"></i> {t("auth.lastName")}
        </label>
        <input
          placeholder={t("auth.rashed")}
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastname}
          required
          onChange={(e) => {
            setFormData({ ...formData, lastname: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default NameField;
