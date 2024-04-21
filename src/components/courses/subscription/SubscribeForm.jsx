import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import TotalPrice from "./TotalPrice";
import AdditionalServices from "./AdditionalServices";
import useUserLocation from "../../../hooks/useUserLocation";
import RadiosSelect from "../../ui/RadiosSelect";
import InputField from "../../ui/InputField";
import InstalmentPrice from "./InstalmentPrice";
import SubscribeModal from "./SubscribeModal";
import axios from "../../../util/axios";
import CourseBenifits from "../course-details/CourseBenifits";

const SubscribeForm = ({
  course,
  pricingPlans,
  formData,
  setFormData,
  benefits,
  setBenefits
}) => {
  const { t } = useTranslation();
  const agreeCheck = useRef(null);
  const locationData = useUserLocation();
  const location = locationData?.country;
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [agreeError, setAgreeError] = useState(null);
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
    const calculateTotalPrice = (studentsNumber, addons, planInterval) => {
      let totalAddonPrice = addons.reduce((total, addon) => {
        const addonPrice =
          location === "EG" ? addon?.fees_egp : addon?.fees_usd;
        return total + addonPrice * planInterval;
      }, 0);

      let basePrice =
        location === "EG"
          ? pricingPlan?.saleprice_egp
          : pricingPlan?.saleprice_usd;

      let totalPrice = studentsNumber * (basePrice + totalAddonPrice);

      if (coponData?.value && coponData?.discount_type === "percentage") {
        totalPrice *= (100 - coponData?.value) / 100;
      } else {
        if (coponData?.value && totalPrice > coponData.value) {
          totalPrice -= coponData.value;
        }
      }

      return totalPrice >= 0 ? totalPrice : 0.0;
    };
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
            ? (plan?.saleprice_egp * formData?.studentsNumber +
                formData?.addons?.reduce(
                  (total, addon) => total + addon?.fees_egp,
                  0
                )) *
              ((100 - coponData?.value) / 100)
            : plan?.saleprice_egp * formData?.studentsNumber +
              formData?.addons?.reduce(
                (total, addon) => total + addon?.fees_egp,
                0
              ) -
              coponData?.value;
      } else {
        totalPrice =
          plan?.slaeprice_usd * formData?.studentsNumber +
          formData?.addons?.reduce(
            (total, addon) => total + addon?.fees_usd,
            0
          );
      }
      setFormData({
        ...formData,
        price: location === "EG" ? plan?.saleprice_egp : plan?.slaeprice_usd,
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
    if (formData?.addons?.length > 0) {
      setFormData({
        ...formData,
        totalPrice: calculateTotalPrice(
          formData?.studentsNumber,
          formData?.addons,
          pricingPlan?.interval
        )
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData?.courseDuration,
    formData?.studentsNumber,
    formData?.lessonsDuration,
    formData?.plan,
    pricingPlan?.interval,
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
    if (formData.startDate === "") {
      document.getElementById("startDate").focus();
      return;
    } else if (agreeCheck.current.checked === false) {
      setAgreeError("error");
      return;
    }
    const selectedDate = new Date(formData.startDate);
    const today = new Date();
    if (selectedDate.getDate() === today.getDate() || selectedDate < today) {
      toast.error(t("dateError"));
      document.getElementById("startDate").focus();
    } else {
      setShowSubscribeModal(true);
    }
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
        if (coponData?.value === "") {
          setCoponData((prevCoponData) => ({
            ...prevCoponData,
            value: response?.data?.message?.value,
            discount_type: response?.data?.message?.discount_type
          }));
          setFormData((prevFormData) => ({
            ...prevFormData,
            copun_type: "promo",
            validCopun: true,
            copun_name: promoCode,
            discont_percent: response?.data?.message?.value
          }));
        } else {
          if (response?.data?.message?.value < coponData?.value) {
            return;
          } else {
            setCoponData((prevCoponData) => ({
              ...prevCoponData,
              value: response?.data?.message?.value,
              discount_type: response?.data?.message?.discount_type
            }));
            setFormData((prevFormData) => ({
              ...prevFormData,
              copun_type: "promo",
              validCopun: true,
              copun_name: promoCode,
              discont_percent: response?.data?.message?.value
            }));
          }
        }
        toast.success(t("courseSubscribe.promoCodeApplied"));
      } else {
        toast.error(t("courseSubscribe.invalidPromoCode"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReferral = async (e) => {
    e.preventDefault();
    if (referralCode === "") return;
    try {
      const response = await axios.post("/members/Check_referralcode/", {
        referralcode: referralCode
      });
      if (response?.status === 200 || response?.status === 201) {
        if (coponData?.value === "") {
          setCoponData((prevCoponData) => ({
            ...prevCoponData,
            value: response?.data?.message[0]?.value,
            discount_type: response?.data?.message[0]?.type
          }));
          setFormData((prevFormData) => ({
            ...prevFormData,
            copun_type: "referral",
            validCopun: true,
            copun_name: referralCode,
            discont_percent: response?.data?.message[0]?.value
          }));
        } else {
          if (response?.data?.message[0]?.value < coponData?.value) {
            return;
          } else {
            setCoponData((prevCoponData) => ({
              ...prevCoponData,
              value: response?.data?.message[0]?.value,
              discount_type: response?.data?.message[0]?.type
            }));
            setFormData((prevFormData) => ({
              ...prevFormData,
              copun_type: "referral",
              validCopun: true,
              copun_name: referralCode,
              discont_percent: response?.data?.message[0]?.value
            }));
          }
        }
        toast.success(t("courseSubscribe.promoCodeApplied"));
      } else {
        toast.error(t("courseSubscribe.invalidPromoCode"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pricingPlan) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        planId: pricingPlan?.id
      }));
    }
  }, [pricingPlan, setFormData]);

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
          placeholder="Select a date"
          name="startDate"
          required={true}
          value={formData.startDate}
          handleChange={(e) =>
            setFormData({
              ...formData,
              startDate: e.target.value
            })
          }
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
        <div className="hide_lg">
          <CourseBenifits benefits={benefits} />
        </div>
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
          pricingPlan={pricingPlan}
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
            formData={formData}
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
            <button className="add-discount" onClick={(e) => handleAddPromo(e)}>
              {t("courseSubscribe.addDiscount")}
            </button>
          </div>
          <div className="w-100 d-flex align-items-end gap-2">
            <InputField
              labelPlaceholder={t("courseSubscribe.friendCopon")}
              icon={<i className="fa-light fa-tag"></i>}
              name={"friendCopon"}
              placeHolder={"kid1234"}
              value={referralCode}
              handleChange={(e) => setReferralCode(e.target.value)}
            />
            <button
              className="add-discount"
              onClick={(e) => handleAddReferral(e)}
            >
              {t("courseSubscribe.addDiscount")}
            </button>
          </div>
        </div>
        {/* agree */}
        <div className="check-field">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            required
            ref={agreeCheck}
            className={`checkbox ${agreeError === "error" ? "error" : ""}`}
          />
          <label className="continue" htmlFor="agree">
            <p className="m-0">
              {t("courseSubscribe.haveRead")}{" "}
              <Link to="/terms-conditions">{t("auth.termsAndCondition")}</Link>{" "}
              {t("auth.and")}{" "}
              <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>
            </p>
          </label>
        </div>
        <button
          className={`save ${pricingPlan ? "" : "disabled"}`}
          type="submit"
          onClick={handleShowModal}
        >
          {t("courseSubscribe.subscribe")}
        </button>
      </form>
      <SubscribeModal
        location={location}
        formData={formData}
        showModal={showSubscribeModal}
        course={course}
        setShowModal={setShowSubscribeModal}
      />
    </>
  );
};

export default SubscribeForm;
