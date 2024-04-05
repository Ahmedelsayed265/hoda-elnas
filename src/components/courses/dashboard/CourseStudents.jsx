import React, { useEffect, useState } from "react";
import axios from "./../../../util/axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AddStudentModal from "./AddStudentModal";
import StudentCard from "./StudentCard";

const CourseStudents = () => {
  const { subscriptionId } = useParams();
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profile: "",
    studentname: "",
    studentage: "",
    studentcontact: "",
    sex: "",
    notes: ""
  });

  const addStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/members/add_Student/", formData);
      if (response.status === 200 || response.status === 201) {
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get(`/members/list_Student/`).then((response) => {
      if (response.status === 200) {
        setStudents(response?.data?.message);
      }
    });
  }, [subscriptionId]);

  return (
    <section className="course_students">
      <div className="container p-0">
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
        <div className="col-12 p-2 mt-3">
          {students?.length > 0 ? (
            <div className="students_grid">
              {students.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          ) : (
            <div className="noStudents">
              <h5>{t("dashboard.noStudents")}</h5>
              <p>{t("dashboard.noStudentsSubTitle")}</p>
            </div>
          )}
        </div>
      </div>
      <AddStudentModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        formData={formData}
        handleAddStudent={addStudent}
        setFormData={setFormData}
      />
    </section>
  );
};

export default CourseStudents;
