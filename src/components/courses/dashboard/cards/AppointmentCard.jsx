import React from "react";
import man from "../../../../assets/images/man.svg";
import student from "../../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";

const AppointmentCard = () => {
  const { t } = useTranslation();
  return (
    <div className="appointment_card">
      <div className="d-flex justify-content-between">
        <div className="name_img">
          <div className="img">
            <img src={student} alt="instructor" />
          </div>
          <h6>{t("dashboard.student")}: محمد علي</h6>
        </div>
        <div className="name_img">
          <div className="img">
            <img src={man} alt="instructor" />
          </div>
          <h6>{t("dashboard.instructor")}: محمد علي</h6>
        </div>
      </div>
      <h5>{t("dashboard.commingAppointment")}</h5>
      <div className="countDownTimer">
        <div className="block">
          <span className="count">00</span>
          <span>{t("dashboard.days")}</span>
        </div>
        <div className="block">
          <span className="count">00</span>
          <span>{t("dashboard.hours")}</span>
        </div>
        <div className="block">
          <span className="count">00</span>
          <span>{t("dashboard.minutes")}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
