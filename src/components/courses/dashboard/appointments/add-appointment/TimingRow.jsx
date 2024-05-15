import React, { useEffect, useState } from "react";
import { DAYS_AR, DAYS_EN } from "../../../../../constants";
import axios from "./../../../../../util/axios";
import { useTimeFormatting } from "../../../../../hooks/useTimeFormatting";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

const TimingRow = ({ formData, setFormData, index }) => {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      const day = DAYS_EN[formData?.appointments[index]?.day];
      if (day) {
        const res = await axios.get(
          `/instructor/Available_time_enrolled_student/?new_day=${day}&studentclass_id=${formData.student_id}`
        );
        setAvailableTimes(res?.data?.message);
      }
    };
    fetchAvailableTimes();
  }, [formData, index]);

  return (
    <div className="timingRow d-flex align-items-end gap-2" key={index}>
      <div className="input-field">
        <label htmlFor={`day${index}`}>{t("dashboard.day")}</label>
        <Form.Select
          name={`day${index}`}
          id={`day${index}`}
          required
          value={formData.appointments[index]?.day || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              appointments: prev.appointments.map((appointment, i) =>
                i === index
                  ? { ...appointment, day: e.target.value }
                  : appointment
              )
            }))
          }
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
        </Form.Select>
      </div>
      <div className="input-field">
        <Form.Select
          name={`appointment${index}`}
          id={`appointment${index}`}
          value={formData.appointments[index]?.starttime || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              appointments: prev.appointments.map((appointment, i) =>
                i === index
                  ? { ...appointment, starttime: e.target.value }
                  : appointment
              )
            }))
          }
        >
          <option value="" disabled>
            {t("dashboard.choose")}
          </option>
          {availableTimes &&
            availableTimes.map((time, timeIndex) => (
              <option key={timeIndex} value={time.start_time}>
                {t("dashboard.from")}{" "}
                {lang === "ar"
                  ? translateToArabic(convertTo12HourFormat(time.start_time))
                  : convertTo12HourFormat(time[0])}{" "}
                {t("dashboard.to")}{" "}
                {lang === "ar"
                  ? translateToArabic(convertTo12HourFormat(time.end_time))
                  : convertTo12HourFormat(time.end_time)}
              </option>
            ))}
        </Form.Select>
      </div>
    </div>
  );
};

export default TimingRow;
