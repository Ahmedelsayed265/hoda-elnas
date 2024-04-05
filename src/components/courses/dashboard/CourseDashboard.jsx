import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../../assets/images/avatar.jpg";
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import tasks from "../../../assets/images/deliverables.svg";
import reports from "../../../assets/images/reports.svg";
import goals from "../../../assets/images/goals.svg";
import certificate from "../../../assets/images/certificate.svg";
import calender from "../../../assets/images/calnder.svg";
import students from "../../../assets/images/students.svg";

const CourseDashboard = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.authedUser.user);
  const { subscriptionId } = useParams();
  return (
    <section className="course_dashboard">
      <div className="container">
        <div className="col-lg-3 col-md-3 col-12 p-2">
          <aside>
            <div className="user_img">
              <div className="img">
                <img src={user?.img || avatar} alt="avatar" />
              </div>
              <h6>{user?.name}</h6>
            </div>
            <ul>
              <li>
                <NavLink end to={`/dashboard/${subscriptionId}`}>
                  <img src={tasks} alt="deliverables" />
                  {t("dashboard.tasks")}
                </NavLink>
              </li>
              <li>
                <NavLink end to={`/dashboard/${subscriptionId}/reports`}>
                  <img src={reports} alt="deliverables" />
                  {t("dashboard.reports")}
                </NavLink>
              </li>
              <li>
                <NavLink end to={`/dashboard/${subscriptionId}/goals`}>
                  <img src={goals} alt="deliverables" />
                  {t("dashboard.myGoals")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  end
                  to={`/dashboard/${subscriptionId}/course-students`}
                >
                  <img src={students} alt="deliverables" />
                  {t("dashboard.courseStudents")}
                </NavLink>
              </li>
              <li>
                <NavLink end to={`/dashboard/${subscriptionId}/certificates`}>
                  <img src={certificate} alt="deliverables" />
                  {t("dashboard.certificates")}
                </NavLink>
              </li>
              <li>
                <NavLink end to={`/dashboard/${subscriptionId}/appointments`}>
                  <img src={calender} alt="deliverables" />
                  {t("dashboard.myAppointments")}
                </NavLink>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CourseDashboard;
