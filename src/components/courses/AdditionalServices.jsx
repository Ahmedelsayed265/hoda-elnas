import React from "react";
import { useTranslation } from "react-i18next";

const AdditionalServices = ({ course, location, formData, setFormData }) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (e, addon) => {
    const updatedFormData = {
      ...formData,
      totalPrice: e.target.checked
        ? formData.totalPrice +
          (location === "EG" ? addon?.fees_egp : addon?.fees_usd)
        : formData.totalPrice -
          (location === "EG" ? addon?.fees_egp : addon?.fees_usd),
      addons: [...formData.addons, addon]
    };
    setFormData(updatedFormData);
  };

  return (
    <div className="input-filed">
      <h6>{t("courseSubscribe.additionalServices")}</h6>
      <ul>
        {course?.addons.map((addon) => (
          <li key={addon?.name}>
            <div className="check">
              <input
                type="checkbox"
                id={addon?.name}
                name={addon?.name}
                onChange={(e) => handleCheckboxChange(e, addon)}
              />
              <label htmlFor={addon?.name}>{addon?.name}</label>
            </div>
            <div className="price">
              <span>
                {location === "EG" ? addon?.fees_egp : addon?.fees_usd}{" "}
                {location === "EG"
                  ? t("courseSubscribe.egyptianPound")
                  : t("courseSubscribe.dollar")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalServices;
