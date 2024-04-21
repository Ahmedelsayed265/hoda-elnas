import React from "react";
import studentAvatar from "../../../../assets/images/student.svg";
import man from "../../../../assets/images/man.svg";
import pdf from "../../../../assets/images/pdf.svg";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constants";

const CertificateCard = ({ certificate }) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  return (
    <Link
      to={`/dashboard/${subscriptionId}/certificates/${certificate?.certificate_id}`}
      className="report_card"
    >
      <div className="content">
        <div className="name_img">
          <div className="img">
            <img
              src={certificate?.student_img || studentAvatar}
              alt="student"
            />
          </div>
          <h6>{certificate?.name}</h6>
        </div>
        <div className="name_img">
          <div className="img">
            <img
              src={
                certificate.Instructor_img
                  ? `${BASE_URL}${certificate.Instructor_img}`
                  : man
              }
              alt="instructor"
            />
          </div>
          <h6>{certificate.instructor}</h6>
        </div>
        <p>
          <i className="fa-duotone fa-calendar-days"></i> {certificate?.date}
        </p>
      </div>
      <div className="pdf">
        <img src={pdf} alt="pdf" />
        <span>{t("dashboard.openPDF")}</span>
      </div>
    </Link>
  );
};

export default CertificateCard;
