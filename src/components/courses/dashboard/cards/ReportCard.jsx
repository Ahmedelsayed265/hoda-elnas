import React from "react";
import studentAvatar from "../../../../assets/images/student.svg";
import man from "../../../../assets/images/man.svg";
import pdf from "../../../../assets/images/pdf.svg";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constants";

const ReportCard = ({ report }) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  return (
    <Link
      to={`/dashboard/${subscriptionId}/reports/${report?.report_id}`}
      className="report_card"
    >
      <div className="content">
        <div className="name_img">
          <div className="img">
            <img
              src={
                report.Student_img
                  ? `${BASE_URL}${report.Student_img}`
                  : studentAvatar
              }
              alt="student"
            />
          </div>
          <h6>{report?.name}</h6>
        </div>
        <div className="name_img">
          <div className="img">
            <img
              src={
                report.Instructor_img
                  ? `${BASE_URL}${report?.Instructor_img}`
                  : man
              }
              alt="instructor"
            />
          </div>
          <h6>{report.instructor}</h6>
        </div>
        <p>
          <i className="fa-duotone fa-calendar-days"></i> {report?.date}
        </p>
      </div>
      <div className="pdf">
        <img src={pdf} alt="pdf" />
        <span>{t("dashboard.openPDF")}</span>
      </div>
    </Link>
  );
};

export default ReportCard;
