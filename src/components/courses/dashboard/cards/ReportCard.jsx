import React from "react";
import studentAvatar from "../../../../assets/images/student.svg";
import instructorMale from "../../../../assets/images/man.svg";
import pdf from "../../../../assets/images/pdf.svg";
import { useTranslation } from "react-i18next";

const ReportCard = ({ report }) => {
  const { t } = useTranslation();
  return (
    <div className="report_card">
      <div className="content">
        <div className="name_img">
          <div className="img">
            <img src={studentAvatar} alt="student" />
          </div>
          <h6>{report.name}</h6>
        </div>
        <div className="name_img">
          <div className="img">
            <img src={instructorMale} alt="instructor" />
          </div>
          <h6>{report.instructor}</h6>
        </div>
        <p>
          <i className="fa-duotone fa-calendar-days"></i> {report.date}
        </p>
      </div>
      <div className="pdf">
        <img src={pdf} alt="pdf" />
        <span>{t("dashboard.openPDF")}</span>
      </div>
    </div>
  );
};

export default ReportCard;
