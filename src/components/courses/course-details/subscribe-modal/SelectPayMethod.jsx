import React from "react";
import debitCard from "../../../../assets/images/debit_card.svg";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../../../constants";
import { toast } from "react-toastify";

const SelectPayMethod = ({
  requiresLogin,
  userId,
  setMethod,
  setStepName,
  method,
  paymentMethods
}) => {
  const { t } = useTranslation();
  const handleNext = () => {
    if (!method?.id) {
      toast.error(t("selectPayMethod"));
    } else {
      setStepName("complete_process");
    }
  };
  return (
    <div className="select_pay_method">
      <div className="container p-0">
        <div className="row m-0">
          {paymentMethods?.map((me) => {
            return (
              <div className="col-lg-6 col-12 p-2">
                <label htmlFor={me?.id} className="pay_method">
                  <input
                    type="radio"
                    name="payment_method"
                    id={me?.id}
                    onChange={() => setMethod(me)}
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
          {userId ? (
            <div className="col-12 p-2 d-flex justify-content-end">
              <button
                className="w-25 save_btn"
                onClick={handleNext}
                disabled={!method?.id}
              >
                {t("next")}
              </button>
            </div>
          ) : (
            <div className="col-12 p-2 d-flex justify-content-between">
              <button
                className="w-25 back_btn"
                onClick={() => setStepName("user_info")}
              >
                {t("back")}
              </button>
              <button
                className="w-25 save_btn"
                onClick={handleNext}
                disabled={!method?.id}
              >
                {t("next")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectPayMethod;
