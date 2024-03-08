import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import x from "../assets/images/x.svg";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 d-flex gap-4 flex-lg-row flex-md-row flex-column">
            <div className="img">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="about">
              <p>{t("footerAbout")}</p>
              <ul className="social">
                <li>
                  <Link to="">
                    <i className="fa-brands fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <img src={x} alt="twitter" />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <h3>{t("importLinks")}</h3>
            <ul>
              <li>
                <Link to="/about-us">{t("about")}</Link>
              </li>
              <li>
                <Link to="/courses">{t("courses")}</Link>
              </li>
              <li>
                <Link to="/faqs">{t("faqs")}</Link>
              </li>
              <li>
                <Link to="/terms-conditions">{t("auth.termsAndCondition")}</Link>
              </li>
              <li>
                <Link to="/privacy-policy">{t("auth.privacyPolicy")}</Link>
              </li>
              <li>
                <Link to="/contact-us">{t("contact")}</Link>
              </li>
            </ul>
          </div>
          <div className="col-12">
            <div className="copy">
              <p>
                &copy; {new Date().getFullYear()} {t("allRightsDeserved")}
                <Link to="/"> {t("siteName")}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
