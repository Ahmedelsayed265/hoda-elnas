import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants";
import { useTranslation } from "react-i18next";
import axios from "./../../../util/axios";

const AvailableCourse = ({ subscription }) => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`/members/list_Student/?subscription_id=${subscription?.id}`)
      .then((response) => {
        if (response.status === 200) {
          setStudents(response?.data?.message);
        }
      });
  });
  return (
    <Link
      to={
        students?.length > 0
          ? `/dashboard/${subscription?.id}`
          : `/dashboard/${subscription?.id}/course-students`
      }
      className="custom-card"
    >
      <div className="img">
        <div
          className="label"
          style={{ background: subscription?.status_color }}
        >
          <span>{subscription?.status}</span>
        </div>
        <img src={`${BASE_URL}${subscription?.background}`} alt="course" />
      </div>
      <div className="content">
        <div className="d-flex align-items-start justify-content-between">
          <h4 className="smallhead">{subscription?.course_name}</h4>
        </div>
        <h6>{subscription?.plan_name}</h6>
        <p className="sno mb-1">
          <b>
            <i className="fa-duotone fa-users"></i>
            {t("courseSubscribe.subscribersNumer")}
          </b>
          <span>{subscription?.student_number}</span>
        </p>
        <p className="sno mb-1">
          <b>
            <i class="fa-duotone fa-calendar-days"></i>
            {t("courseSubscribe.courseDuration")}
          </b>
          <span>{subscription?.cpw}</span>
        </p>
        <p className="sno mb-1">
          <b>
            <i class="fa-duotone fa-calendar-days"></i>
            {t("courseSubscribe.startDate")}
          </b>
          <p>{subscription?.startdate}</p>
        </p>
        <p className="sno mb-1">
          <b>
            <i class="fa-duotone fa-calendar-days"></i>
            {t("courseSubscribe.endDate")}
          </b>
          <p>{subscription?.enddate}</p>
        </p>
      </div>
    </Link>
  );
};

export default AvailableCourse;
