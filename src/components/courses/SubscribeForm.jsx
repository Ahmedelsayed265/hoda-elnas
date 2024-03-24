import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useUserLocation from "../../hooks/useUserLocation";
import axios from "./../../util/axios";
import AdditionalServices from "./AdditionalServices";
import TotalPrice from "./TotalPrice";

const SubscribeForm = ({ course }) => {
  const { t } = useTranslation();
  const locationData = useUserLocation();
  const location = locationData?.country;

  const [pricingPlans, setPricingPlans] = useState([]);
  const [pricingPlan, setPricingPlan] = useState({});
  const [paymethod, setPaymethod] = useState(
    t("courseSubscribe.imeddiatePayment")
  );
  const [formData, setFormData] = useState({
    studentsNumber: 1,
    courseDuration: 1,
    validCopun: "",
    lessonsDuration: "",
    plan: "",
    totalPrice: 0
  });
  useEffect(() => {
    if (course) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        plan: course?.types[0],
        lessonsDuration: course?.duration[0]
      }));
    }
  }, [course]);

  // get pricing plans
  useEffect(() => {
    const getPricing = async () => {
      try {
        const response = await axios.get(
          `/learningcenter/list_pricingplans/?course_slug=${course?.slug}`
        );
        setPricingPlans(response?.data?.message);
      } catch (error) {
        console.error(error);
      }
    };
    getPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.slug]);

  // find pricing plan
  useEffect(() => {
    const findPricingPlan = (cpw, type, duration) => {
      const plan = pricingPlans?.find(
        (plan) =>
          plan?.cpw === +cpw &&
          plan?.type === type &&
          plan?.duration === duration
      );
      setPricingPlan(plan);
      location === "EG"
        ? setFormData({ ...formData, totalPrice: plan?.price_egp })
        : setFormData({ ...formData, totalPrice: plan?.price_usd });
    };
    findPricingPlan(
      formData?.courseDuration,
      formData?.plan,
      formData?.lessonsDuration
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData?.courseDuration,
    formData?.plan,
    formData?.lessonsDuration,
    pricingPlans
  ]);

  return (
    <form className="form-ui">
      {/* students count and lessons per week */}
      <div className="form_group">
        {/* students count */}
        <div className="input-field">
          <label htmlFor="studentsNumber">
            <i className="fa-solid fa-users"></i>
            {t("courseSubscribe.subscribersNumer")}
          </label>
          <input
            type="number"
            name="studentsNumber"
            id="studentsNumber"
            min="1"
            max="100"
            value={formData.studentsNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                studentsNumber: e.target.value,
                totalPrice: formData.totalPrice * +e.target.value
              })
            }
            placeholder="00"
          />
        </div>
        {/* lessons per week */}
        <div className="input-field">
          <label htmlFor="courseDuration">
            <i className="fa-light fa-calendar-days"></i>
            {t("courseSubscribe.courseDuration")}
          </label>
          <input
            type="number"
            name="courseDuration"
            id="courseDuration"
            min="1"
            max="100"
            value={formData.courseDuration}
            onChange={(e) =>
              setFormData({
                ...formData,
                courseDuration: e.target.value
              })
            }
            placeholder="00"
          />
        </div>
      </div>
      {/* discount */}
      <div className="form_group">
        {/* discount */}
        <div className="input-field">
          <label htmlFor="discountCopon">
            <i className="fa-light fa-tag"></i>
            {t("courseSubscribe.discountCopon")}
          </label>
          <input
            type="text"
            name="discountCopon"
            id="discountCopon"
            placeholder="Example : kid1234"
          />
        </div>
        {/* friend copon */}
        <div className="input-field">
          <label htmlFor="friendCopon">
            <i className="fa-light fa-tag"></i>
            {t("courseSubscribe.friendCopon")}
          </label>
          <input
            type="number"
            name="friendCopon"
            id="friendCopon"
            placeholder="Example : kid1234"
          />
        </div>
      </div>
      {/* lessons duration */}
      <div className="input-field">
        <label htmlFor="lessonsDuration">
          <i className="fa-light fa-clock"></i>
          {t("courseSubscribe.lessonsDuration")}
        </label>
        <div className="time-group">
          {course?.duration?.map((duration, index) => (
            <label
              htmlFor={duration + "min"}
              key={index}
              className="duration_check"
            >
              <input
                type="radio"
                name="duration"
                id={duration + "min"}
                value={duration}
                checked={formData?.lessonsDuration === duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lessonsDuration: e.target.value
                  })
                }
              />
              <div className="time">
                <span>{parseFloat(duration)} </span>
                <span>{t("courseSubscribe.minutes")}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* subscriptions plan */}
      <div className="input-field">
        <label htmlFor="lessonsDuration">
          <i className="fa-light fa-clock"></i>
          {t("courseSubscribe.subscriptionsPlan")}
        </label>
        <div className="time-group">
          {course?.types.map((plan, index) => (
            <label htmlFor={plan} key={index} className="duration_check">
              <input
                type="radio"
                name="plan"
                id={plan}
                value={plan}
                checked={formData?.plan === plan}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    plan: e.target.value
                  })
                }
              />
              <div className="time">
                <span>{plan} </span>
              </div>
            </label>
          ))}
        </div>
      </div>
      <AdditionalServices
        course={course}
        location={location}
        formData={formData}
        setFormData={setFormData}
      />
      {paymethod === t("courseSubscribe.imeddiatePayment") && (
        <TotalPrice
          validCopun={formData?.validCopun}
          location={location}
          totalPrice={formData?.totalPrice}
        />
      )}
      <button className="save w-50">{t("courseSubscribe.subscribe")}</button>
    </form>
  );
};

export default SubscribeForm;
