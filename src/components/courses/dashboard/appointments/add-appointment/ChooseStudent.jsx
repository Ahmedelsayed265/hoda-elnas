import React, { useEffect, useState } from "react";
import studentImage from "../../../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";
import axios from "./../../../../../util/axios";
import { useParams } from "react-router-dom";

const ChooseStudent = ({ formData, setFormData, setStep }) => {
  const [isStudentFieldError, setIsStudentFieldError] = useState(false);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const { t } = useTranslation();
  const { subscriptionId } = useParams();

  const handleNext = () => {
    if (formData.student_id) {
      setStep(formData.instructor ? 5 : 2);
    } else {
      !formData.student_id
        ? setIsStudentFieldError(true)
        : setIsStudentFieldError(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/list_Student/?subscription_id=${subscriptionId}`
        );
        if (response.status === 200) {
          setSubscriptionStudents(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="choose_student">
            {subscriptionStudents?.map((student) => (
              <div className="choose_student" key={student.studentclass_id}>
                <label className="student_check">
                  <input
                    type="radio"
                    name="student"
                    value={student.studentclass_id}
                    required
                    checked={+formData.student_id === student.studentclass_id}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        student_id: e.target.value
                      }));
                    }}
                  />
                  <div className="content">
                    <div className="img">
                      <img
                        src={student?.profile ? student?.profile : studentImage}
                        alt="student"
                      />
                    </div>
                    <p>{student.name}</p>
                  </div>
                </label>
              </div>
            ))}
          </div>
          {isStudentFieldError && (
            <span className="error">{t("error.chooseStudent")}</span>
          )}
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>{t("dashboard.instructor")}</label>
            <div className="d-flex gap-2">
              <label htmlFor="sameInstructor" className="appontementheck">
                <input
                  type="radio"
                  id="sameInstructor"
                  name="appointments"
                  checked={formData.instructor === true}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      instructor: true
                    });
                  }}
                />
                <div className="content">
                  <h4>{t("dashboard.sameInstructor")}</h4>
                </div>
              </label>
              <label htmlFor="newInstructor" className="appontementheck">
                <input
                  type="radio"
                  id="newInstructor"
                  name="appointments"
                  checked={formData.instructor === false}
                  onChange={() => {
                    setFormData({ ...formData, instructor: false });
                  }}
                />
                <div className="content">
                  <h4>{t("dashboard.newInstructor")}</h4>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12 p-2 pt-3 d-flex justify-content-end">
          <button className="continue" onClick={(e) => handleNext(e)}>
            {t("dashboard.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseStudent;
