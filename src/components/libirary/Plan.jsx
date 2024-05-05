import React from "react";
import { useTranslation } from "react-i18next";

const Plan = ({ plan, location, onSubscribe }) => {
  const { t } = useTranslation();
  return (
    <div className="col-lg-5 col-md-6 col-12 mb-4">
      <div className="plan">
        <h3>{plan?.name}</h3>
        <div className="line"></div>
        <ul>
          {plan?.benefits?.split("\r\n").map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
        <div className="line"></div>
        {plan?.convertion_text && (
          <p className="convertion">{plan?.convertion_text}</p>
        )}
        <div className="price_subscribe">
          <div className="price">
            <h5>
              {location === "EG" ? plan?.saleprice_egp : plan?.slaeprice_usd}{" "}
              <span>
                {location === "EG"
                  ? t("courseSubscribe.egyptianPound")
                  : t("courseSubscribe.dollar")}
              </span>
              <span>/ {plan?.interval === 12 ? t("year") : t("month")}</span>
            </h5>
            <p>
              {t("insteadOf")}{" "}
              <span>
                {location === "EG" ? plan?.price_egp : plan?.price_usd}{" "}
              </span>{" "}
              <span>
                {location === "EG"
                  ? t("courseSubscribe.egyptianPound")
                  : t("courseSubscribe.dollar")}
              </span>{" "}
            </p>
          </div>
          <button onClick={() => onSubscribe(plan)}>
            {t("sounds.subscribe")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Plan;
