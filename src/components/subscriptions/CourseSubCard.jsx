import React from "react";
import { BASE_URL } from "../../constants";
import { useTranslation } from "react-i18next";

const CourseSubCard = ({
  subscription,
  onCancel,
  onRenewOrder,
  onUpgradeOrder
}) => {
  const { t } = useTranslation();
  return (
    <div className="custom-card">
      <div className="img">
        <div
          className="label"
          style={{ background: subscription?.status_color }}
        >
          <span>{subscription?.status}</span>
        </div>
        <img src={`${BASE_URL}${subscription?.background}`} alt="course" />
      </div>
      <div className="content">
        <div className="d-flex align-items-start justify-content-between">
          <h4 className="smallhead">{subscription?.course_name}</h4>
        </div>
        <h6>{subscription?.plan_name}</h6>
        <p className="sno mb-1">
          <b>
            <i className="fa-duotone fa-users"></i>
            {t("courseSubscribe.subscribersNumer")}
          </b>
          <span>{subscription?.student_number}</span>
        </p>
        <p className="sno mb-1">
          <b>
            <i className="fa-duotone fa-calendar-days"></i>
            {t("renewDate")}
          </b>
          <p>{subscription?.renewingtdate}</p>
        </p>
        <div className="buttons">
          <button onClick={onRenewOrder}>{t("renewSub")}</button>
          {subscription?.status_check !== "cancelled" &&
            subscription?.status_check !== "expired" && (
              <button className="cancel" onClick={onCancel}>
                {t("cancelSub")}
              </button>
            )}
          <button onClick={onUpgradeOrder} className="upgrade">
            {t("upgradeSub")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSubCard;
