import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import levelIcon from "../../../../assets/images/level.svg";
import lock from "../../../../assets/images/lock.svg";
import stepIcon from "../../../../assets/images/step.png";
import axios from "./../../../../util/axios";
import { useParams } from "react-router-dom";
import DataLoader from "./../../../ui/DataLoader";
import PopUp from "./PopUp";
import StepPopUp from "./StepPopUp";

const GoalDetails = () => {
  const [levels, setLevels] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showStepPopUp, setShowStepPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [targetLevel, setTargetLevel] = useState({});
  const [targetStep, setTargetStep] = useState({});
  const { goalId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `members/List_student_levels/?student_goal_id=${goalId}`
        );
        if (response.status === 200) {
          setLevels(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [goalId]);

  const handleShowPopUp = (target) => {
    setShowPopUp(true);
    setTargetLevel(target);
  };

  const handleShowStepPopUp = (target) => {
    setShowStepPopUp(true);
    setTargetStep(target);
  };

  return (
    <div className="goal_details">
      <div className="inner_wrap">
        <div className="start">
          <div className="circle">
            <h5>حفظ القرآن الكريم</h5>
          </div>
        </div>
        {loading ? (
          <DataLoader />
        ) : (
          <ul className="goal_steps">
            {levels?.map((level) => (
              <Fragment key={level?.level_id}>
                <li className="level" onClick={() => handleShowPopUp(level)}>
                  <div className="circle">
                    <img src={levelIcon} alt="level" />
                  </div>
                  <span>{level?.level_name}</span>
                </li>
                {level?.steps?.map((step) => (
                  <li
                    className="step"
                    key={step?.step_id}
                    onClick={() => handleShowStepPopUp(step)}
                  >
                    <div className="circle">
                      <img src={lock} alt="lock" />
                    </div>
                    <div className="content">
                      <h6>{step?.step_name}</h6>
                      <img src={stepIcon} alt="step" />
                    </div>
                  </li>
                ))}
              </Fragment>
            ))}
          </ul>
        )}
        <div className="goal_end">
          <h5>{t("dashboard.end")}</h5>
        </div>
      </div>
      <PopUp
        showModal={showPopUp}
        setShowModal={setShowPopUp}
        target={targetLevel}
      />
      <StepPopUp
        showModal={showStepPopUp}
        setShowModal={setShowStepPopUp}
        target={targetStep}
      />
    </div>
  );
};

export default GoalDetails;
