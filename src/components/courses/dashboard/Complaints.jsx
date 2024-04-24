import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "../../ui/form-elements/TextField";
import axios from "./../../../util/axios";
import { useParams } from "react-router-dom";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import { toast } from "react-toastify";

const Complaints = () => {
  const cForm = useRef(null);
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const [complaintTypes, setComplaintTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [formData, setFormData] = useState({
    title_id: "",
    details: "",
    studnent_id: ""
  });

  useEffect(() => {
    const getComplaintTypes = async () => {
      try {
        const response = await axios.get("/members/List_tickettitle/");
        if (response?.status === 200 || response?.status === 201) {
          setComplaintTypes(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getComplaintTypes().then(() => {
      const getEnrolledStudents = async () => {
        try {
          const response = await axios.get(
            `/members/list_Student/?subscription_id=${subscriptionId}`
          );
          if (response?.status === 200 || response?.status === 201) {
            setEnrolledStudents(response?.data?.message);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getEnrolledStudents();
    });
  }, [subscriptionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `/members/Create_ticket/${formData?.studnent_id}/`,
        {
          title_id: formData?.title_id,
          details: formData?.details
        }
      );
      if (response?.status === 200 || response?.status === 201) {
        cForm.current.reset();
        toast.success(t("dashboard.complainSent"));
      } else {
        toast.error(t("auth.someThingWentWrong"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaints">
      <div className="title">
        <h2>{t("dashboard.complain")}</h2>
        <p>{t("dashboard.complainSubTitle")}</p>
      </div>
      <div className="row m-0 justify-content-center">
        <div className="col-lg-10 col-12 p-2">
          <form ref={cForm} onSubmit={handleSubmit} className="form-ui">
            <div className="form_group">
              <div className="input-field">
                <label htmlFor="complaintType">{t("complainType")}</label>
                <select
                  name="complaintType"
                  id="complaintType"
                  value={formData.title_id}
                  onChange={(e) =>
                    setFormData({ ...formData, title_id: e.target.value })
                  }
                >
                  <option value="" disabled>
                    {t("dashboard.choose")}
                  </option>
                  {complaintTypes?.map((complaintType) => (
                    <option
                      value={complaintType?.title_id}
                      key={complaintType?.title_id}
                    >
                      {complaintType?.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-field">
                <label htmlFor="student">{t("dashboard.student")}</label>
                <select
                  name="student"
                  id="student"
                  value={formData.studnent_id}
                  onChange={(e) =>
                    setFormData({ ...formData, studnent_id: e.target.value })
                  }
                >
                  <option value="" disabled>
                    {t("dashboard.choose")}
                  </option>
                  {enrolledStudents?.map((student) => (
                    <option
                      value={student?.studentclass_id}
                      key={student?.studentclass_id}
                    >
                      {student?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <TextField
              label={t("auth.message")}
              htmlFor="details"
              placeholder={t("dashboard.writeHere")}
              formData={formData}
              name="message"
              setFormData={setFormData}
              value={formData.details}
            />
            <SubmitButton loading={loading} name={t("send")} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
