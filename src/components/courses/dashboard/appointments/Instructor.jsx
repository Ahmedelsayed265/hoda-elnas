import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InstructorCard from "./../cards/InstructorCard";
import axios from "./../../../../util/axios";
import { DAYS_EN } from "../../../../constants";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";
import { useTimeFormatting } from "../../../../hooks/useTimeFormatting";
import { useSelector } from "react-redux";

const Instructor = ({
  formData,
  setFormData,
  setStep,
  timeOptions,
  handleEnroll,
  enrollLoading,
  setEnrollmentData,
  subscriptionStudents
}) => {
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState([]);
  const { lang } = useSelector((state) => state.language);
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();
  const student = subscriptionStudents?.find(
    (student) => student.studentclass_id === +formData.student_id
  );

  console.log(student);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const appointments = [...formData.appointments];
        const updatedAppointments = appointments.map((appointment) => ({
          ...appointment,
          day: DAYS_EN[appointment.day]
        }));
        const response = await axios.get(
          formData.oldAppointments
            ? `/instructor/Available_instructors_same_time_enrolled_student/${formData?.student_id}/`
            : `/instructor/Available_instructors_new_time_enrolled_student/${
                formData?.student_id
              }/?time_option=${
                formData.time_option
              }&appointments=${JSON.stringify(updatedAppointments)}`
        );
        if (response.status === 200) {
          setInstructors(response.data.message);
          if (timeOptions === "range") {
            setEnrollmentData((prev) => ({
              ...prev,
              appointments: formData.appointments.map((appointment) => ({
                ...appointment,
                starttime: ""
              }))
            }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstructors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
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
                      <option value={""} disabled>
                        {t("dashboard.choose")}
                      </option>
                      {day.avaliabletime.map((time, index) => (
                        <option key={index} value={time[0]}>
                          {t("dashboard.from")}{" "}
                          {lang === "ar"
                            ? translateToArabic(convertTo12HourFormat(time[0]))
                            : convertTo12HourFormat(time[0])}{" "}
                          {t("dashboard.to")}{" "}
                          {lang === "ar"
                            ? translateToArabic(convertTo12HourFormat(time[1]))
                            : convertTo12HourFormat(time[1])}
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
        <button
          className="back"
          onClick={() => setStep(formData.oldAppointments ? 1 : 3)}
        >
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
