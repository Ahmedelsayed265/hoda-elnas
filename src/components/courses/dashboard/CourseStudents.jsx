import React, { useEffect, useState } from "react";
import axios from "./../../../util/axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddStudentModal from "./AddStudentModal";

const CourseStudents = () => {
  const { subscriptionId } = useParams();
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`/members/list_Student/?subscription_id=${subscriptionId}`)
      .then((response) => {
        if (response.status === 200) {
          setStudents(response?.data?.message);
        }
      });
  });
  return (
    <section className="course_students">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="header">
              <div className="title">
                <h5>{t("dashboard.inCourseStudents")}</h5>
              </div>
              <button onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-user-plus"></i>{" "}
                {t("dashboard.addStudent")}
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 p-2">
          {students?.length > 0 ? (
            students?.map((student) => <p></p>)
          ) : (
            <div className="noStudents">
              <h5>{t("dashboard.noStudents")}</h5>
              <p>{t("dashboard.noStudentsSubTitle")}</p>
            </div>
          )}
        </div>
      </div>
      <AddStudentModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
};

export default CourseStudents;
