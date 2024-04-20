import React from "react";
import studentIcon from "../../assets/images/student.svg";
import { useTranslation } from "react-i18next";

const MyStudentCard = ({ student, onDeleteStudent, onEditStudent }) => {
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
      <div className="card_btns">
        <button onClick={onEditStudent}>
          <i className="fa-light fa-user-pen"></i>
        </button>
        <button onClick={onDeleteStudent}>
          <i className="fa-light fa-trash-can"></i>
        </button>
      </div>
    </div>
  );
};

export default MyStudentCard;
