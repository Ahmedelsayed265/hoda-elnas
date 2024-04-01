import React from "react";
import { useTranslation } from "react-i18next";
import TotalPrice from "./TotalPrice";

const CompleteProcess = ({ setStepName, formData, course , location }) => {
  const { t } = useTranslation();
  return (
    <div className="complete_process">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="subscribtion_info">
            <h4>{course?.name}</h4>
            <ul>
              <li>
                <b>
                  <i className="fa-duotone fa-users"></i>
                  {t("courseSubscribe.subscribersNumer")}
                </b>
                {formData.studentsNumber}
              </li>
              <li>
                <b>
                  <i className="fa-light fa-calendar-range"></i>
                  {t("courseSubscribe.courseDuration")}
                </b>
                {formData.courseDuration}{" "}
              </li>
              <li>
                <b>
                  <i className="fa-sharp fa-light fa-clock"></i>
                  {t("courseSubscribe.lessonsDuration")}
                </b>
                {parseFloat(formData.lessonsDuration)}{" "}
                {t("courseSubscribe.minutes")}
              </li>
              <li>
                <b>
                  <i className="fa-sharp fa-light fa-calendar-days"></i>
                  {t("courseSubscribe.startDate")}
                </b>
                {formData.startDate}
              </li>
            </ul>
            <TotalPrice
              validCopun={formData?.validCopun}
              location={location}
              formData={formData}
              totalPrice={formData?.totalPrice}
            />
          </div>
        </div>
        <div className="col-12 p-2 mt-3 d-flex justify-content-between">
          <button
            className="w-25 back_btn"
            onClick={() => setStepName("payment_method")}
          >
            {t("back")}
          </button>
          <button
            className="w-25 save_btn"
            onClick={() => setStepName("complete_process")}
          >
            {t("courseSubscribe.completeProcess")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProcess;
