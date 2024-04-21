import React from "react";
import InputField from "../../ui/InputField";
import { useTranslation } from "react-i18next";
import RadiosSelect from "../../ui/RadiosSelect";
import AdditionalServices from "../../courses/subscription/AdditionalServices";
import useUserLocation from "../../../hooks/useUserLocation";

const ChoosePricingPlans = ({
  courseObj,
  formData,
  setFormData,
  setStepName
}) => {
  const { t } = useTranslation();
  const locationData = useUserLocation();
  const location = locationData?.country;
  return (
    <div className="subscribe p-0">
      <form className="form-ui">
        <div className="form_group">
          {/* students count */}
          <InputField
            labelPlaceholder={t("courseSubscribe.subscribersNumer")}
            icon={<i className="fa-solid fa-users"></i>}
            type="number"
            placeHolder="00"
            name="studentsCount"
            // value={formData.studentsNumber}
            // handleChange={handleStudentsCountChange}
          />
          {/* lessons per week */}
          <InputField
            labelPlaceholder={t("courseSubscribe.courseDuration")}
            icon={<i className="fa-light fa-calendar-days"></i>}
            type="number"
            name="lessonsPerWeek"
            placeHolder="00"
            value={formData.courseDuration}
            handleChange={(e) =>
              setFormData({
                ...formData,
                courseDuration: e.target.value
              })
            }
          />
        </div>
        {/* lessons duration */}
        <RadiosSelect
          labelPlaceholder={t("courseSubscribe.lessonsDuration")}
          icon={<i className="fa-light fa-clock"></i>}
          name="lessonsDuration"
          checked={formData?.lessonsDuration}
          options={courseObj?.duration}
          handleChange={(e) =>
            setFormData({
              ...formData,
              lessonsDuration: e.target.value
            })
          }
          additionalInfo={t("courseSubscribe.minutes")}
        />
        {/* <div className="hide_lg">
          <CourseBenifits benefits={benefits} />
        </div> */}
        {/* subscriptions plan */}
        <RadiosSelect
          labelPlaceholder={t("courseSubscribe.subscriptionsPlan")}
          icon={<i className="fa-light fa-clock"></i>}
          name="plan"
          options={courseObj?.types}
          checked={formData?.plan}
          handleChange={(e) =>
            setFormData({
              ...formData,
              plan: e.target.value
            })
          }
        />
        <AdditionalServices
          course={courseObj}
          location={location}
          // coponData={coponData}
          // pricingPlan={pricingPlan}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="col-12 p-2 d-flex justify-content-end">
          <button
            className="w-25 save_btn"
            onClick={() => setStepName("payment_method")}
          >
            {t("next")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChoosePricingPlans;
