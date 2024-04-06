import React from "react";
import studentIcon from "../../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";

const StudentCard = ({ student, button, handleClick }) => {
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
      <button
        style={{ background: button === "add" ? "#31535a" : "red" }}
        onClick={handleClick}
      >
        {button === "add"
          ? t("dashboard.addTheStudent")
          : t("dashboard.removeTheStudent")}
      </button>
    </div>
  );
};

export default StudentCard;
