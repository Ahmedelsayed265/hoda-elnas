import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/ui/form-elements/InputField";
import TextField from "../components/ui/form-elements/TextField";
import SubmitButton from "./../components/ui/form-elements/SubmitButton";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ApplyForJob = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const userId = useSelector((state) => state.authedUser?.user?.id);
  const [loading, setLoading] = useState(false);
  const [stepName, setStepName] = useState("education");

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
          <div className="col-12 p-2">
            <form className="form-ui ">
              <div className="mb-4 pb-3 wizard_tabs">
                <div
                  onClick={() => setStepName("education")}
                  className={`wizard_tab ${
                    stepName === "education" ? "active" : ""
                  }`}
                >
                  <div className="num">
                    <span>{1}</span>
                  </div>
                  <div className="content">
                    <h6>{t("applyForJob.education")}</h6>
                  </div>
                </div>
                <div
                  onClick={() => setStepName("experience")}
                  className={`wizard_tab ${
                    stepName === "experience" ? "active" : ""
                  }`}
                >
                  <div className="num">
                    <span>{2}</span>
                  </div>
                  <div className="content">
                    <h6>{t("applyForJob.experience")}</h6>
                  </div>
                </div>
                <div
                  onClick={() => setStepName("personal")}
                  className={`wizard_tab ${
                    stepName === "personal" ? "active" : ""
                  }`}
                >
                  <div className="num">
                    <span>{3}</span>
                  </div>
                  <div className="content">
                    <h6>{t("applyForJob.personal")}</h6>
                  </div>
                </div>
                <div
                  onClick={() => setStepName("work_details")}
                  className={`wizard_tab ${
                    stepName === "work_details" ? "active" : ""
                  }`}
                >
                  <div className="num">
                    <span>{4}</span>
                  </div>
                  <div className="content">
                    <h6>{t("applyForJob.workDetails")}</h6>
                  </div>
                </div>
                <div
                  onClick={() => setStepName("closer_shot")}
                  className={`wizard_tab ${
                    stepName === "closer_shot" ? "active" : ""
                  }`}
                >
                  <div className="num">
                    <span>{5}</span>
                  </div>
                  <div className="content">
                    <h6>{t("applyForJob.closerShot")}</h6>
                  </div>
                </div>
              </div>
              <div className="form_group">
                <InputField
                  label={t("applyForJob.address")}
                  placeholder={t("dashboard.writeHere")}
                  type="text"
                  htmlFor="address"
                  value={formData.address}
                  formData={formData}
                  id="address"
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.linkedin")}
                  placeholder={t("dashboard.writeHere")}
                  type="url"
                  id="linkedin"
                  htmlFor="linkedin"
                  value={formData.linkedin}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.availabilityStartDate")}
                  type="date"
                  id="availability_start_date"
                  htmlFor="availability_start_date"
                  value={formData.availability_start_date}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <InputField
                  label={t("applyForJob.salaryExpectation")}
                  placeholder={t("dashboard.writeHere")}
                  type="number"
                  id="salary_expectation"
                  htmlFor="salary_expectation"
                  value={formData.salary_expectation}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.educationLevel")}
                  placeholder={t("dashboard.writeHere")}
                  id="education_level"
                  htmlFor="education_level"
                  value={formData.education_level}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.technicalSkills")}
                  placeholder={t("dashboard.writeHere")}
                  id="technical_skills"
                  htmlFor="technical_skills"
                  value={formData.technical_skills}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <InputField
                  label={t("applyForJob.workHistory")}
                  placeholder={t("dashboard.writeHere")}
                  id="work_history"
                  htmlFor="work_history"
                  value={formData.work_history}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.softwareExperience")}
                  placeholder={t("dashboard.writeHere")}
                  id="software_experience"
                  htmlFor="software_experience"
                  value={formData.software_experience}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.majorOrAreaOfStudy")}
                  placeholder={t("dashboard.writeHere")}
                  id="major_or_area_of_study"
                  htmlFor="major_or_area_of_study"
                  value={formData.major_or_area_of_study}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <InputField
                  label={t("applyForJob.degreesOrCertifications")}
                  placeholder={t("dashboard.writeHere")}
                  id="degrees_or_certifications"
                  htmlFor="degrees_or_certifications"
                  value={formData.degrees_or_certifications}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.relevantExperience")}
                  placeholder={t("dashboard.writeHere")}
                  id="relevant_experience"
                  htmlFor="relevant_experience"
                  value={formData.relevant_experience}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.significantAccomplishment")}
                  placeholder={t("dashboard.writeHere")}
                  id="significant_accomplishment"
                  htmlFor="significant_accomplishment"
                  value={formData.significant_accomplishment}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <InputField
                  label={t("applyForJob.challengesOvercome")}
                  placeholder={t("dashboard.writeHere")}
                  id="challenges_overcome"
                  htmlFor="challenges_overcome"
                  value={formData.challenges_overcome}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.conflictResolution")}
                  placeholder={t("dashboard.writeHere")}
                  id="conflict_resolution"
                  htmlFor="conflict_resolution"
                  value={formData.conflict_resolution}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  label={t("applyForJob.workingUnderPressure")}
                  placeholder={t("dashboard.writeHere")}
                  id="working_under_pressure"
                  htmlFor="working_under_pressure"
                  value={formData.working_under_pressure}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <TextField
                  label={t("applyForJob.workEnvironmentPreference")}
                  placeholder={t("dashboard.writeHere")}
                  htmlFor="work_environment_preference"
                  id="work_environment_preference"
                  value={formData.work_environment_preference}
                  formData={formData}
                  setFormData={setFormData}
                />
                <TextField
                  label={t("applyForJob.teamworkPreference")}
                  placeholder={t("dashboard.writeHere")}
                  htmlFor="teamwork_preference"
                  id="teamwork_preference"
                  value={formData.teamwork_preference}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <TextField
                  label={t("applyForJob.availabilityRestrictions")}
                  placeholder={t("dashboard.writeHere")}
                  htmlFor="availability_restrictions"
                  id="availability_restrictions"
                  value={formData.availability_restrictions}
                  formData={formData}
                  setFormData={setFormData}
                />
                <TextField
                  label={t("applyForJob.additionalInfo")}
                  placeholder={t("dashboard.writeHere")}
                  htmlFor="additional_info"
                  id="additional_info"
                  value={formData.additional_info}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
              <div className="form_group">
                <TextField
                  label={t("applyForJob.whyYou")}
                  placeholder={t("dashboard.writeHere")}
                  htmlFor="why_you"
                  id="why_you"
                  value={formData.why_you}
                  formData={formData}
                  setFormData={setFormData}
                />
                <TextField
                  label={t("applyForJob.questionsForCompany")}
                  placeholder={t("dashboard.writeHere")}
                  htmlFor="questions_for_company"
                  id="questions_for_company"
                  value={formData.questions_for_company}
                  formData={formData}
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
