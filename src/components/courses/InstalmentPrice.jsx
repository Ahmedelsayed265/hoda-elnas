import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

const InstalmentPrice = ({ validCopun, totalPrice, location, instalment }) => {
  const { t } = useTranslation();
  return (
    <div className="total gap-0">
      {validCopun && <span className="discount">خصم 50% كوبون kito</span>}
      {instalment &&
        instalment?.map((instalment, i) => (
          <Fragment key={i}>
            <div className="price">
              <div className="d-flex gap-2 installmentCheck">
                <input
                  type="radio"
                  name="instalment_type"
                  id={instalment + i}
                />
                <label htmlFor={instalment + i}>
                  <h6>
                    {instalment?.interval === "monthly"
                      ? t("courseSubscribe.monthlyInstallment")
                      : t("courseSubscribe.weeklyInstallment")}{" "}
                    :
                  </h6>
                </label>
              </div>
              <span>
                {totalPrice / instalment?.payments}{" "}
                {location === "EG"
                  ? t("courseSubscribe.egyptianPound")
                  : t("courseSubscribe.dollar")}
              </span>{" "}
            </div>
            <span className="instalment_message">{instalment?.name}</span>
          </>
        ))}
    </div>
  );
};

export default InstalmentPrice;
