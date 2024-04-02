import React from "react";
import debitCard from "../../assets/images/debit_card.svg";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../constants";

const SelectPayMethod = ({ setStepName, setMethod, formData }) => {
  const { t } = useTranslation();
  return (
    <div className="select_pay_method">
      <div className="container p-0">
        <div className="row m-0">
          {formData?.paymentMethods.map((me) => {
            console.log(me);
            return (
              <div className="col-lg-6 col-12 p-2">
                <label htmlFor={me?.id} className="pay_method">
                  <input
                    type="radio"
                    name="payment_method"
                    id={me?.id}
                    
                    onChange={() => setMethod(me?.attribute)}
                  />
                  <div className="content">
                    <div className="icon_title">
                      <img
                        src={`${BASE_URL}${me?.icon}` || debitCard}
                        alt="debit_card"
                      />
                      <h6>{me?.title}</h6>
                    </div>
                    <p>{me?.description}</p>
                    {me?.payone && (
                      <p className="payUserName">
                        <span>{t("payone")}</span> {me?.payone}
                      </p>
                    )}
                  </div>
                </label>
              </div>
            );
          })}
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
