import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from './../../../../util/axios';

const Goal = ({ formData, setFormData, setStep }) => {
  const { t } = useTranslation();
  const [goals , setGoals] = useState([]);
  useEffect(() => {
    try {
      const reponse = axios.get("/learningcenter/List_goal/");
      reponse.then((res) => {
        setGoals(res.data.message);
      });
    } catch (error) {
      console.log("error =>", error);
    }
  }, []);
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
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="goal">{t("dashboard.chooseSurah")}</label>
            <select name="goal" id="goal">
              <option value="" disabled>
                {t("dashboard.choose")}
              </option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="goal">{t("dashboard.goalLevel")}</label>
            <select name="goal" id="goal">
              <option value="" disabled>
                {t("dashboard.choose")}
              </option>
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
