import React from "react";
import studentImage from "../../../../assets/images/student.svg";
import { useTranslation } from "react-i18next";

const ChooseStudent = ({
  subscriptionStudents,
  formData,
  setFormData,
  setStep
}) => {
  const { t } = useTranslation();
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
        </div>
        <div className="col-12 p-2">
          <div className="input-field">
            <label htmlFor="change_reason">{t("dashboard.changeReason")}</label>
            <select name="change_reason" id="change_reason">
              <option value="">{t("dashboard.choose")}</option>
              <option value="reason1">{t("dashboard.reason1")}</option>
              <option value="reason2">{t("dashboard.reason2")}</option>
              <option value="reason3">{t("dashboard.reason3")}</option>
            </select>
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
          <button
            className="continue"
            onClick={() => setStep(formData.oldAppointments ? 4 : 2)}
          >
            {t("dashboard.next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseStudent;
