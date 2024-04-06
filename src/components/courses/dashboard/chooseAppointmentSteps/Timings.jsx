import React from "react";
import { useTranslation } from "react-i18next";
import { DAYS_AR, DAYS_EN } from "../../../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Timings = ({ formData, setFormData, setStep }) => {
  const lang = useSelector((state) => state.language.lang);
  const { subscriptionId } = useParams();
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;
  const { t } = useTranslation();

  return (
    <div className="row m-0 form-ui">
      <div className="col-12 p-2">
        {formData.appointmentsType === "fixed"
          ? Array(cpw)
              .fill("")
              .map((_, index) => (
                <div className="timingRow" key={index}>
                  <div className="input-field">
                    <label htmlFor="day">{t("dashboard.day")}</label>
                    <select name="day" id="day">
                      {lang === "ar"
                        ? DAYS_AR.map((day, index) => (
                            <option value={index} key={index}>
                              {day}
                            </option>
                          ))
                        : DAYS_EN.map((day, index) => (
                            <option value={index} key={index}>
                              {day}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="input-field">
                    <label htmlFor="appointment">
                      {t("dashboard.appointment")}
                    </label>
                    <input type="time" name="appointment" id="appointment" />
                  </div>
                </div>
              ))
          : Array(cpw)
              .fill("")
              .map((_, index) => (
                <div className="timingRow" key={index}>
                  <div className="input-field">
                    <label htmlFor="day">{t("dashboard.day")}</label>
                    <select name="day" id="day">
                      {lang === "ar"
                        ? DAYS_AR.map((day, index) => (
                            <option value={index} key={index}>
                              {day}
                            </option>
                          ))
                        : DAYS_EN.map((day, index) => (
                            <option value={index} key={index}>
                              {day}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="input-field">
                    <label htmlFor="time">{t("dashboard.from")}</label>
                    <input type="time" name="from_time" id="from_time" />
                  </div>
                  <div className="input-field">
                    <label htmlFor="time">{t("dashboard.to")}</label>
                    <input type="time" name="to_time" id="to_time" />
                  </div>
                </div>
              ))}
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

export default Timings;
