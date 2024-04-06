import React from "react";
import { useTranslation } from "react-i18next";
import { DAYS_AR, DAYS_EN } from "../../../../constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Timings = ({ formData, setFormData, setStep }) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;
  const lang = useSelector((state) => state.language.lang);

  const handleStartTimeChange = (index, value) => {
    const updatedAppointments = [...formData.appointments];
    updatedAppointments[index].starttime = value;
    setFormData((prev) => ({ ...prev, appointments: updatedAppointments }));
  };

  const handleEndTimeChange = (index, value) => {
    const updatedAppointments = [...formData.appointments];
    updatedAppointments[index].endtime = value;
    setFormData((prev) => ({ ...prev, appointments: updatedAppointments }));
  };

  const handleContinue = () => {
    const hasEmptyField = formData.appointments.some((appointment) => {
      if (formData.time_option === "specific") {
        return !appointment.day || !appointment.starttime;
      } else {
        return (
          !appointment.day || !appointment.starttime || !appointment.endtime
        );
      }
    });
    if (hasEmptyField) {
      toast.error(t("dashboard.fillTimeTabel"));
      return;
    }
    setStep(3);
  };

  return (
    <div className="row m-0 form-ui">
      <div className="col-12 p-2">
        {formData.time_option === "specific"
          ? Array(cpw)
              .fill()
              .map((_, index) => (
                <div className="timingRow" key={index}>
                  <div className="input-field">
                    <label htmlFor="day">{t("dashboard.day")}</label>
                    <select
                      name="day"
                      id={`day-${index}`}
                      required
                      value={formData?.appointments[index]?.day}
                      onChange={(e) => {
                        const updatedAppointments = [...formData.appointments];
                        updatedAppointments[index].day = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          appointments: updatedAppointments
                        }));
                      }}
                    >
                      <option value="">{t("dashboard.choose")}</option>
                      {lang === "ar"
                        ? DAYS_AR.map((day, idx) => (
                            <option value={idx} key={idx}>
                              {day}
                            </option>
                          ))
                        : DAYS_EN.map((day, idx) => (
                            <option value={idx} key={idx}>
                              {day}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="input-field">
                    <label htmlFor="appointment">
                      {t("dashboard.appointment")}
                    </label>
                    <input
                      type="time"
                      name="appointment"
                      id={`appointment-${index}`}
                      required
                      value={formData.appointments[index].starttime}
                      onChange={(e) =>
                        handleStartTimeChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))
          : Array(cpw)
              .fill()
              .map((_, index) => (
                <div className="timingRow" key={index}>
                  <div className="input-field">
                    <label htmlFor="day">{t("dashboard.day")}</label>
                    <select
                      name="day"
                      id={`day-${index}`}
                      required
                      value={formData.appointments[index].day}
                      onChange={(e) => {
                        const updatedAppointments = [...formData.appointments];
                        updatedAppointments[index].day = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          appointments: updatedAppointments
                        }));
                      }}
                    >
                      <option value="">{t("dashboard.choose")}</option>
                      {lang === "ar"
                        ? DAYS_AR.map((day, idx) => (
                            <option value={idx} key={idx}>
                              {day}
                            </option>
                          ))
                        : DAYS_EN.map((day, idx) => (
                            <option value={idx} key={idx}>
                              {day}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className="input-field">
                    <label htmlFor="time">{t("dashboard.from")}</label>
                    <input
                      type="time"
                      name="from_time"
                      id={`from_time-${index}`}
                      required
                      value={formData.appointments[index].starttime}
                      onChange={(e) =>
                        handleStartTimeChange(index, e.target.value)
                      }
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="time">{t("dashboard.to")}</label>
                    <input
                      type="time"
                      name="to_time"
                      id={`to_time-${index}`}
                      required
                      value={formData.appointments[index].endtime}
                      onChange={(e) =>
                        handleEndTimeChange(index, e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
      </div>
      <div className="col-12 p-2 d-flex justify-content-between">
        <button className="back" onClick={() => setStep(1)}>
          {t("dashboard.back")}
        </button>
        <button className="continue" onClick={handleContinue}>
          {t("dashboard.next")}
        </button>
      </div>
    </div>
  );
};

export default Timings;
