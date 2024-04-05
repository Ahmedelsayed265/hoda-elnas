import React from "react";
import studentIcon from "../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";

const StudentCard = ({ student }) => {
  const { t } = useTranslation();
  return (
    <div className="student_card">
      <div className="img_name">
        <div className="img">
          <img src={student?.image || studentIcon} alt="" />
        </div>
        <div className="content">
          <h6>{student?.name}</h6>
          <p>
            {t("dashboard.studentAge")}: <span>{student?.age}</span>
          </p>
        </div>
      </div>
      <p className="contactNumber">
        {t("dashboard.contactNumber")}: <span>{student?.contact}</span>
      </p>
      <button>{t("dashboard.addTheStudent")}</button>
    </div>
  );
};

export default StudentCard;
