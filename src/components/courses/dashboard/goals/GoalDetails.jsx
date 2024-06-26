import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import levelIcon from "../../../../assets/images/level.svg";
import lock from "../../../../assets/images/lock.svg";
import check from "../../../../assets/images/check.svg";
import axios from "./../../../../util/axios";
import DataLoader from "./../../../ui/DataLoader";
import PopUp from "./PopUp";
import StepPopUp from "./StepPopUp";
import StarsList from "../../../layout/StarsList";
import { useSelector } from "react-redux";

const GoalDetails = () => {
  const { lang } = useSelector((state) => state.language);
  const [levels, setLevels] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showStepPopUp, setShowStepPopUp] = useState(false);
  const [index, setIndex] = useState({});
  const [loading, setLoading] = useState(false);
  const [targetLevel, setTargetLevel] = useState({});
  const [level, setLevel] = useState("");
  const [targetStep, setTargetStep] = useState({});
  const [goalName, setGoalName] = useState("");
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
          setGoalName(response?.data?.object?.goal_detail?.name);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [goalId, lang]);

  const handleShowPopUp = (target) => {
    setShowPopUp(true);
    setTargetLevel(target);
  };

  const handleShowStepPopUp = (target, level, idx) => {
    setLevel(level);
    setIndex(idx);
    setShowStepPopUp(true);
    setTargetStep(target);
  };

  return (
    <div className="goal_details">
      <div className="page_title">
        <button className="back" onClick={() => window.history.back()}>
          <i className="fa-solid fa-arrow-right-long"></i>
        </button>
        <h5>{goalName}</h5>
      </div>
      <div className="inner_wrap">
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
                  <div className="content">
                    <span>{level?.level_name}</span>
                    {level?.level_status?.checked === true && (
                      <div className="d-flex gap-2 align-items-center">
                        <span className="completed">
                          {t("dashboard.completed")}
                        </span>
                        <StarsList rate={level?.level_status?.grade} />
                      </div>
                    )}
                  </div>
                </li>
                {level?.steps?.map((step, index) => (
                  <li
                    className={`step ${
                      step?.step_status?.checked === true ? "completed" : ""
                    }`}
                    key={step?.step_id}
                    onClick={() => handleShowStepPopUp(step, level, index)}
                  >
                    <div className="circle">
                      <img
                        src={step?.step_status?.checked === true ? check : lock}
                        alt="lock"
                      />
                    </div>
                    <div className="content">
                      <div className="d-flex flex-column">
                        <h6>{step?.step_name}</h6>
                        {step?.step_status?.checked === true && (
                          <div className="d-flex gap-2 align-items-center">
                            <span className="completed">
                              {t("dashboard.completed")}
                            </span>
                            <StarsList rate={step?.step_status?.grade} />
                          </div>
                        )}
                      </div>
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
        level={level}
        index={index}
        setLevels={setLevels}
        levels={levels}
      />
    </div>
  );
};

export default GoalDetails;
