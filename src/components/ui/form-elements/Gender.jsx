import React from "react";
import { useTranslation } from "react-i18next";
import female from "../../../assets/images/female.svg";
import male from "../../../assets/images/male.svg";

export default function Gender({ formData, setFormData, noLabel, dataKey }) {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({ ...formData, [dataKey]: e.target.value });
  };

  return (
    <div className="gender_select w-100">
      {!noLabel && (
        <label>
          <i className="fa-regular fa-venus-mars"></i> {t("auth.gender")}
        </label>
      )}
      <div>
        <label
          htmlFor="female"
          className={`gender_card ${
            formData[dataKey] === "female" ? "active" : ""
          }`}
        >
          <input
            onChange={handleChange}
            type="radio"
            name="gender"
            value="female"
            id="female"
            checked={formData[dataKey] === "female"}
            aria-label={t("auth.female")}
          />
          <img src={female} alt="female" /> {t("auth.female")}
        </label>
        <label
          htmlFor="male"
          className={`gender_card ${
            formData[dataKey] === "male" ? "active" : ""
          }`}
        >
          <input
            onChange={handleChange}
            type="radio"
            value="male"
            name="gender"
            id="male"
            checked={formData[dataKey] === "male"}
            aria-label={t("auth.male")}
          />
          <img src={male} alt="male" /> {t("auth.male")}
        </label>
      </div>
    </div>
  );
}
