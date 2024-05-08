import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/ui/form-elements/InputField";
import Gender from "./../components/ui/form-elements/Gender";
import TextField from "../components/ui/form-elements/TextField";
import SubmitButton from "./../components/ui/form-elements/SubmitButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ApplyForJob = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const userId = useSelector((state) => state.auth.user?.id);

  const [formData, setFormData] = useState({
    job_id: id,
    user_id: userId,
    address: "",
    education_level: "",
    degrees_or_certifications: "",
    major_or_area_of_study: "",
    work_history: "",
    relevant_experience: "",
    significant_accomplishment: "",
    technical_skills: "",
    software_experience: "",
    challenges_overcome: "",
    conflict_resolution: "",
    working_under_pressure: "",
    work_environment_preference: "",
    teamwork_preference: "",
    salary_expectation: "",
    availability_start_date: "",
    availability_restrictions: "",
    additional_info: "",
    questions_for_company: "",
    cv: "",
    linkedin: "",
    why_you: ""
  });

  return (
    <section className="apply-for-job">
      <div className="container">
        <div className="row m-0 justify-content-center">
          <div className="col-12 p-2">
            <h3>{t("joinOurTeam")}</h3>
          </div>
          <div className="col-lg-10 col-12">
            <form className="form-ui ">
              <div className="form_group">
                <InputField
                  label={t("auth.fullName")}
                  placeholder={t("auth.enterYourName")}
                  type="text"
                  htmlFor="full_name"
                  value={formData.full_name}
                  formData={formData}
                  id="full_name"
                  setFormData={setFormData}
                  icon={<i className="fa-light fa-user"></i>}
                />
                <InputField
                  label={t("auth.email")}
                  placeholder={t("auth.emailPlaceHolder")}
                  type="email"
                  htmlFor="email"
                  value={formData.email}
                  formData={formData}
                  id="email"
                  setFormData={setFormData}
                  icon={<i className="fa-light fa-envelope"></i>}
                />
              </div>
              {/* gender */}
              <Gender
                setFormData={setFormData}
                formData={formData}
                dataKey="gender"
              />
              <div className="form_group">
                <TextField
                  label={t("jobsPage.aboutYou")}
                  placeholder={t("jobsPage.aboutYou")}
                  htmlFor="about"
                  value={formData.about}
                  formData={formData}
                  id="about"
                  setFormData={setFormData}
                />
                <TextField
                  label={t("jobsPage.whyYouWantToJoin")}
                  placeholder={t("jobsPage.whyYouWantToJoin")}
                  htmlFor="whyYouWantToJoin"
                  value={formData.why_you_want_to_join}
                  formData={formData}
                  id="whyYouWantToJoin"
                  setFormData={setFormData}
                />
              </div>
              <SubmitButton name={t("jobsPage.submit")} loading={false} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyForJob;
