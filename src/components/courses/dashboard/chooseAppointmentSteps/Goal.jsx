import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "./../../../../util/axios";
import { useParams } from "react-router-dom";

const Goal = ({ formData, setFormData, setStep, studentId }) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `/members/List_student_subs/?id=${subscriptionId}`
        );
        if (response?.status === 200) {
          const courseId = response?.data?.message[0]?.course_id;
          const response2 = await axios.get(
            `/learningcenter/List_goal/?course_id=${courseId}&student_id=${studentId}`
          );
          setGoals(response2.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGoals();
  }, [studentId, subscriptionId]);

  return (
    <div className="row m-0 form-ui">
      <div className="col-12 p-2">
        <div className="timingRow">
          <div className="input-field">
            <label htmlFor="goal">{t("dashboard.goal")}</label>
            <select name="goal" id="goal">
              <option value="choose" disabled>
                {t("dashboard.choose")}
              </option>
              {/* Map through goals to render options */}
            </select>
          </div>
          {/* <div className="input-field">
            <label htmlFor="surah">{t("dashboard.chooseSurah")}</label>
            <select name="surah" id="surah">
              <option value="" disabled>
                {t("dashboard.choose")}
              </option>
            </select>
          </div> */}
          <div className="input-field">
            <label htmlFor="goalLevel">{t("dashboard.goalLevel")}</label>
            <select name="goalLevel" id="goalLevel">
              <option value="" disabled>
                {t("dashboard.choose")}
              </option>
              {/* Map through goalLevels to render options */}
            </select>
          </div>
        </div>
      </div>
      <div className="col-12 p-2 d-flex justify-content-between">
        <button className="back" onClick={() => setStep(2)}>
          {t("dashboard.back")}
        </button>
        <button className="continue" onClick={() => setStep(4)}>
          {t("dashboard.next")}
        </button>
      </div>
    </div>
  );
};

export default Goal;
