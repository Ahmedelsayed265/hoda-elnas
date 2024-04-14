import React from "react";
import { useTranslation } from "react-i18next";

const AdditionalServices = ({
  course,
  location,
  formData,
  setFormData,
  pricingPlan,
  coponData
}) => {
  const { t } = useTranslation();

  const handleCheckboxChange = (e, addon) => {
    let addonPrice = location === "EG" ? addon?.fees_egp : addon?.fees_usd;
    let addonPriceWithCoupon =
      addonPrice * formData.studentsNumber * pricingPlan?.interval;
    if (coponData?.value && coponData?.discount_type === "percentage") {
      addonPriceWithCoupon =
        addonPrice *
        ((100 - coponData?.value) / 100) *
        formData.studentsNumber *
        pricingPlan?.interval;
    }
    const updatedFormData = {
      ...formData,
      totalPrice: e.target.checked
        ? formData.totalPrice + addonPriceWithCoupon
        : formData.totalPrice - addonPriceWithCoupon,
      addons: e.target.checked
        ? [...formData.addons, addon]
        : formData.addons.filter((item) => item !== addon)
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
                className="checkbox"
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
                  : t("courseSubscribe.dollar")}{" "}
                / {t("courseSubscribe.perMonth")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdditionalServices;
