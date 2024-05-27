import React, { useState } from "react";
import axios from "../../../../util/axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../constants";
import TotalPrice from "../TotalPrice";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const CompleteProcess = ({
  setStepName,
  formData,
  course,
  location,
  method
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showMethod, setShowMethod] = useState(false);
  const [reciept, setReciept] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.authedUser.user);

  // create order api
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
        direct_order: false,
        user_id: user?.id,
        start_date: formData?.startDate,
        students: formData?.studentsNumber,
        currency: location === "EG" ? "EGP" : "USD",
        method: method?.identifier,
        pricing_plan_id: formData?.planId,
        couponcode: formData.copun_type === "promo" ? formData.copun_name : "",
        referralcode:
          formData.copun_type === "referral" ? formData.copun_name : "",
        recipt: reciept,
        amount: formData?.totalPrice,
        addons: formData?.addons?.map((item) => item?.id)
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
        "/members/create_order/",
        reqOptions
      );
      if (response?.status === 200 || response?.status === 201) {
        if (method?.attribute === "auto") {
          initiateGediaCheckout(response?.data?.object?.session_id);
        } else {
          toast.success(t("inreview"));
          navigate("/my-courses");
        }
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // initiate gedia checkout
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

  return (
    <div className="complete_process">
      <div className="row m-0">
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
                  <img src={`${BASE_URL}${method?.image}`} alt="method" />
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
