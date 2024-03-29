import React from "react";
import { useTranslation } from "react-i18next";

const CourseBenifits = ({ benefits }) => {
  const { t } = useTranslation();
  return (
    <div className="benifits">
      <h6>{t("courseSubscribe.whatYouWillget")}</h6>
      <ul className="iconCheck">
        {benefits && benefits?.split("\r").map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseBenifits;
