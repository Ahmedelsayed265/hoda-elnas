import React, { useEffect, forwardRef, useState } from "react";
import axios from "./../../../util/axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useUserLocation from "../../../hooks/useUserLocation";
import SubscribeModal from "./subscribe-modal/SubscribeModal";

const Plans = forwardRef(
  ({ slug, paymentMethods, requiresLogin, course }, ref) => {
    const { t } = useTranslation();
    const [pricingPlans, setPricingPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [plan, setPlan] = useState(null);
    const { lang } = useSelector((state) => state.language);
    const locationData = useUserLocation();
    const location = locationData?.country;

    useEffect(() => {
      const getPricing = async () => {
        try {
          const response = await axios.get(
            `/learningcenter/list_pricingplans/?course_slug=${slug}`
          );
          let plans = response?.data?.message?.slice(0, 3);

          const highlightedPlanIndex = plans.findIndex(
            (plan) => plan.highlighted
          );
          if (highlightedPlanIndex !== -1) {
            const highlightedPlan = plans.splice(highlightedPlanIndex, 1)[0];
            const middleIndex = Math.floor(plans.length / 2);
            plans.splice(middleIndex, 0, highlightedPlan);
          }

          setPricingPlans(plans);
        } catch (error) {
          console.error(error);
        }
      };
      getPricing();
    }, [slug, lang]);

    const onSubscribe = (plan) => {
      setPlan(plan);
      setShowModal(true);
    };

    return (
      <section className="course_plans" ref={ref}>
        <div className="container">
          <div className="row">
            <div className="col-12 p-2 mb-4">
              <h3 className="title">{t("samePagePlans")}</h3>
            </div>
            {pricingPlans?.map((plan, index) => {
              const isActive =
                plan.highlighted ||
                (!pricingPlans.some((p) => p.highlighted) && index === 1);
              const isSamePriceEgp = plan.price_egp === plan.saleprice_egp;
              const isSamePriceUsd = plan.price_usd === plan.saleprice_usd;
              return (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={plan?.id}>
                  <div className={`plan ${isActive ? "active" : ""}`}>
                    <div className="planHeader">
                      <h3>{plan?.name}</h3>
                      <div className="price">
                        <h5>
                          {location === "EG"
                            ? plan?.saleprice_egp
                            : plan?.saleprice_usd}{" "}
                          <span>
                            {location === "EG"
                              ? t("courseSubscribe.egyptianPound")
                              : t("courseSubscribe.dollar")}
                          </span>
                          <span>
                            / {plan?.interval === 12 ? t("year") : t("month")}
                          </span>
                        </h5>
                        {!(
                          (location === "EG" && isSamePriceEgp) ||
                          (location !== "EG" && isSamePriceUsd)
                        ) && (
                          <p>
                            {t("insteadOf")}{" "}
                            <span>
                              {location === "EG"
                                ? plan?.price_egp
                                : plan?.price_usd}{" "}
                            </span>{" "}
                            <span>
                              {location === "EG"
                                ? t("courseSubscribe.egyptianPound")
                                : t("courseSubscribe.dollar")}
                            </span>{" "}
                          </p>
                        )}
                      </div>
                      <div className="label">
                        <h6>
                          {plan?.type} - {plan?.cpw} {t("planLabel")}
                        </h6>
                      </div>
                    </div>
                    <div className="line"></div>
                    <ul className="mb-auto">
                      {plan?.benefits?.split("\r\n").map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                    <div className="price_subscribe">
                      <button onClick={() => onSubscribe(plan)}>
                        {t("subscribeNow")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <SubscribeModal
          showModal={showModal}
          setShowModal={setShowModal}
          plan={plan}
          paymentMethods={paymentMethods}
          requiresLogin={requiresLogin}
          location={location}
          studentsNumField={course?.student_number}
        />
      </section>
    );
  }
);

export default Plans;
