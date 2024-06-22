import React from "react";
import { useTranslation } from "react-i18next";
import couponImg from "../../assets/images/coupon.png";
import { Link } from "react-router-dom";

const Coupons = () => {
  const { t } = useTranslation();
  return (
    <div className="row m-0 coupons_sec">
      <div className="col-12 p-2">
        <h3>{t("couponsHead")}</h3>
        <p>{t("couponsDesc")}</p>
      </div>
      <div className="col-lg-4 col-md-6 col-12 p-2">
        <div className="coupon_card">
          <div className="content">
            <div>
              <h6>شركه الحمد</h6>
              <p>كود خصم للطلاب من شركه الحمد للتشجييع على قرأة القران</p>
            </div>
            <div className="img">
              <img src={couponImg} alt="" />
            </div>
          </div>
          <div className="links">
            <Link to="">
              <i className="fa-regular fa-arrow-up-right-from-square"></i>{" "}
              {t("companyLink")}
            </Link>
            <button>{t("generate")}</button>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 p-2">
        <div className="coupon_card">
          <div className="content">
            <div>
              <h6>شركه الحمد</h6>
              <p>كود خصم للطلاب من شركه الحمد للتشجييع على قرأة القران</p>
            </div>
            <div className="img">
              <img src={couponImg} alt="" />
            </div>
          </div>
          <div className="links">
            <Link to="">
              <i className="fa-regular fa-arrow-up-right-from-square"></i>{" "}
              {t("companyLink")}
            </Link>
            <button>{t("generate")}</button>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 p-2">
        <div className="coupon_card">
          <div className="content">
            <div>
              <h6>شركه الحمد</h6>
              <p>كود خصم للطلاب من شركه الحمد للتشجييع على قرأة القران</p>
            </div>
            <div className="img">
              <img src={couponImg} alt="" />
            </div>
          </div>
          <div className="links">
            <Link to="">
              <i className="fa-regular fa-arrow-up-right-from-square"></i>{" "}
              {t("companyLink")}
            </Link>
            <button>{t("generate")}</button>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 p-2">
        <div className="coupon_card">
          <div className="content">
            <div>
              <h6>شركه الحمد</h6>
              <p>كود خصم للطلاب من شركه الحمد للتشجييع على قرأة القران</p>
            </div>
            <div className="img">
              <img src={couponImg} alt="" />
            </div>
          </div>
          <div className="links">
            <Link to="">
              <i className="fa-regular fa-arrow-up-right-from-square"></i>{" "}
              {t("companyLink")}
            </Link>
            <button>{t("generate")}</button>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 p-2">
        <div className="coupon_card">
          <div className="content">
            <div>
              <h6>شركه الحمد</h6>
              <p>كود خصم للطلاب من شركه الحمد للتشجييع على قرأة القران</p>
            </div>
            <div className="img">
              <img src={couponImg} alt="" />
            </div>
          </div>
          <div className="links">
            <Link to="">
              <i className="fa-regular fa-arrow-up-right-from-square"></i>{" "}
              {t("companyLink")}
            </Link>
            <button>{t("generate")}</button>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12 p-2">
        <div className="coupon_card">
          <div className="content">
            <div>
              <h6>شركه الحمد</h6>
              <p>كود خصم للطلاب من شركه الحمد للتشجييع على قرأة القران</p>
            </div>
            <div className="img">
              <img src={couponImg} alt="" />
            </div>
          </div>
          <div className="links">
            <Link to="">
              <i className="fa-regular fa-arrow-up-right-from-square"></i>{" "}
              {t("companyLink")}
            </Link>
            <button>{t("generate")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;
