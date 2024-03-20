import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const JobDetails = () => {
  const { t } = useTranslation();
  return (
    <section className="job_details">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-10 col-12 p-2">
            <div className="content">
              <div className="job_title">
                <div className="d-flex align-items-center justify-content-between">
                  <h4>
                    <i className="fa-light fa-briefcase"></i> معلم قرءان كريم{" "}
                  </h4>
                  <Link to="/jobs/1/apply">
                    {t("applyNow")}{" "}
                    <i className="fa-regular fa-arrow-up-left"></i>
                  </Link>
                </div>
                <ul>
                  <li>دوام كامل / جزئي</li>
                </ul>
              </div>
              <div className="about_job">
                <p>
                  نبحث عن معلم قرآن محترف وملتزم للانضمام إلى فريقنا التعليمي.
                  سيكون دور المعلم مسؤولاً عن تدريس الطلاب القراءة الصحيحة
                  للقرآن الكريم وتعليمهم التجويد وفهم المعاني القرآنية.
                </p>
                <h6>{t("jobResponsibilities")}</h6>
                <ul>
                  <li>تدريس الطلاب القراءة الصحيحة للقرآن الكريم.</li>
                  <li>
                    تعليم التجويد وتأكيد الأحكام الصوتية الصحيحة والمبادئ
                    اللغوية.
                  </li>
                  <li>
                    توجيه الطلاب في فهم معاني القرآن وتفسيرها بطريقة سهلة
                    ومفهومة.
                  </li>
                  <li>تعزيز القيم والأخلاق الإسلامية لدى الطلاب.</li>
                  <li>
                    مراجعة وتقييم أداء الطلاب ومساعدتهم في تحسين مهاراتهم في
                    القراءة والتجويد.
                  </li>
                </ul>
                <h6>{t("jobRequirements")}</h6>
                <ul>
                  <li>خبرة سابقة كمعلم قرآن أو تعليم ديني ذات صلة.</li>
                  <li>إتقان القراءة الصحيحة للقرآن الكريم والتجويد.</li>
                  <li>
                    معرفة عميقة بالقواعد اللغوية والتجويدية الخاصة باللغة
                    العربية.
                  </li>
                  <li>
                    مهارات تواصل ممتازة وقدرة على التفاعل بفعالية مع الطلاب.
                  </li>
                  <li>الالتزام بالمواعيد والجدية في أداء العمل.</li>
                  <li>القدرة على خلق بيئة تعليمية داعمة ومحفزة للطلاب.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
