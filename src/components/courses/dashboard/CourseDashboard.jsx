import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams, Routes, Route } from "react-router-dom";
import tasks from "../../../assets/images/deliverables.svg";
import home from "../../../assets/images/home.svg";
import reports from "../../../assets/images/reports.svg";
import goals from "../../../assets/images/goals.svg";
import certificate from "../../../assets/images/certificate.svg";
import calender from "../../../assets/images/calnder.svg";
import students from "../../../assets/images/students.svg";
import CourseStudents from "./students/CourseStudents";
import Appointments from "./appointments/Appointments";
import Reports from "./reports/Reports";
import ReportViewer from "./reports/ReportViewer";
import Assignments from "./assignments/Assignments";
import AssignmentDetails from "./assignments/AssignmentDetails";
import HomePage from "./home/HomePage";
import CertificatesPage from "./certificates/CertificatesPage";
import StudentsGoals from "./goals/StudentsGoals";

const CourseDashboard = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { subscriptionId } = useParams();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOpenMenuBtn = event.target.closest(".open_menu");
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !isOpenMenuBtn
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="course_dashboard">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-3 col-md-3 col-12 p-lg-2 mt-lg-3">
            <aside className={menuOpen ? "open" : ""} ref={menuRef}>
              <ul>
                <li onClick={toggleMenu}>
                  <NavLink end to={`/dashboard/${subscriptionId}`}>
                    <img src={home} alt="home" />
                    {t("dashboard.home")}
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink end to={`/dashboard/${subscriptionId}/assignments`}>
                    <img src={tasks} alt="deliverables" />
                    {t("dashboard.tasks")}
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink end to={`/dashboard/${subscriptionId}/reports`}>
                    <img src={reports} alt="deliverables" />
                    {t("dashboard.reports")}
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink end to={`/dashboard/${subscriptionId}/goals`}>
                    <img src={goals} alt="deliverables" />
                    {t("dashboard.myGoals")}
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink
                    end
                    to={`/dashboard/${subscriptionId}/course-students`}
                  >
                    <img src={students} alt="deliverables" />
                    {t("dashboard.courseStudents")}
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink end to={`/dashboard/${subscriptionId}/certificates`}>
                    <img src={certificate} alt="deliverables" />
                    {t("dashboard.certificates")}
                  </NavLink>
                </li>
                <li onClick={toggleMenu}>
                  <NavLink end to={`/dashboard/${subscriptionId}/appointments`}>
                    <img src={calender} alt="deliverables" />
                    {t("dashboard.myAppointments")}
                  </NavLink>
                </li>
              </ul>
            </aside>
          </div>
          <div className="col-lg-9 col-12 p-2">
            <main className="course_dashboard_router">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route
                  path="/assignments/:assignmentId"
                  element={<AssignmentDetails />}
                />
                <Route path="/reports" element={<Reports />} />
                <Route path="/reports/:reportId" element={<ReportViewer />} />
                <Route path="/goals" element={<StudentsGoals />} />
                <Route path="/course-students" element={<CourseStudents />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/appointments" element={<Appointments />} />
              </Routes>
            </main>
          </div>
          <button className="open_menu" onClick={toggleMenu}>
            <i className="fa-light fa-bars"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseDashboard;
