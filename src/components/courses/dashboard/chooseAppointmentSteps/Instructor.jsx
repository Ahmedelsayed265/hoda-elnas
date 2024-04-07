import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InstructorCard from "./../cards/InstructorCard";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { DAYS_EN } from "../../../../constants";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";

const Instructor = ({
  formData,
  setFormData,
  setStep,
  handleEnroll,
  enrollLoading
}) => {
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const appointments = [...formData.appointments];
        const updatedAppointments = appointments.map((appointment) => ({
          ...appointment,
          day: DAYS_EN[appointment.day]
        }));
        const response = await axios.get(
          `/instructor/Available_instructor_new_student/?student_id=${
            formData.student_id
          }&goal_id=${formData.goal_id}&subscription_id=${
            formData.subscription_id
          }&time_option=${formData.time_option}&appointments=${JSON.stringify(
            updatedAppointments
          )}`
        );
        if (response.status === 200) {
          setInstructors(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(t("auth.someThingWentWrong"));
      }
    };

    fetchInstructors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.appointments,
    formData.goal_id,
    formData.student_id,
    formData.subscription_id,
    formData.time_option
  ]);

  return (
    <div className="row m-0">
      <div className="col-12 p-2">
        <div className="slider_instructors">
          {instructors?.map((instructor) => (
            <InstructorCard
              key={instructor.instructor_id}
              instructor={instructor}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
        </div>
      </div>
      {formData.time_option === "range" && formData.instructor_id && (
        <div className="col-12 p-2 pt-4">
          <div className="instructor_availabilty form-ui">
            <h6>{t("dashboard.selectInstructorAvailablity")}</h6>
            {instructors
              ?.find(
                (instructor) =>
                  instructor.instructor_id === formData.instructor_id
              )
              ?.avaliable_daystime.map((day, index) => (
                <div className="availabilty_row" key={index}>
                  <div className="day">{day.day}</div>
                  <div className="input-field">
                    <select
                      name="appointment"
                      id="saturdayAppointment"
                      value={formData.appointments[index].starttime}
                      onChange={(e) => {
                        const updatedAppointments = [...formData.appointments];
                        updatedAppointments[index].starttime = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          appointments: updatedAppointments
                        }));
                      }}
                    >
                      {day.avaliabletime.map((time, index) => (
                        <option key={index} value={time[0]}>
                          {t("dashboard.from")} {time[0]} {t("dashboard.to")}
                          {time[1]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="col-12 p-2 d-flex justify-content-between">
        <button className="back" onClick={() => setStep(3)}>
          {t("dashboard.back")}
        </button>
        <SubmitButton
          loading={enrollLoading}
          className={"continue"}
          name={t("dashboard.save")}
          onClick={handleEnroll}
        />
      </div>
    </div>
  );
};

export default Instructor;
