import React, { useEffect, useState } from "react";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TotalPrice from "../../courses/subscription/TotalPrice";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import InputField from "../../ui/InputField";

const CompleteProcess = ({
  setStepName,
  formData,
  course,
  location,
  method,
  sub,
  setFormData
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMethod, setShowMethod] = useState(false);
  const [reciept, setReciept] = useState(null);
  const { t } = useTranslation();

  const [promoCode, setPromoCode] = useState("");
  const [coponData, setCoponData] = useState({
    value: null,
    discount_type: null
  });

  const handlePayProcess = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (method?.attribute !== "auto" && reciept === null) {
        toast.error(t("uploadTransferPhoto"));
        return;
      }
      // pay load
      const dataToSend = {
        subscription_id: formData?.subscription_id,
        recipt: reciept,
        method: method?.identifier,
        amount: formData?.totalPrice,
        coupon: formData?.copun_name
      };
      const headers = {
        Accept: "application/json",
        "content-type": "multipart/form-data"
      };
      const reqOptions = {
        method: "POST",
        headers: headers,
        data: dataToSend
      };
      const response = await axios.request(
        "/members/create_renew_order/renew/",
        reqOptions
      );
      if (response?.status === 200 || response?.status === 201) {
        if (method?.attribute === "auto") {
          initiateGediaCheckout(response?.data?.object?.session_id);
        } else {
          toast.success(t("renewApplicationInReview"));
          navigate("/my-courses");
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const initiateGediaCheckout = (sessionId) => {
    let onSuccess = function (data) {
      navigate("/my-courses");
    };
    let onError = function (data) {
      console.error("Error occurred during payment:", data);
      toast.error("Something went wrong while processing payment");
    };
    let onCancel = function (data) {
      console.log("Payment canceled:", data);
    };
    const payment = new window.GeideaCheckout(onSuccess, onError, onCancel);
    payment.startPayment(sessionId);
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
        const newCouponData = {
          value: response?.data?.message?.value,
          discount_type: response?.data?.message?.discount_type
        };
        if (
          coponData.value !== null &&
          coponData.value === newCouponData.value &&
          coponData.discount_type === newCouponData.discount_type
        ) {
          toast.warning(t("courseSubscribe.couponAlreadyApplied"));
          return;
        }
        setCoponData(newCouponData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          copun_type: "promo",
          validCopun: true,
          copun_name: promoCode,
          discont_percent: newCouponData.value
        }));
        toast.success(t("courseSubscribe.promoCodeApplied"));
        setPromoCode("");
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTotalPrice = () => {
    let totalPriceUpdated = 0;
    if (coponData.value && coponData.discount_type === "percentage") {
      totalPriceUpdated = (formData.totalPrice * (100 - coponData.value)) / 100;
    } else {
      totalPriceUpdated = formData.totalPrice - coponData.value;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalPrice:
        totalPriceUpdated > 0 ? totalPriceUpdated : formData?.totalPrice
    }));
  };

  useEffect(() => {
    updateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coponData]);

  return (
    <div className="complete_process">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="form-ui">
            <div className=" w-100 d-flex align-items-end gap-2">
              <InputField
                labelPlaceholder={t("courseSubscribe.discountCopon")}
                icon={<i className="fa-light fa-tag"></i>}
                name={"discountCopon"}
                placeHolder={"kid1234"}
                value={promoCode}
                handleChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="add-discount"
                onClick={(e) => handleAddPromo(e)}
              >
                {t("courseSubscribe.addDiscount")}
              </button>
            </div>
          </div>
        </div>
        {/* Subscription info */}
        <div className="col-12 p-2 d-flex gap-5 flex-lg-row flex-column">
          <div
            className={`subscribtion_info ${
              method?.attribute === "auto" ? "active" : ""
            }`}
          >
            <div className="w-100">
              <h4>{course?.name}</h4>
              <ul className="mb-auto">
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
                  {formData.courseDuration}
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
            </div>
            {method?.details && <p className="details">{method?.details}</p>}
            <TotalPrice
              validCopun={formData?.validCopun}
              location={location}
              formData={formData}
              currency={sub?.currency}
              totalPrice={formData?.totalPrice}
            />
          </div>
          {method?.attribute !== "auto" && (
            <div className="upload_photo">
              <div className="d-flex gap-3">
                <h6
                  className={showMethod ? "" : "active"}
                  onClick={() => setShowMethod(false)}
                >
                  {t("transferPhoto")}
                </h6>
                {method?.image && (
                  <h6
                    className={showMethod ? "active" : ""}
                    onClick={() => setShowMethod(true)}
                  >
                    {t("transferMethod")}
                  </h6>
                )}
              </div>
              {showMethod ? (
                <div className="img">
                  <img src={method?.image} alt="method" />
                </div>
              ) : (
                <div className="upload_wrapper">
                  <input
                    type="file"
                    id="reciept"
                    onChange={(e) => setReciept(e.target.files[0])}
                  />
                  {reciept ? (
                    <div className="img">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setReciept(null);
                        }}
                      >
                        <i className="fa-light fa-xmark"></i>
                      </button>
                      <img src={URL.createObjectURL(reciept)} alt="reciept" />
                    </div>
                  ) : (
                    <label htmlFor="reciept">
                      <i className="fa-sharp fa-solid fa-rectangle-history-circle-plus"></i>
                    </label>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Buttons */}
        <div className="col-12 p-2 mt-3 d-flex justify-content-between">
          {/* Back button */}
          <button
            className="w-25 back_btn"
            onClick={() => setStepName("payment_method")}
          >
            {t("back")}
          </button>
          {/* Pay button */}
          <SubmitButton
            name={t("courseSubscribe.completeProcess")}
            onClick={handlePayProcess}
            className={"save_btn complete_process_btn"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default CompleteProcess;
