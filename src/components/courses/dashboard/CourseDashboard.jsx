import React, { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import CourseStudents from "./students/CourseStudents";
import Appointments from "./appointments/Appointments";
import Reports from "./reports/Reports";
import ReportViewer from "./reports/ReportViewer";
import Assignments from "./assignments/Assignments";
import AssignmentDetails from "./assignments/AssignmentDetails";
import HomePage from "./home/HomePage";
import CertificatesPage from "./certificates/CertificatesPage";
import StudentsGoals from "./goals/StudentsGoals";
import CertificateViewer from "./certificates/CertificateViewer";
import GoalDetails from "./goals/GoalDetails";
import Complaints from "./Complaints";
import SideBar from "./SideBar";

const CourseDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="course_dashboard">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-3 col-md-3 col-12 p-lg-2 mt-lg-3">
            <SideBar
              menuOpen={menuOpen}
              menuRef={menuRef}
              setMenuOpen={setMenuOpen}
            />
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
                <Route path="/complaints" element={<Complaints />} />
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
