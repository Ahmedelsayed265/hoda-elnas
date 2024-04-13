import React from "react";
import { Link } from "react-router-dom";
import student from "../../../../assets/images/student.svg";
import instructor from "../../../../assets/images/man.svg";
import { useTranslation } from "react-i18next";
import useTruncateString from "../../../../hooks/useTruncateString";
import { BASE_URL } from "../../../../constants";

const AssignmentCard = ({ assignment, path }) => {
  const { t } = useTranslation();
  const truncatedString = useTruncateString(assignment?.description);
  return (
    <Link to={path} className="assignment_card">
      <div className="content">
        <h6>{assignment?.title}</h6>
        <p>{truncatedString}</p>
        <div className="img_name">
          <div className="img">
            <img
              src={
                assignment?.instructor?.instructor_img
                  ? `${BASE_URL}${assignment?.instructor?.instructor_img}`
                  : instructor
              }
              alt="instructor"
            />
          </div>
          <h6>{assignment?.instructor?.name}</h6>
        </div>
        <span className="date">
          <i className="fa-duotone fa-calendar-days"></i>{" "}
          {assignment?.created_date}
        </span>
      </div>
      <div className="student">
        <div className="img">
          <img
            src={
              assignment?.student?.student_img
                ? assignment?.student?.student_img
                : student
            }
            alt=""
          />
        </div>
        <h6>
          <span>{t("dashboard.student")}:</span> {assignment?.student?.name}
        </h6>
      </div>
    </Link>
  );
};

export default AssignmentCard;
