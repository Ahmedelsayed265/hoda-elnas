import React from "react";
import debitCard from "../../assets/images/debit_card.svg";
import { useTranslation } from "react-i18next";

const SelectPayMethod = ({ setStepName, method, setMethod }) => {
  const { t } = useTranslation();
  return (
    <div className="select_pay_method">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-lg-6 col-12 p-2">
            <label htmlFor="instant_payment" className="pay_method">
              <input
                type="radio"
                name="payment_method"
                id="instant_payment"
                checked={method === "instant_payment"}
                onChange={() => setMethod("instant_payment")}
              />
              <div className="content">
                <div className="icon_title">
                  <img src={debitCard} alt="debit_card" />
                  <h6>{t("courseSubscribe.instantPayment")}</h6>
                </div>
                <p>{t("courseSubscribe.instantPaymentSubTitle")}</p>
              </div>
            </label>
          </div>
          <div className="col-12 p-2 d-flex justify-content-end">
            <button
              className="w-25 save_btn"
              onClick={() => setStepName("complete_process")}
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
