import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";

const WhatWeOffer = () => {
  const { t } = useTranslation();
  return (
    <section className="what_we_offer">
      <div className="container">
        <div className="title">
          <h3>{t("homePage.whatWeOffer")}</h3>
        </div>
        <div className="row m-0 justify-content-center">
          <div className="col-lg-10 col-12 p-2">
            <div className="table_container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>
                      <img src={logo} alt="" />
                    </th>
                    <th>{t("homePage.competitors")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="circled">السعر</td>
                    <td>أسعار ثابتة وواضحة</td>
                    <td>حسب المعلم</td>
                  </tr>
                  <tr>
                    <td className="circled">التزام المعلم</td>
                    <td>مضمون</td>
                    <td>المعلم يقدر يتركك بأي وقت</td>
                  </tr>
                  <tr>
                    <td className="circled">السرعة والجودة</td>
                    <td>خلال ١٢ ساعة نوصلك بمعلم يطابق احتياجاتك</td>
                    <td>ربط عشوائي وفي مدة توصل للأيام</td>
                  </tr>
                  <tr>
                    <td className="circled">نوع الحصص</td>
                    <td>حضوري وأونلاين</td>
                    <td>
                      <i className="fa-sharp fa-solid fa-x"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className="circled">جودة المعلم</td>
                    <td>جودة عالية. ما نقبل إلّا ٨٪ من المتقدّمين</td>
                    <td>حسب المعلم</td>
                  </tr>
                  <tr>
                    <td className="circled">طريقة الدفع</td>
                    <td>أون لاين مع إمكانية التقسيط</td>
                    <td>
                      <i className="fa-sharp fa-solid fa-x"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className="circled">دعم العملاء</td>
                    <td>٧ أيام في الأسبوع</td>
                    <td>دعم بسيط قبل الدفع</td>
                  </tr>
                  <tr>
                    <td className="circled">متابعة الأداء</td>
                    <td>ملاحظات وتقييمات من المعلم بعد كل حصة</td>
                    <td>
                      <i className="fa-sharp fa-solid fa-x"></i>
                    </td>
                  </tr>
                  <tr>
                    <td className="circled">سياسة الاسترجاع</td>
                    <td>ضمان استرجاع الأموال</td>
                    <td>
                      <i className="fa-sharp fa-solid fa-x"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
