import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TimingRow from "./TimingRow";
import SubmitButton from "../../../../ui/form-elements/SubmitButton";
import axios from "./../../../../../util/axios";
import { DAYS_EN } from "../../../../../constants";

const ChooseAppointments = ({
  formData,
  setFormData,
  setStep,
  setAppointments,
  setShowModal
}) => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [loading, setLoading] = useState(false);
  const subslist = useSelector((state) => state.authedUser?.user?.subslist);
  const cpw = subslist?.find((sub) => sub.id === +subscriptionId)?.cpw;

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const hasEmptyField = formData.appointments.some((appointment) => {
      if (formData.time_option === "specific") {
        return !appointment.day || !appointment.starttime;
      } else {
        return (
          !appointment.day || !appointment.starttime || !appointment.endtime
        );
      }
    });

    if (hasEmptyField) {
      toast.error(t("dashboard.fillTimeTabel"));
      setLoading(false);
      return;
    }

    const updatedAppointments = formData.appointments.map((appointment) => ({
      ...appointment,
      day: DAYS_EN[parseInt(appointment.day)]
    }));

    try {
      const res = await axios.post("/instructor/Set_New_appointment/", {
        subscription_id: formData.subscription_id,
        studentclass_id: formData.student_id,
        appointments: updatedAppointments,
        instructor_status: "same_instructor"
      });

      if (res.status === 200 || res.status === 201) {
        toast.success(t("dashboard.addAppointmentSuccess"));
        setAppointments(res?.data?.object);
        setShowModal(false);
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(t("dashboard.addAppointmentError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row m-0 form-ui">
      <div className="col-12 p-2">
        {Array(cpw)
          .fill()
          .map((_, index) => (
            <TimingRow
              key={index}
              index={index}
              formData={formData}
              setFormData={setFormData}
            />
          ))}
      </div>
      <div className="col-12 p-2 d-flex justify-content-between">
        <button className="back" onClick={() => setStep(1)}>
          {t("dashboard.back")}
        </button>
        <SubmitButton
          name={t("dashboard.add")}
          onClick={handleSubmit}
          loading={loading}
          className={"continue m-0 w-25 rounded"}
        />
      </div>
    </div>
  );
};

export default ChooseAppointments;
