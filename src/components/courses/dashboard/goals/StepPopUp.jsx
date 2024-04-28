import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import StarsList from "../../../layout/StarsList";
import { useParams } from "react-router-dom";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";

const StepPopUp = ({
  showModal,
  setShowModal,
  target,
  level,
  setLevels,
  index,
  levels
}) => {
  const { t } = useTranslation();
  const { goalId } = useParams();
  const [checked, setChecked] = useState(false);

  const prevStepIndex = index > 0 ? index - 1 : null;
  const prevStep = prevStepIndex !== null ? level.steps[prevStepIndex] : null;

  const payload = {
    student_goal_id: goalId,
    level_id: level?.level_id,
    grade: 5,
    step_id: target?.step_id
  };

  const handleCheck = async (e) => {
    setChecked(e.target.checked);
    if (!prevStep || !prevStep.step_status.checked) {
      toast.error(t("dashboard.youDidn'tReachThisStep"));
      setChecked(false);
      return;
    }
    try {
      const response = await axios.post(
        "/members/Create_student_progress/",
        payload
      );
      if (response.status === 200) {
        const updatedSteps = level.steps.map((step) => {
          if (step.step_id === target.step_id) {
            return response.data.object[0];
          }
          return step;
        });
        const updatedLevels = levels.map((lvl) => {
          if (lvl.level_id === level.level_id) {
            return { ...lvl, steps: updatedSteps };
          }
          return lvl;
        });
        setLevels(updatedLevels);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(target);
    if (target?.step_status?.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [target?.step_status?.checked, target]);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {target?.step_name}{" "}
          {target?.step_status?.checked === true && (
            <span className="completed">( {t("dashboard.completed")} )</span>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-modal">
        <ul>
          {target?.step_description?.split("\r\n").map((des, index) => (
            <li key={index}> {des}</li>
          ))}
        </ul>
        {target?.step_status?.checked === true && (
          <div className="d-flex gap-2 align-items-center">
            <span className="completed">{t("dashboard.rate")}: </span>
            <StarsList rate={target?.step_status?.grade} />
          </div>
        )}
        {target?.step_evaluator === "student" && (
          <div className="d-flex gap-2 align-items-center pt-3">
            <input
              type="checkbox"
              name="finished"
              id="finished"
              checked={checked}
              onChange={(e) => handleCheck(e)}
            />
            <label htmlFor="finished">
              {t("dashboard.didYouFinishFromThisStep")}
            </label>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default StepPopUp;
