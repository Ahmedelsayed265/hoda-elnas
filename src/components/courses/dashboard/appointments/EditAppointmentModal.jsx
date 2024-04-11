import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useTimeFormatting } from "../../../../hooks/useTimeFormatting";
import { useSelector } from "react-redux";
import { DAYS_AR, DAYS_EN } from "../../../../constants";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const EditAppointmentModal = ({ showModal, setShowModal, rowData }) => {
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    day: "",
    time: ""
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      day:
        lang === "ar"
          ? DAYS_AR.indexOf(rowData?.day)
          : DAYS_EN.indexOf(rowData?.day),
      time: rowData?.starttime
    }));
  }, [lang, rowData?.day, rowData?.starttime]);

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
        <from className="form-ui">
          <div className="timingRow d-flex gap-2">
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
              <label htmlFor="appointment">{t("dashboard.appointment")}</label>
              <input
                type="time"
                placeholder="Select a time"
                name="appointment"
                id="appointment"
                required
                value={formData.time}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, time: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <SubmitButton name={t("dashboard.save")} className={"continue"} />
          </div>
        </from>
      </Modal.Body>
    </Modal>
  );
};

export default EditAppointmentModal;
