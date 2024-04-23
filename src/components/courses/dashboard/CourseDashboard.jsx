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
import axios from "./../../../util/axios";
import CertificateViewer from "./certificates/CertificateViewer";
import GoalDetails from "./goals/GoalDetails";
import { useSelector } from "react-redux";
// import { BASE_URL } from "../../../constants";

const CourseDashboard = () => {
  const lang = useSelector((state) => state.language.lang);
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sub, setSub] = useState();
  const { subscriptionId } = useParams();
  const menuRef = useRef(null);

  useEffect(() => {
    let body = document.querySelector("body");
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
    body.style.overflow = menuOpen ? "hidden" : "visible";
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);
  
  useEffect(() => {
    axios
      .get(`/members/List_student_subs/?id=${subscriptionId}`)
      .then((res) => {
        console.log("Response:", res.data);
        setSub(res?.data?.message[0]);
      })
      .catch((error) => {
        console.error("Error fetching subscription data:", error);
      });
  }, [subscriptionId, lang]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="course_dashboard">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-3 col-md-3 col-12 p-lg-2 mt-lg-3">
            <aside className={menuOpen ? "open" : ""} ref={menuRef}>
              <div className="user_img">
                {/* <div className="img">
                  <img src={`${BASE_URL}${course?.background}`} alt="user" />
                </div> */}
                <h6>{sub?.course_name}</h6>
              </div>
              <ul>
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink end to={`/dashboard/${subscriptionId}`}>
                    <img src={home} alt="home" />
                    {t("dashboard.home")}
                  </NavLink>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink end to={`/dashboard/${subscriptionId}/assignments`}>
                    <img src={tasks} alt="deliverables" />
                    {t("dashboard.tasks")}
                  </NavLink>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink end to={`/dashboard/${subscriptionId}/reports`}>
                    <img src={reports} alt="deliverables" />
                    {t("dashboard.reports")}
                  </NavLink>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink end to={`/dashboard/${subscriptionId}/goals`}>
                    <img src={goals} alt="deliverables" />
                    {t("dashboard.myGoals")}
                  </NavLink>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink
                    end
                    to={`/dashboard/${subscriptionId}/course-students`}
                  >
                    <img src={students} alt="deliverables" />
                    {t("dashboard.courseStudents")}
                  </NavLink>
                </li>
                <li onClick={() => setMenuOpen(false)}>
                  <NavLink end to={`/dashboard/${subscriptionId}/certificates`}>
                    <img src={certificate} alt="deliverables" />
                    {t("dashboard.certificates")}
                  </NavLink>
                </li>
                <li onClick={() => setMenuOpen(false)}>
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
                <Route path="/goals/:goalId" element={<GoalDetails />} />
                <Route path="/course-students" element={<CourseStudents />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route
                  path="/certificates/:certificateId"
                  element={<CertificateViewer />}
                />
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
