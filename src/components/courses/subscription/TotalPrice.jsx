import React from "react";
import { useTranslation } from "react-i18next";

const TotalPrice = ({
  validCopun,
  totalPrice,
  location,
  formData,
  currency
}) => {
  const { t } = useTranslation();
  return (
    <div className="total">
      {validCopun && (
        <span className="discount">
          {t("courseSubscribe.discount")} {formData?.discont_percent}%{" "}
          {t("courseSubscribe.copoun")} {formData?.copun_name}
        </span>
      )}
      <div className="price">
        <h3>{t("courseSubscribe.total")}:</h3>
        {currency ? (
          <span>
            {totalPrice} {currency}
          </span>
        ) : (
          <span>
            {totalPrice}{" "}
            {location === "EG"
              ? t("courseSubscribe.egyptianPound")
              : t("courseSubscribe.dollar")}
          </span>
        )}
      </div>
    </div>
  );
};

export default TotalPrice;
