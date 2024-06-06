import React from "react";
import errorImg from "../assets/images/error400-cover.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="error_page">
        <img src={errorImg} alt="error" />
        <h1>{t("errorPageTitle")}</h1>
        <Link to="/">{t("backToHome")}</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
