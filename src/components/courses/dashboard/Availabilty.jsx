import React from "react";
import { useTranslation } from "react-i18next";
import fixed from "../../../assets/images/fixed-timing.svg";
import flexible from "../../../assets/images/flexible-timing.svg";

const Availabilty = ({ formData, setFormData, setStep }) => {
  const { t } = useTranslation();
  return (
    <div className="row m-0">
      <div className="col-6 p-2">
        <label htmlFor="fixedAppointments" className="appontementheck">
          <input
            type="radio"
            id="fixedAppointments"
            name="appointmentsType"
            checked={formData.appointmentsType === "fixed"}
            onChange={() =>
              setFormData({ ...formData, appointmentsType: "fixed" })
            }
          />
          <div className="content">
            <img src={fixed} alt="fixed" />
            <h4>{t("dashboard.fixedAppointments")}</h4>
          </div>
        </label>
      </div>
      <div className="col-6 p-2">
        <label htmlFor="flexibleAppointments" className="appontementheck">
          <input
            type="radio"
            id="flexibleAppointments"
            name="appointmentsType"
            checked={formData.appointmentsType === "flexible"}
            onChange={() =>
              setFormData({ ...formData, appointmentsType: "flexible" })
            }
          />
          <div className="content">
            <img src={flexible} alt="flexible" />
            <h4>{t("dashboard.flexibleAppointments")}</h4>
          </div>
        </label>
      </div>
      <div className="col-12 p-2 d-flex justify-content-end">
        <button className="continue" onClick={() => setStep(2)}>
          {t("dashboard.next")}
        </button>
      </div>
    </div>
  );
};

export default Availabilty;
