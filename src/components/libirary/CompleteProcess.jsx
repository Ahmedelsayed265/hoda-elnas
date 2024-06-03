import React, { useEffect, useState } from "react";
import axios from "../../util/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../ui/form-elements/SubmitButton";
import InputField from "../ui/InputField";
import { useSelector } from "react-redux";

const CompleteProcess = ({ setStepName, method, plan, location }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [reciept, setReciept] = useState(null);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showMethod, setShowMethod] = useState(false);
  const [finalAmount, setFinalAmount] = useState(
    location === "EG" ? plan?.saleprice_egp : plan?.saleprice_usd
  );
  const [couponData, setCouponData] = useState({
    value: null,
    discount_type: null
  });
  const userId = useSelector((state) => state.authedUser.user?.id);

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
        user_id: userId,
        currency: location === "EG" ? "EGP" : "USD",
        method: method?.identifier,
        pricing_plan_id: plan?.id,
        amount: finalAmount,
        recipt: reciept,
        couponcode: promoCode,
        referralcode: referralCode
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
        "/members/Create_library_order/",
        reqOptions
      );
      if (response?.status === 200 || response?.status === 201) {
        if (method?.attribute === "auto") {
          initiateGediaCheckout(response?.data?.object?.session_id);
        } else {
          toast.success(t("renewApplicationInReview"));
          navigate("/audios");
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
      navigate("/audios");
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
        if (couponData?.value === "") {
          setCouponData({
            value: response?.data?.message?.value,
            discount_type: response?.data?.message?.discount_type
          });
        } else {
          if (response?.data?.value < couponData?.value) {
            return;
          } else {
            setCouponData({
              value: response?.data?.message?.value,
              discount_type: response?.data?.message?.discount_type
            });
          }
        }
        toast.success(t("courseSubscribe.promoCodeApplied"));
      } else {
        toast.error(response?.response?.data?.message);
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
        if (couponData?.value === "") {
          setCouponData({
            value: response?.data?.message[0]?.value,
            discount_type: response?.data?.message[0]?.type
          });
        } else {
          if (response?.data?.[0]?.value < couponData?.value) {
            return;
          } else {
            setCouponData({
              value: response?.data?.message[0]?.value,
              discount_type: response?.data?.message[0]?.type
            });
          }
        }
        toast.success(t("courseSubscribe.promoCodeApplied"));
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (couponData.value && couponData.discount_type === "percentage") {
      location === "EG"
        ? setFinalAmount((plan?.saleprice_egp * (100 - couponData.value)) / 100)
        : setFinalAmount(
            (plan?.saleprice_usd * (100 - couponData.value)) / 100
          );
    } else {
      location === "EG"
        ? setFinalAmount(plan?.saleprice_egp - couponData.value)
        : setFinalAmount(plan?.saleprice_usd - couponData.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponData, location, plan]);

  return (
    <div className="complete_process">
      <div className="row m-0">
        <div className="col-12 mt-3 p-2 d-flex gap-3 flex-lg-row flex-column">
          <div
            className={`subscribtion_info libriry_content ${
              method?.attribute === "auto" ? "active" : ""
            }`}
          >
            <h2>{plan?.name}</h2>
            <ul>
              {plan?.benefits?.split("\r\n").map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            <div className="price">
              <h5>
                {finalAmount}{" "}
                <span>
                  {location === "EG"
                    ? t("courseSubscribe.egyptianPound")
                    : t("courseSubscribe.dollar")}
                </span>
                <span>/ {plan?.interval === 12 ? t("year") : t("month")}</span>
              </h5>
              <p>
                {t("insteadOf")}{" "}
                <span>
                  {location === "EG" ? plan?.price_egp : plan?.price_usd}{" "}
                </span>{" "}
                <span>
                  {location === "EG"
                    ? t("courseSubscribe.egyptianPound")
                    : t("courseSubscribe.dollar")}
                </span>{" "}
              </p>
            </div>
            {method?.details && <p className="details">{method?.details}</p>}
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
        <div className="col-lg-6 col-12 p-2">
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
        <div className="col-lg-6 col-12 p-2">
          <div className="form-ui">
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
