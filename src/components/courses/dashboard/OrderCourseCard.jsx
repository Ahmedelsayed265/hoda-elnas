import React from "react";
import { BASE_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import timer from "../../../assets/images/timer.svg";

const OrderCourseCard = ({ order }) => {
  const { t } = useTranslation();
  return (
    <div className="custom-card">
      <div className="blur_overLay">
        <img src={timer} alt="timer" />
        <p>{t("joinRequestInReview")}</p>
      </div>
      <div className="img">
        <img
          src={`${BASE_URL}${order?.course_details?.background}`}
          alt="course"
        />
      </div>
      <div className="content">
        <div className="d-flex align-items-start justify-content-between">
          <h4 className="smallhead">{order?.course_details?.name}</h4>
        </div>
        <h6>{order?.plan}</h6>
        <p className="sno">
          <b>
            <i className="fa-duotone fa-users"></i>
            {t("courseSubscribe.subscribersNumer")}
          </b>
          <span>{order?.student_number}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCourseCard;
