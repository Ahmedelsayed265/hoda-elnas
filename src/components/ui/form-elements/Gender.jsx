import React from "react";
import { useTranslation } from "react-i18next";
import female from "../../../assets/images/female.svg";
import male from "../../../assets/images/male.svg";

export default function Gender({ formData, setFormData, noLabel, dataKey }) {
  const { t } = useTranslation();
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
          className={`gender_card ${formData[dataKey] === "female" && "active"}`}
        >
          <input
            onChange={(e) => setFormData({ ...formData, [dataKey]: e.target.id })}
            type="radio"
            name="gender"
            id="female"
          />
          <img src={female} alt="female" /> {t("auth.female")}
        </label>
        <label
          htmlFor="male"
          className={`gender_card ${formData[dataKey] === "male" && "active"}`}
        >
          <input
            onChange={(e) => setFormData({ ...formData, [dataKey]: e.target.id })}
            type="radio"
            name="gender"
            id="male"
          />
          <img src={male} alt="male" /> {t("auth.male")}
        </label>
      </div>
    </div>
  );
}
