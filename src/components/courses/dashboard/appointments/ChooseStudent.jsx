import React, { useEffect, useState } from "react";
import studentImage from "../../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "./../../../../util/axios";

const ChooseStudent = ({ formData, setFormData, reasons, setStep }) => {
  const [isReasonFieldError, setIsReasonFieldError] = useState(false);
  const { subscriptionId } = useParams();
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [isStudentFieldError, setIsStudentFieldError] = useState(false);
  const { t } = useTranslation();
  const handleNext = () => {
    if (formData.student_id && formData.changing_reason_id) {
      setStep(formData.oldAppointments ? 4 : 2);
    } else {
      !formData.student_id
        ? setIsStudentFieldError(true)
        : setIsStudentFieldError(false);
      !formData.changing_reason_id
        ? setIsReasonFieldError(true)
        : setIsReasonFieldError(false);
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
            {subscriptionStudents &&
              subscriptionStudents.map((student) => (
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
                          src={
                            student?.profile ? student?.profile : studentImage
                          }
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
            <label htmlFor="change_reason">{t("dashboard.changeReason")}</label>
            <select
              name="change_reason"
              id="change_reason"
              value={formData.changing_reason_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  changing_reason_id: Number(e.target.value)
                })
              }
            >
              <option value="">{t("dashboard.choose")}</option>
              {reasons.map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {reason.reason}
                </option>
              ))}
            </select>
            {isReasonFieldError && (
              <span className="error">{t("error.chooseReason")}</span>
            )}
          </div>
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label>{t("dashboard.appointments")}</label>
            <div className="d-flex gap-2">
              <label htmlFor="sameAppointments" className="appontementheck">
                <input
                  type="radio"
                  id="sameAppointments"
                  name="appointments"
                  checked={formData.oldAppointments === true}
                  onChange={() => {
                    setFormData({
                      ...formData,
                      oldAppointments: true
                    });
                  }}
                />
                <div className="content">
                  <h4>{t("dashboard.sameAppointments")}</h4>
                </div>
              </label>
              <label htmlFor="newAppointments" className="appontementheck">
                <input
                  type="radio"
                  id="newAppointments"
                  name="appointments"
                  checked={formData.oldAppointments === false}
                  onChange={() => {
                    setFormData({ ...formData, oldAppointments: false });
                  }}
                />
                <div className="content">
                  <h4>{t("dashboard.newAppointments")}</h4>
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
