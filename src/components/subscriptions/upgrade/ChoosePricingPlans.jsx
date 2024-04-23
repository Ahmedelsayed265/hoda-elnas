import React, { useEffect, useState } from "react";
import InputField from "../../ui/InputField";
import { useTranslation } from "react-i18next";
import RadiosSelect from "../../ui/RadiosSelect";
import AdditionalServices from "../../courses/subscription/AdditionalServices";
import useUserLocation from "../../../hooks/useUserLocation";
import { useSelector } from "react-redux";
import axios from "./../../../util/axios";
import TotalPrice from "../../courses/subscription/TotalPrice";
import studentImage from "../../../assets/images/student.svg";
import DataLoader from "../../ui/DataLoader";
import { toast } from "react-toastify";

const ChoosePricingPlans = ({
  courseObj,
  dataForCompare,
  formData,
  setFormData,
  setStepName,
  subStudents,
  courseLoading
}) => {
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const locationData = useUserLocation();
  const location = locationData?.country;
  const [pricingPlan, setPricingPlan] = useState({});
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    const getPricing = async () => {
      try {
        const response = await axios.get(
          `/learningcenter/list_pricingplans/?course_slug=${courseObj?.slug}`
        );
        setPricingPlans(response?.data?.message);
      } catch (error) {
        console.error(error);
      }
    };
    getPricing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseObj?.slug, lang]);

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
          plan?.saleprice_egp * formData?.studentsNumber +
          formData?.addons?.reduce(
            (total, addon) => total + addon?.fees_egp,
            0
          );
      } else {
        totalPrice =
          plan?.saleprice_usd * formData?.studentsNumber +
          formData?.addons?.reduce(
            (total, addon) => total + addon?.fees_usd,
            0
          );
      }
      setFormData({
        ...formData,
        plan_id: plan?.id,
        price: location === "EG" ? plan?.saleprice_egp : plan?.saleprice_usd,
        totalPrice: totalPrice >= 0 ? totalPrice : 0.0
      });
    };
    findPricingPlan(
      formData?.courseDuration,
      formData?.plan,
      formData?.lessonsDuration
    );
    if (formData?.addons?.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalPrice: calculateTotalPrice(
          formData?.studentsNumber,
          formData?.addons,
          pricingPlan?.interval
        )
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData?.studentsNumber,
    formData?.courseDuration,
    formData?.lessonsDuration,
    formData?.plan,
    pricingPlan?.interval,
    pricingPlans,
    location
  ]);

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

  const handleStudentsCheck = (e, student) => {
    const studentId = student.studentclass_id;
    const isChecked = e.target.checked;
    const selectedStudents = formData.active_student_id;
    if (isChecked && selectedStudents.length < formData.studentsNumber) {
      setFormData((prev) => ({
        ...prev,
        active_student_id: [...prev.active_student_id, studentId]
      }));
    } else if (!isChecked) {
      setFormData((prev) => ({
        ...prev,
        active_student_id: selectedStudents.filter((id) => id !== studentId)
      }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (
      dataForCompare?.addonLength === formData?.addons?.length &&
      dataForCompare?.student_number === formData?.studentsNumber && // F line
      dataForCompare?.plan_id === formData?.plan_id
    ) {
      toast.error(t("onplan"));
      return;
    } else {
      setStepName("payment_method");
    }
  };

  return (
    <div className="subscribe p-0">
      {courseLoading ? (
        <DataLoader />
      ) : (
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
          {formData?.studentsNumber < subStudents?.length && (
            <div className="choose_student">
              {subStudents.map((student) => (
                <div className="choose_student" key={student.studentclass_id}>
                  <label className="student_check">
                    <input
                      type="checkbox"
                      name="student"
                      value={student.studentclass_id}
                      required
                      checked={formData?.active_student_id?.includes(
                        student.studentclass_id
                      )}
                      onChange={(e) => handleStudentsCheck(e, student)}
                    />
                    <div className="content">
                      <div className="img">
                        <img
                          src={
                            student?.profile ? student?.profile : studentImage
                          }
                          alt="student"
                        />
                      </div>
                      <p>{student.name}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
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
            pricingPlan={pricingPlan}
            formData={formData}
            setFormData={setFormData}
          />
          <TotalPrice
            validCopun={formData?.validCopun}
            location={location}
            formData={formData}
            totalPrice={formData?.totalPrice}
          />
          <div className="col-12 p-2 d-flex justify-content-end">
            <button className="w-25 save_btn" onClick={handleNext}>
              {t("next")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChoosePricingPlans;
