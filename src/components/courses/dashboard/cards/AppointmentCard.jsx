import React, { useState, useEffect } from "react";
import man from "../../../../assets/images/man.svg";
import student from "../../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DAYS_AR, DAYS_EN } from "../../../../constants";

const AppointmentCard = ({ appointment }) => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);

  const [remainingTime, setRemainingTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  function getNextOccurrence(day, hour, minute, second) {
    const now = new Date();
    const targetDayIndex =
      lang === "ar" ? DAYS_AR.indexOf(day) : DAYS_EN?.indexOf(day);
    let nextOccurrence = new Date(now);
    nextOccurrence.setDate(
      now.getDate() + ((targetDayIndex + 7 - now.getDay()) % 7)
    );
    nextOccurrence.setHours(hour, minute, second, 0);
    if (nextOccurrence <= now) {
      nextOccurrence.setDate(nextOccurrence.getDate() + 7);
    }
    return nextOccurrence;
  }

  function calculateCountdown(targetDate) {
    const now = new Date();
    const difference = targetDate - now;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  const hours = appointment?.starttime.split(":")[0];
  const minutes = appointment?.starttime.split(":")[1];
  const seconds = appointment?.starttime.split(":")[2];

  const nextoccurence = getNextOccurrence(
    appointment?.day,
    hours,
    minutes,
    seconds
  );

  useEffect(() => {
    setInterval(function () {
      const countDown = calculateCountdown(nextoccurence);
      setRemainingTime({
        days: countDown.days,
        hours: countDown.hours,
        minutes: countDown.minutes,
        seconds: countDown.seconds
      });
    }, 1000);
  }, [nextoccurence]);

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
          <span className="count">{remainingTime.days}</span>
          <span>{t("dashboard.days")}</span>
        </div>
        <div className="block">
          <span className="count">{remainingTime.hours}</span>
          <span>{t("dashboard.hours")}</span>
        </div>
        <div className="block">
          <span className="count">{remainingTime.minutes}</span>
          <span>{t("dashboard.minutes")}</span>
        </div>
        <div className="block">
          <span className="count">{remainingTime.seconds}</span>
          <span>{t("dashboard.seconds")}</span>
        </div>
      </div>
      <button className="disabled">{t("dashboard.joinNow")}</button>
    </div>
  );
};

export default AppointmentCard;
