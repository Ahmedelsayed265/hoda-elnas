import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams, Routes, Route } from "react-router-dom";
import tasks from "../../../assets/images/deliverables.svg";
import reports from "../../../assets/images/reports.svg";
import goals from "../../../assets/images/goals.svg";
import certificate from "../../../assets/images/certificate.svg";
import calender from "../../../assets/images/calnder.svg";
import students from "../../../assets/images/students.svg";
import CourseStudents from "./students/CourseStudents";
import Appointments from "./appointments/Appointments";
import Reports from "./reports/Reports";
import Certificates from "./certificates/Certificates";
import ReportViewer from "./reports/ReportViewer";
import Assignments from "./assignments/Assignments";

const CourseDashboard = () => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();

  return (
    <section className="course_dashboard">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-3 col-md-3 col-12 p-2 mt-3">
            <aside>
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
          <div className="col-lg-9 col-md-9 col-12 p-2">
            <main className="course_dashboard_router">
              <Routes>
                <Route path="/" element={<Assignments />} />
                <Route path="/reports/*" element={<Reports />} />
                <Route path="/reports/:reportId" element={<ReportViewer />} />
                <Route path="/course-students" element={<CourseStudents />} />
                <Route path="/certificates/*" element={<Certificates />} />
                <Route path="/appointments" element={<Appointments />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDashboard;
