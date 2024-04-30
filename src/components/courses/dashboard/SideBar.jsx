import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import tasks from "../../../assets/images/deliverables.svg";
import home from "../../../assets/images/home.svg";
import complainIcon from "../../../assets/images/complain.svg";
import reports from "../../../assets/images/reports.svg";
import goals from "../../../assets/images/goals.svg";
import certificate from "../../../assets/images/certificate.svg";
import calender from "../../../assets/images/calnder.svg";
import students from "../../../assets/images/students.svg";

const SideBar = ({ menuOpen, setMenuOpen, menuRef }) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();

  return (
    <aside className={`sideMenu ${menuOpen ? "open" : ""}`} ref={menuRef}>
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
          <NavLink end to={`/dashboard/${subscriptionId}/course-students`}>
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
        <li onClick={() => setMenuOpen(false)}>
          <NavLink end to={`/dashboard/${subscriptionId}/complaints`}>
            <img src={complainIcon} alt="deliverables" />
            {t("dashboard.complain")}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
