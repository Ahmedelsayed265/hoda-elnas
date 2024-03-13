import React from "react";
import { useTranslation } from "react-i18next";
import TestimonilasSlider from "./TestimonilasSlider";

const Testimonials = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="title">
        <h3>{t("homePage.testimonialsTitle")}</h3>
        <p>{t("homePage.testimonialsSubTitle")}</p>
      </div>
      <section className="testimonials">
        <div className="container">
          <TestimonilasSlider />
        </div>
      </section>
    </>
  );
};

export default Testimonials;
