import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TotalPrice from "./TotalPrice";
import AdditionalServices from "./AdditionalServices";
import useUserLocation from "../../hooks/useUserLocation";
import RadiosSelect from "./RadiosSelect";
import InputField from "./InputField";
import InstalmentPrice from "./InstalmentPrice";
import { Link } from "react-router-dom";
import SubscribeModal from "./SubscribeModal";
import axios from "./../../util/axios";
import { toast } from "react-toastify";

const SubscribeForm = ({
  course,
  pricingPlans,
  formData,
  setFormData,
  setBenefits
}) => {
  const { t } = useTranslation();
  const locationData = useUserLocation();
  const location = locationData?.country;
  const errorMessage = useRef(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [coponData, setCoponData] = useState({
    value: null,
    discount_type: null
  });
  const [pricingPlan, setPricingPlan] = useState({});
  const [promoCode, setPromoCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
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
      let totalPrice;
      if (location === "EG") {
        totalPrice =
          coponData?.discount_type === "percentage"
            ? (plan?.price_egp * formData?.studentsNumber +
                formData?.addons?.reduce(
                  (total, addon) => total + addon?.fees_egp,
                  0
                )) *
              ((100 - coponData?.value) / 100)
            : plan?.price_egp * formData?.studentsNumber +
              formData?.addons?.reduce(
                (total, addon) => total + addon?.fees_egp,
                0
              ) -
              coponData?.value;
      } else {
        totalPrice =
          plan?.price_usd * formData?.studentsNumber +
          formData?.addons?.reduce(
            (total, addon) => total + addon?.fees_usd,
            0
          );
      }
      setFormData({
        ...formData,
        price: location === "EG" ? plan?.price_egp : plan?.price_usd,
        totalPrice: totalPrice >= 0 ? totalPrice : 0.0
      });
      setBenefits(plan?.benefits);
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
    formData?.studentsNumber,
    formData?.lessonsDuration,
    formData?.plan,
    pricingPlans,
    coponData,
    location
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

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowSubscribeModal(true);
  };

  const handleAddPromo = async (e) => {
    e.preventDefault();
    if (promoCode === "") return;
    try {
      const response = await axios.post("/members/Check_coupon/", {
        couponcode: promoCode,
        service: "courses"
      });
      if (response?.status === 200 || response?.status === 201) {
        setCoponData((prevCoponData) => ({
          ...prevCoponData,
          value: response?.data?.message?.value,
          discount_type: response?.data?.message?.discount_type
        }));
      } else {
        toast.error(t("courseSubscribe.invalidPromoCode"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        {/* start date */}
        <InputField
          labelPlaceholder={t("courseSubscribe.startDate")}
          icon={<i className="fa-light fa-calendar-days"></i>}
          type="date"
          name="startDate"
        />
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
          coponData={coponData}
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
            instalment={pricingPlan?.instalments}
            location={location}
            validCopun={formData?.validCopun}
            totalPrice={formData?.totalPrice}
          />
        )}
        {/* discount */}
        <div className="form_group  flex-column">
          <div className="w-100 d-flex align-items-end gap-2">
            <InputField
              labelPlaceholder={t("courseSubscribe.discountCopon")}
              icon={<i className="fa-light fa-tag"></i>}
              name={"discountCopon"}
              placeHolder={"kid1234"}
              value={promoCode}
              handleChange={(e) => setPromoCode(e.target.value)}
            />
            <span ref={errorMessage}></span>
            <button className="add-discount" onClick={(e) => handleAddPromo(e)}>
              {t("courseSubscribe.addDiscount")}
            </button>
          </div>
          <div className="w-100 d-flex align-items-end gap-2">
            <InputField
              labelPlaceholder={t("courseSubscribe.friendCopon")}
              icon={<i className="fa-light fa-tag"></i>}
              name={"discountCopon"}
              placeHolder={"kid1234"}
              value={referralCode}
              handleChange={(e) => setReferralCode(e.target.value)}
            />
            <button className="add-discount">
              {t("courseSubscribe.addDiscount")}
            </button>
          </div>
        </div>
        {/* agree */}
        <div className="check-field">
          <input type="checkbox" name="agree" id="agree" />
          <label className="continue" htmlFor="agree">
            <p className="m-0">
              {t("courseSubscribe.haveRead")}{" "}
              <Link to="/terms-conditions">{t("auth.termsAndCondition")}</Link>{" "}
              {t("auth.and")}{" "}
              <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>
            </p>
          </label>
        </div>
        <button className="save" onClick={handleShowModal}>
          {t("courseSubscribe.subscribe")}
        </button>
      </form>
      <SubscribeModal
        showModal={showSubscribeModal}
        setShowModal={setShowSubscribeModal}
      />
    </>
  );
};

export default SubscribeForm;
