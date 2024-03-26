import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TotalPrice from "./TotalPrice";
import AdditionalServices from "./AdditionalServices";
import useUserLocation from "../../hooks/useUserLocation";
import RadiosSelect from "./RadiosSelect";
import InputField from "./InputField";
import InstalmentPrice from "./InstalmentPrice";
import { Link } from "react-router-dom";

const SubscribeForm = ({ course, pricingPlans, formData, setFormData }) => {
  const { t } = useTranslation();
  const locationData = useUserLocation();
  const location = locationData?.country;
  const [pricingPlan, setPricingPlan] = useState({});
  const [paymethod, setPaymethod] = useState(
    t("courseSubscribe.imeddiatePayment")
  );

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
        ? setFormData({
            ...formData,
            price: plan?.price_egp,
            totalPrice:
              plan?.price_egp * formData?.studentsNumber +
              formData?.addons?.reduce(
                (total, addon) => total + addon?.fees_egp,
                0
              )
          })
        : setFormData({
            ...formData,
            price: plan?.price_usd,
            totalPrice:
              plan?.price_usd * formData?.studentsNumber +
              formData?.addons?.reduce(
                (total, addon) => total + addon?.fees_usd,
                0
              )
          });
      setPaymethod(t("courseSubscribe.imeddiatePayment"));
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

  // handle students count change
  const handleStudentsCountChange = (e) => {
    const studentsNumber = e.target.value;
    const totalPrice = studentsNumber
      ? formData.price * +studentsNumber
      : formData.price;
    setFormData((prevFormData) => ({
      ...prevFormData,
      studentsNumber,
      totalPrice
    }));
  };

  return (
    <form className="form-ui">
      <div className="form_group">
        {/* students count */}
        <InputField
          labelPlaceholder={t("courseSubscribe.subscribersNumer")}
          icon={<i className="fa-solid fa-users"></i>}
          type="number"
          placeHolder="00"
          name="studentsCount"
          value={formData.studentsNumber}
          handleChange={handleStudentsCountChange}
        />
        {/* lessons per week */}
        <InputField
          labelPlaceholder={t("courseSubscribe.courseDuration")}
          icon={<i className="fa-light fa-calendar-days"></i>}
          type="number"
          name="lessonsPerWeek"
          value={formData.courseDuration}
          placeHolder="00"
          handleChange={(e) =>
            setFormData({
              ...formData,
              courseDuration: e.target.value
            })
          }
        />
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
      <RadiosSelect
        labelPlaceholder={t("courseSubscribe.lessonsDuration")}
        icon={<i className="fa-light fa-clock"></i>}
        options={course?.duration}
        name="lessonsDuration"
        checked={formData?.lessonsDuration}
        handleChange={(e) =>
          setFormData({
            ...formData,
            lessonsDuration: e.target.value
          })
        }
        additionalInfo={t("courseSubscribe.minutes")}
      />
      {/* subscriptions plan */}
      <RadiosSelect
        labelPlaceholder={t("courseSubscribe.subscriptionsPlan")}
        icon={<i className="fa-light fa-clock"></i>}
        options={course?.types}
        name="plan"
        checked={formData?.plan}
        handleChange={(e) =>
          setFormData({
            ...formData,
            plan: e.target.value
          })
        }
      />
      <AdditionalServices
        course={course}
        location={location}
        formData={formData}
        setFormData={setFormData}
      />
      {pricingPlan?.instalments && pricingPlan?.instalments?.length > 0 && (
        <RadiosSelect
          headLine={t("courseSubscribe.payment")}
          options={[
            t("courseSubscribe.imeddiatePayment"),
            t("courseSubscribe.installment")
          ]}
          name="paymethod"
          checked={paymethod}
          handleChange={(e) => setPaymethod(e.target.value)}
        />
      )}
      {paymethod === t("courseSubscribe.imeddiatePayment") && (
        <TotalPrice
          validCopun={formData?.validCopun}
          location={location}
          totalPrice={formData?.totalPrice}
        />
      )}
      {paymethod === t("courseSubscribe.installment") && (
        <InstalmentPrice
          instalment={pricingPlan?.instalments[0]}
          location={location}
          validCopun={formData?.validCopun}
          totalPrice={formData?.totalPrice}
        />
      )}
      <div className="check-field">
        <input type="checkbox" name="agree" id="agree" />
        <label className="continue" htmlFor="agree">
          {t("courseSubscribe.haveRead")}{" "}
          <Link to="/terms-conditions">{t("auth.termsAndCondition")}</Link>{" "}
          {t("auth.and")}{" "}
          <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>
        </label>
      </div>
      <button className="save">{t("courseSubscribe.subscribe")}</button>
    </form>
  );
};

export default SubscribeForm;
