import React from "react";
import { useTranslation } from "react-i18next";
import levelIcon from "../../../../assets/images/level.svg";
const GoalDetails = () => {
  const { t } = useTranslation();
  return (
    <div className="goal_details">
      <div className="inner_wrap">
        <div className="start">
          <div className="circle">
            <h5>{t("dashboard.start")}</h5>
          </div>
        </div>
        <ul className="goal_steps">
          <li className="level">
            <div className="circle">
              <img src={levelIcon} alt="level" />
            </div>
            <span>Level 1</span>
          </li>
          <li className="step">2</li>
          <li className="step">3</li>
          <li className="step">4</li>
          <li className="step">5</li>
        </ul>
        <div className="goal_end">
          <h5>{t("dashboard.end")}</h5>
        </div>
      </div>
    </div>
  );
};

export default GoalDetails;
