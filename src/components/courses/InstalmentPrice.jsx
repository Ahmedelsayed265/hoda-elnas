import React from "react";
import { useTranslation } from "react-i18next";

const InstalmentPrice = ({ validCopun, totalPrice, location, instalment }) => {
  const { t } = useTranslation();
  return (
    <div className="total gap-0">
      {validCopun && <span className="discount">خصم 50% كوبون kito</span>}
      <div className="price">
        <h3>{t("courseSubscribe.monthlyInstallment")}:</h3>
        <span>
          {totalPrice / instalment?.payments}
          {location === "EG"
            ? t("courseSubscribe.egyptianPound")
            : t("courseSubscribe.dollar")}
        </span>
      </div>
      <span className="instalment_message">{instalment?.name}</span>
    </div>
  );
};

export default InstalmentPrice;
