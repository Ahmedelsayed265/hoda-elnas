import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import axios from "./../../util/axios";
import { useSelector } from "react-redux";
import AddStudentModal from "../courses/dashboard/students/AddStudentModal";
import MyStudentCard from "./MyStudentCard";
import DataLoader from "../ui/DataLoader";
// import ConfirmDeleteModal from "../ui/ConfirmDeleteModal";

const MyStudents = () => {
  const { t } = useTranslation();
  const userId = useSelector((state) => state?.authedUser?.user?.id);
  const [showModal, setShowModal] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(null);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    profile: "",
    studentname: "",
    studentage: "",
    studentcontact: "",
    sex: "",
    notes: ""
  });

  useEffect(() => {
    if (mode === "add") {
      setFormData({
        profile: "",
        studentname: "",
        studentage: "",
        studentcontact: "",
        sex: "",
        notes: ""
      });
    }
  }, [mode]);

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

  const handleEditStudent = (id) => {
    const targetStudent = allStudents.find((student) => student.id === +id);
    setMode("edit");
    setFormData({
      profile: targetStudent?.profile,
      studentname: targetStudent?.name,
      studentage: targetStudent?.age,
      studentcontact: targetStudent?.contact,
      sex: targetStudent?.gender,
      notes: targetStudent?.notes
    });
    setStudentId(id);
    setShowModal(true);
  };

  // const deleteHandler = async () => {};

  // const handleDeleteStudent = (id) => {
  //   setStudentId(id);
  //   setShowDeleteModal(true);
  // };

  const editStudentHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payLoad = {
        name: formData?.studentname,
        age: formData?.studentage,
        contact: formData?.studentcontact,
        gender: formData?.sex,
        notes: formData?.notes
      };
      if (typeof formData?.profile === "object") {
        payLoad.profile = formData?.profile;
      }
      const response = await axios.put(
        `/members/edit_Student/${studentId}/`,
        payLoad
      );
      if (response.status === 200) {
        setShowModal(false);
        setMode("add");
        setAllStudents((prev) =>
          prev.map((student) => {
            if (student.id === +studentId) {
              return response?.data?.object[0];
            }
            return student;
          })
        );
      } else {
        toast.error(t("auth.someThingWentWrong"));
      }
    } catch (error) {
      console.log(error);
      toast.error(t("auth.someThingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

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
                  // onDeleteStudent={() => handleDeleteStudent(student?.id)}
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
        handleAddStudent={mode === "add" ? addStudent : editStudentHandler}
        setFormData={setFormData}
        setMode={setMode}
        mode={mode}
      />
      {/* <ConfirmDeleteModal
        setShowModal={setShowDeleteModal}
        showModal={showDeleteModal}
        target={
          allStudents?.find((student) => student?.id === +studentId)?.name
        }
        onDelete={deleteHandler}
        buttonText={t("delete")}
        text={t("areYouSureYouWantDleteStudent")}
      /> */}
    </section>
  );
};

export default MyStudents;
