import React from "react";
import { useTranslation } from "react-i18next";

const Goal = ({ formData, setFormData, setStep, goals }) => {
  const { t } = useTranslation();

  return (
    <div className="row m-0 form-ui">
      <div className="col-12 p-2">
        <div className="timingRow">
          <div className="input-field">
            <label htmlFor="goal">{t("dashboard.goal")}</label>
            <select
              name="goal"
              id="goal"
              value={formData.goal_id}
              onChange={(e) =>
                setFormData({ ...formData, goal_id: Number(e.target.value) })
              }
            >
              <option value="" disabled>
                {t("dashboard.choose")}
              </option>
              {goals.map((goal) => {
                return (
                  <option key={goal.id} value={goal.id}>
                    {goal.name}
                  </option>
                );
              })}
            </select>
          </div>
          {goals?.find((g) => g.id === formData.goal_id)?.custom_options
            ?.length > 0 && (
            <div className="input-field">
              <label htmlFor="surah">{t("dashboard.chooseSurah")}</label>
              <select
                name="surah"
                id="surah"
                value={formData.custom_option_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    custom_option_id: Number(e.target.value)
                  })
                }
              >
                <option value="" disabled>
                  {t("dashboard.choose")}
                </option>
                {goals
                  .find((g) => g.id === formData.goal_id)
                  ?.custom_options.map((option) => {
                    return (
                      <option key={option.id} value={option.id}>
                        {option.option}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}
          <div className="input-field">
            <label htmlFor="goalLevel">{t("dashboard.goalLevel")}</label>
            <select
              name="goalLevel"
              id="goalLevel"
              value={formData.option_id}
              onChange={(e) =>
                setFormData({ ...formData, option_id: Number(e.target.value) })
              }
            >
              <option value="" disabled>
                {t("dashboard.choose")}
              </option>
              {goals
                .find((g) => g.id === formData.goal_id)
                ?.options.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.option}
                    </option>
                  );
                })}
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
