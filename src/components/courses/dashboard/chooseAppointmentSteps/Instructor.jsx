import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InstructorCard from "./../cards/InstructorCard";
import axios from "./../../../../util/axios";
import { DAYS_EN } from "../../../../constants";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";
import { useTimeFormatting } from "../../../../hooks/useTimeFormatting";
import { useSelector } from "react-redux";
import DataLoader from "../../../ui/DataLoader";

const Instructor = ({
  formData,
  setFormData,
  setStep,
  timeOptions,
  handleEnroll,
  enrollLoading,
  handleFindInstructor,
  findInstructorLoading,
  setEnrollmentData
}) => {
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setFetchLoading(true);
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
      } finally {
        setFetchLoading(false);
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
        {fetchLoading ? (
          <DataLoader minHeight={"236px"} />
        ) : (
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
        )}
      </div>
      {!fetchLoading && instructors?.length === 0 && (
        <div className="col-12 p-2 d-flex align-items-center justify-content-center gap-2 flex-column mb-3">
          <h6>{t("noInstructorFound")}</h6>
          <SubmitButton
            className="save_bttn"
            loading={findInstructorLoading}
            name={t("sendRequestToFindInstructor")}
            onClick={handleFindInstructor}
          />
        </div>
      )}
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
