import React, { useEffect, useState } from "react";
import axios from "../../../../util/axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AddStudentModal from "./AddStudentModal";
import StudentCard from "../cards/StudentCard";
import AppointmentsModal from "./AppointmentsModal";
import { useSelector } from "react-redux";
import DataLoader from "../../../ui/DataLoader";

const CourseStudents = () => {
  const userId = useSelector((state) => state?.authedUser?.user?.id);
  const { t } = useTranslation();
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(true);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
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
        setShowAppointmentsModal(true);
      } else {
        toast.error(t("dashboard.thisStudentAlreadyExist"));
      }
    } catch (error) {
      console.log(error);
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/members/list_Student/?parent_id=${userId}`
        );
        if (response.status === 200) {
          setStudents(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(t("auth.someThingWentWrong"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, t]);

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
          {loading ? (
            <DataLoader />
          ) : students?.length > 0 ? (
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
      <AppointmentsModal
        showModal={showAppointmentsModal}
        setShowModal={setShowAppointmentsModal}
      />
    </section>
  );
};

export default CourseStudents;
