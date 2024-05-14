import React, { useEffect, useState } from "react";
import axios from "./../../../../util/axios";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useTimeFormatting } from "../../../../hooks/useTimeFormatting";
import { useSelector } from "react-redux";
import { DAYS_AR, DAYS_EN } from "../../../../constants";
import { Form } from "react-bootstrap";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const EditAppointmentModal = ({
  showModal,
  setShowModal,
  rowData,
  onEdit,
  loading
}) => {
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    day: "",
    time: "",
    temp: false
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      day:
        lang === "ar"
          ? DAYS_AR.indexOf(rowData?.day)
          : DAYS_EN.indexOf(rowData?.day),
      temp: rowData?.temp
    }));
  }, [lang, rowData?.day, rowData?.temp]);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      const day = DAYS_EN[formData.day];
      if (day && rowData?.id) {
        const res = await axios.get(
          `/instructor/Available_time_enrolled_student/?dayid=${rowData.id}&new_day=${day}`
        );
        setAvailableTimes(res?.data?.message);
      }
    };
    fetchAvailableTimes();
  }, [formData.day, rowData.id]);

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("dashboard.editAppointment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="editAppointmentModal">
        <p className="editappointment">
          {t("dashboard.appointmentEdit")} <span>{rowData?.day}</span>{" "}
          {t("dashboard.from")}{" "}
          <span>
            {rowData?.starttime && lang === "ar"
              ? translateToArabic(convertTo12HourFormat(rowData?.starttime))
              : convertTo12HourFormat(rowData?.starttime)}
          </span>{" "}
          {t("dashboard.to")}{" "}
          <span>
            {rowData?.endtime && lang === "ar"
              ? translateToArabic(convertTo12HourFormat(rowData?.endtime))
              : convertTo12HourFormat(rowData?.endtime)}
          </span>
        </p>
        <form onSubmit={(e) => onEdit(e, formData)} className="form-ui">
          <div className="timingRow d-flex align-items-end gap-2">
            <div className="input-field">
              <label htmlFor="day">{t("dashboard.day")}</label>
              <select
                name="day"
                id="day"
                required
                value={formData.day}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, day: e.target.value }))
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
              </select>
            </div>
            <div className="input-field">
              <select
                name="appointment"
                id="saturdayAppointment"
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
              >
                <option value={""} disabled>
                  {t("dashboard.choose")}
                </option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time.start_time}>
                    {t("dashboard.from")}{" "}
                    {lang === "ar"
                      ? translateToArabic(
                          convertTo12HourFormat(time.start_time)
                        )
                      : convertTo12HourFormat(time[0])}{" "}
                    {t("dashboard.to")}{" "}
                    {lang === "ar"
                      ? translateToArabic(convertTo12HourFormat(time.end_time))
                      : convertTo12HourFormat(time.end_time)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Form.Check
            checked={formData.temp}
            label={t("dashboard.exceptionalAppointment")}
            type="switch"
            id="temp"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, temp: e.target.checked }))
            }
          />
          <div className="d-flex justify-content-end">
            <SubmitButton
              name={t("dashboard.save")}
              className={"continue"}
              loading={loading}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAppointmentModal;
