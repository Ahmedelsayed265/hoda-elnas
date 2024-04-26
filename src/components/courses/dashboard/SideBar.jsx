import React, { useEffect, useState } from "react";
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
import axios from "./../../../util/axios";
import { useSelector } from "react-redux";

const SideBar = ({ menuOpen, setMenuOpen, menuRef }) => {
  const lang = useSelector((state) => state.language.lang);
  const [sub, setSub] = useState("");
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/List_student_subs/?id=${subscriptionId}`
        );
        setSub(response?.data?.message[0]?.course_name);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
  }, [subscriptionId, lang]);
  return (
    <aside className={menuOpen ? "open" : ""} ref={menuRef}>
      <div className="user_img">{sub && <h6>{sub}</h6>}</div>
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
