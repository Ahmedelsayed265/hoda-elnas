import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "./../../util/axios";
import { useSelector } from "react-redux";
import AddStudentModal from "../courses/dashboard/students/AddStudentModal";
import MyStudentCard from "./MyStudentCard";
import DataLoader from "../ui/DataLoader";
import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";

const MyStudents = () => {
  const { t } = useTranslation();
  const userId = useSelector((state) => state?.authedUser?.user?.id);
  const [showModal, setShowModal] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        setFormData({
          profile: "",
          studentname: "",
          studentage: "",
          studentcontact: "",
          sex: "",
          notes: ""
        });
        setAllStudents((prev) => [...prev, response?.data?.object[0]]);
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
        setDataLoading(true);
        const response = await axios.get(
          `/members/list_Student/?parent_id=${userId}`
        );
        if (response.status === 200) {
          setAllStudents(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(t("auth.someThingWentWrong"));
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleDeleteStudent = (id) => {
    setStudentId(id);
    setShowDeleteModal(true);
  };

  const handleEditStudent = (id) => {
    const targetStudent = allStudents?.find((student) => student?.id === +id);
    console.log(targetStudent);
    if (targetStudent) {
      setFormData((prev) => ({
        ...prev,
        profile: targetStudent?.profile,
        studentname: targetStudent?.studentname,
        studentage: targetStudent?.studentage,
        studentcontact: targetStudent?.studentcontact,
        sex: targetStudent?.sex,
        notes: targetStudent?.notes
      }));
    }
    setStudentId(id);
    setShowModal(true);
  };

  const deleteHandler = async () => {};

  return (
    <section className="my-students">
      <div className="container">
        <div className="row m-0">
          <div className="col-12 p-2 mb-2">
            <div className="header">
              <div className="title">
                <h5>{t("myStudnets")}</h5>
              </div>
              <button
                onClick={() => setShowModal(true)}
                style={{ width: "auto" }}
              >
                <i className="fa-solid fa-user-plus"></i>{" "}
                {t("dashboard.addStudent")}
              </button>
            </div>
          </div>
          {dataLoading ? (
            <DataLoader />
          ) : (
            allStudents?.map((student) => (
              <div className="col-lg-3 col-md-4 col-12 p-2" key={student?.id}>
                <MyStudentCard
                  student={student}
                  onDeleteStudent={() => handleDeleteStudent(student?.id)}
                  onEditStudent={() => handleEditStudent(student?.id)}
                />
              </div>
            ))
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
      <ConfirmDeleteModal
        setShowModal={setShowDeleteModal}
        showModal={showDeleteModal}
        target={
          allStudents?.find((student) => student?.id === +studentId)?.name
        }
        onDelete={deleteHandler}
        text={t("areYouSureYouWantDleteStudent")}
      />
    </section>
  );
};

export default MyStudents;
