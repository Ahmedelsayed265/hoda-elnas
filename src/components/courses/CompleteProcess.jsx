import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TotalPrice from "./TotalPrice";
import { useSelector } from "react-redux";
import axios from "./../../util/axios";

const CompleteProcess = ({ setStepName, formData, course, location }) => {
  const user = useSelector((state) => state.authedUser.user);
  const lang = useSelector((state) => state.language.lang);
  const [sessionId, setSessionId] = useState(null);
  console.log(parseFloat(formData?.totalPrice).toFixed(2));

  const authorization =
    "Basic NWY0NDYzNjgtNzU5Ni00YmMxLTg2YzMtYWJjNTRlOTkwOTVmOjFlOTUwNWIyLTllNTktNGU3Ny04NDkxLWI1ODFkMzFhYmM5Nw==";

  // Construct payload for Gedia API request
  const payload = {
    amount: formData.totalPrice,
    appearance: { styles: { hppProfile: "simple" } },
    callbackUrl: "https://hodaelnas.com/growth/callback/",
    currency: "EGP",
    customer: {
      email: user.email,
      phoneNumber: user.phone
    },
    language: lang,
    merchantReferenceId: "JoinCommunity",
    order: { integrationType: "HPP" },
    paymentOperation: "Pay",
    returnUrl: "https://www.hodaelnas.com",
    paymentOptions: [
      {
        label: "Visa",
        paymentMethods: "visa"
      },
      {
        label: "Mastercard",
        paymentMethods: "mastercard"
      },
      {
        label: "Mobile Wallet",
        paymentMethods: "meezadigital"
      }
    ]
  };

  // Define headers for Gedia API request
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
    authorization: authorization
  };

  const handlePayProcess = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/members/create_order/", {
        user_id: user?.id,
        start_date: formData?.startDate,
        students: formData?.students,
        amount: formData?.totalPrice,
        method: "card",
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await fetch(
        "https://api.merchant.geidea.net/payment-intent/api/v1/direct/session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(payload)
        }
      );

      const responseData = await response.json();
      const session = responseData?.session;

      setSessionId(session);
      initiateGediaCheckout(session);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to initiate Gedia Checkout
  const initiateGediaCheckout = (sessionId) => {
    let onSuccess = function (data) {
      // To Do: handle payment success
      console.log("Payment successful:", data);
    };

    let onError = function (data) {
      console.error("Error occurred during payment:", data);
      // Handle payment error
    };

    let onCancel = function (data) {
      console.log("Payment canceled:", data);
      // Handle payment cancellation
    };

    // Initialize Gedia Checkout
    const payment = new window.GeideaCheckout(onSuccess, onError, onCancel);

    // Start payment process with session ID
    payment.startPayment(sessionId?.id);
  };

  const { t } = useTranslation();

  return (
    <div className="complete_process">
      <div className="row m-0">
        {/* Subscription info */}
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
            <TotalPrice
              validCopun={formData?.validCopun}
              location={location}
              formData={formData}
              totalPrice={formData?.totalPrice}
            />
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
          <button className="w-25 save_btn" onClick={handlePayProcess}>
            {t("courseSubscribe.completeProcess")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProcess;
