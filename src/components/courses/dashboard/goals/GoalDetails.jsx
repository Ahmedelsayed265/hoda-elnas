import React from "react";
import { useTranslation } from "react-i18next";
import levelIcon from "../../../../assets/images/level.svg";
import lock from "../../../../assets/images/lock.svg";
import step from "../../../../assets/images/step.png";
const GoalDetails = () => {
  const { t } = useTranslation();
  return (
    <div className="goal_details">
      <div className="inner_wrap">
        <div className="start">
          <div className="circle">
            <h5>حفظ القرآن الكريم</h5>
          </div>
        </div>
        <ul className="goal_steps">
          <li className="level">
            <div className="circle">
              <img src={levelIcon} alt="level" />
            </div>
            <span>Level 1</span>
          </li>
          <li className="step">
            <div className="circle">
              <img src={lock} alt="lock" />
            </div>
            <div className="content">
              <h6>لا تضيع وقت قم بقراءة القران الكريم</h6>
              <img src={step} alt="step" />
            </div>
          </li>
          <li className="step">
            <div className="circle">
              <img src={lock} alt="lock" />
            </div>
            <div className="content">
              <h6>لا تضيع وقت قم بقراءة القران الكريم</h6>
              <img src={step} alt="step" />
            </div>
          </li>
          <li className="step">
            <div className="circle">
              <img src={lock} alt="lock" />
            </div>
            <div className="content">
              <h6>لا تضيع وقت قم بقراءة القران الكريم</h6>
              <img src={step} alt="step" />
            </div>
          </li>
          <li className="step">
            <div className="circle">
              <img src={lock} alt="lock" />
            </div>
            <div className="content">
              <h6>لا تضيع وقت قم بقراءة القران الكريم</h6>
              <img src={step} alt="step" />
            </div>
          </li>
        </ul>
        <div className="goal_end">
          <h5>{t("dashboard.end")}</h5>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
