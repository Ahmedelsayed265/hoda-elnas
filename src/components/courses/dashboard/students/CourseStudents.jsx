import React, { useEffect, useState } from "react";
import axios from "../../../../util/axios";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AddStudentModal from "./AddStudentModal";
import StudentCard from "../cards/StudentCard";
import AppointmentsModal from "./AppointmentsModal";
import { useSelector } from "react-redux";
import DataLoader from "../../../ui/DataLoader";
import { useParams } from "react-router-dom";

const CourseStudents = () => {
  const userId = useSelector((state) => state?.authedUser?.user?.id);
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [studentId, setStudentId] = useState(null);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/members/list_Student/?parent_id=${userId}`
        );
        if (response.status === 200) {
          setAllStudents(response?.data?.message);
        }
        const response2 = await axios.get(
          `/members/list_Student/?subscription_id=${subscriptionId}`
        );
        if (response2.status === 200) {
          setSubscriptionStudents(response2?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(t("auth.someThingWentWrong"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, subscriptionId]);

  const addStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/members/add_Student/", formData);
      if (response.status === 200 || response.status === 201) {
        setShowModal(false);
        setShowAppointmentsModal(true);
        setStudentId(response?.data?.object[0]?.id);
        setAllStudents((prev) => [...prev, formData]);
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

  const handleAdd = (id) => {
    setStudentId(id);
    setShowAppointmentsModal(true);
  };

  const handleRemove = async (id) => {
    const response = await axios.post(`/members/Withdrawing_Student/${id}/`);
    if (response.status === 200) {
      setSubscriptionStudents(
        subscriptionStudents.filter((student) => student.student_id !== id)
      );
      toast.success(t("dashboard.removedSuccessfully"));
    } else {
      toast.error(t("auth.someThingWentWrong"));
    }
  };

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
          ) : allStudents?.length > 0 ? (
            <div className="students_grid">
              {allStudents.map((student) => {
                const isEnrolled = subscriptionStudents.some(
                  (enrolledStudent) =>
                    enrolledStudent.student_id === student.student_id
                );
                return (
                  <StudentCard
                    key={student.id}
                    student={student}
                    button={isEnrolled ? "remove" : "add"}
                    handleClick={() =>
                      isEnrolled
                        ? handleRemove(student.student_id)
                        : handleAdd(student.student_id)
                    }
                  />
                );
              })}
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
        allStudents={allStudents}
        setSubscriptionStudents={setSubscriptionStudents}
        subscriptionStudents={subscriptionStudents}
        studentId={studentId}
        showModal={showAppointmentsModal}
        setShowModal={setShowAppointmentsModal}
      />
    </section>
  );
};

export default CourseStudents;
