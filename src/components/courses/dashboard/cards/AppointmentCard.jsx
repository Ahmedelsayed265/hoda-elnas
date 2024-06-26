import React, { useState, useEffect } from "react";
import man from "../../../../assets/images/man.svg";
import student from "../../../../assets/images/student.svg";
import axios from "./../../../../util/axios";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { DAYS_AR, DAYS_EN } from "../../../../constants";
import { useTimeFormatting } from "../../../../hooks/useTimeFormatting";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setLink } from "../../../../redux/slices/vConnectLink";

const AppointmentCard = ({ appointment, handleEdit, handleCancel }) => {
  const { t } = useTranslation();
  const [enable, setEnable] = useState(true);
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();
  const { lang } = useSelector((state) => state.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleJoinSession = async (id) => {
    const res = await axios.post(
      `instructor/Student_join_session/?day_id=${id}`
    );
    if (res?.status === 200 || res?.status === 201) {
      const meetingLink = res?.data?.message?.meeting_link;
      const host = res?.data?.message?.host;
      if (host !== "vconnect") {
        window.open(meetingLink, "_blank");
      } else {
        console.log(meetingLink);
        dispatch(setLink(meetingLink));
        navigate(`/join-session`);
      }
    } else {
      toast.error(res?.response?.data?.message);
    }
  };

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
      if (
        countDown.days === 0 &&
        countDown.hours === 0 &&
        countDown.minutes === 5
      ) {
        setEnable(true);
      }
    }, 1000);
  }, [nextoccurence]);

  return (
    <div className="appointment_card">
      <div className="d-flex justify-content-between">
        <div className="name_img">
          <div className="img">
            <img
              src={
                appointment?.student_details?.student_img
                  ? appointment?.student_details?.student_img
                  : student
              }
              alt="instructor"
            />
          </div>
          <h6>
            {t("dashboard.student")}: {appointment?.student_details?.name}
          </h6>
        </div>
        <div className="name_img">
          <div className="img">
            <img
              src={
                appointment?.instructor_details?.instructor_img
                  ? appointment?.instructor_details?.instructor_img
                  : man
              }
              alt="instructor"
            />
          </div>
          <h6>
            {t("dashboard.instructor")}: {appointment?.instructor_details?.name}
          </h6>
        </div>
      </div>
      <h5>
        {t("dashboard.commingAppointment")} {t("day")}: {appointment?.day},{" "}
        {t("hour")}:{" "}
        {lang === "ar"
          ? translateToArabic(convertTo12HourFormat(appointment?.starttime))
          : convertTo12HourFormat(appointment?.starttime)}
      </h5>
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
      <div className="d-flex gap-2">
        <button
          className={enable ? "w-100" : "w-100 disabled"}
          onClick={() => handleJoinSession(appointment?.id)}
        >
          {t("dashboard.joinNow")}
        </button>
        <button
          className="cancel"
          onClick={() => handleCancel(appointment?.id)}
        >
          {t("dashboard.cancelAppointement")}
        </button>
        <button className="edit" onClick={() => handleEdit(appointment?.id)}>
          {t("dashboard.editAppointment")}
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
