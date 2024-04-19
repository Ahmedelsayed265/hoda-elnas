import React from "react";
import { useTranslation } from "react-i18next";
import fixed from "../../../../assets/images/fixed-timing.svg";
import flexible from "../../../../assets/images/flexible-timing.svg";

const Availabilty = ({ timeOptions, setTimeOptions, setStep }) => {
  const { t } = useTranslation();
  return (
    <div className="row m-0">
      <div className="col-6 p-2">
        <label htmlFor="fixedAppointments" className="appontementheck">
          <input
            type="radio"
            id="fixedAppointments"
            name="time_option"
            checked={timeOptions === "specific"}
            onChange={() => setTimeOptions("specific")}
          />
          <div className="content">
            <img src={fixed} alt="specific" />
            <h4>{t("dashboard.fixedAppointments")}</h4>
          </div>
        </label>
      </div>
      <div className="col-6 p-2">
        <label htmlFor="flexibleAppointments" className="appontementheck">
          <input
            type="radio"
            id="flexibleAppointments"
            name="time_option"
            checked={timeOptions === "range"}
            onChange={() => setTimeOptions("range")}
          />
          <div className="content">
            <img src={flexible} alt="range" />
            <h4>{t("dashboard.flexibleAppointments")}</h4>
          </div>
        </label>
      </div>
      <div className="col-12 p-2 d-flex justify-content-between">
        <button className="back" onClick={() => setStep(1)}>
          {t("dashboard.back")}
        </button>
        <button className="continue" onClick={() => setStep(3)}>
          {t("dashboard.next")}
        </button>
      </div>
    </div>
  );
};

export default Availabilty;
