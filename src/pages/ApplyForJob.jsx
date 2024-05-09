import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../components/ui/form-elements/InputField";
import TextField from "../components/ui/form-elements/TextField";
import SubmitButton from "./../components/ui/form-elements/SubmitButton";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SelectField from "../components/ui/form-elements/SelectField";
import axios from "./../util/axios";
import { toast } from "react-toastify";

const ApplyForJob = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const userId = useSelector((state) => state.authedUser?.user?.id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [stepName, setStepName] = useState("education");

  const wizardTabs = [
    { step: "education", label: t("applyForJob.education") },
    { step: "experience", label: t("applyForJob.experience") },
    { step: "personal", label: t("applyForJob.personal") },
    { step: "work_details", label: t("applyForJob.workDetails") },
    { step: "closer_shot", label: t("applyForJob.closerShot") }
  ];
  const generateWizardTab = (step, label, index) => (
    <div
      onClick={() => setStepName(step)}
      className={`wizard_tab ${stepName === step ? "active" : ""}`}
      key={index}
    >
      <div className="num">
        <span>{index + 1}</span>
      </div>
      <div className="content">
        <h6>{label}</h6>
      </div>
    </div>
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/hr/Create_employee/${id}/`, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success(t("applyForJob.applicationSentSuccessfully"));
        navigate("/jobs");
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="apply-for-job">
      <div className="container">
        <div className="row m-0 justify-content-center">
          <div className="col-12 p-2">
            <h3>{t("joinOurTeam")}</h3>
          </div>
          <div className="col-12 p-2">
            <form className="form-ui" onSubmit={handleSubmit}>
              <div className="mb-4 pb-3 wizard_tabs">
                {wizardTabs.map((tab, index) =>
                  generateWizardTab(tab.step, tab.label, index)
                )}
              </div>
              {stepName === "education" && (
                <>
                  <div className="form_group">
                    <SelectField
                      label={t("applyForJob.educationLevel")}
                      id="education_level"
                      value={formData.education_level}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education_level: e.target.value
                        })
                      }
                      options={[
                        {
                          name: t("applyForJob.highSchool"),
                          value: "High School"
                        },
                        {
                          name: t("applyForJob.associateDegree"),
                          value: "Associate Degree"
                        },
                        {
                          name: t("applyForJob.bachelorDegree"),
                          value: "Bachelor"
                        },
                        { name: t("applyForJob.phd"), value: "PhD" }
                      ]}
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
                    <TextField
                      label={t("applyForJob.degreesOrCertifications")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="availability_restrictions"
                      id="degrees_or_certifications"
                      value={formData.degrees_or_certifications}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="buttons justify-content-end">
                    <button className="next">{t("applyForJob.next")}</button>
                  </div>
                </>
              )}
              {stepName === "experience" && (
                <>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.workHistory")}
                      placeholder={t("dashboard.writeHere")}
                      id="work_history"
                      htmlFor="work_history"
                      value={formData.work_history}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.relevantExperience")}
                      placeholder={t("dashboard.writeHere")}
                      id="relevant_experience"
                      htmlFor="relevant_experience"
                      value={formData.relevant_experience}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.significantAccomplishment")}
                      placeholder={t("dashboard.writeHere")}
                      id="significant_accomplishment"
                      htmlFor="significant_accomplishment"
                      value={formData.significant_accomplishment}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
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
                    <TextField
                      label={t("applyForJob.softwareExperience")}
                      placeholder={t("dashboard.writeHere")}
                      id="software_experience"
                      htmlFor="software_experience"
                      value={formData.software_experience}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="buttons">
                    <button className="back">
                      {t("applyForJob.previous")}
                    </button>
                    <button className="next">{t("applyForJob.next")}</button>
                  </div>
                </>
              )}
              {stepName === "personal" && (
                <>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.challengesOvercome")}
                      placeholder={t("dashboard.writeHere")}
                      id="challenges_overcome"
                      htmlFor="challenges_overcome"
                      value={formData.challenges_overcome}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.conflictResolution")}
                      placeholder={t("dashboard.writeHere")}
                      id="conflict_resolution"
                      htmlFor="conflict_resolution"
                      value={formData.conflict_resolution}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.workingUnderPressure")}
                      placeholder={t("dashboard.writeHere")}
                      id="working_under_pressure"
                      htmlFor="working_under_pressure"
                      value={formData.working_under_pressure}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="buttons">
                    <button className="back">
                      {t("applyForJob.previous")}
                    </button>
                    <button className="next">{t("applyForJob.next")}</button>
                  </div>
                </>
              )}
              {stepName === "work_details" && (
                <>
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
                      label={t("applyForJob.additionalInfo")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="additional_info"
                      id="additional_info"
                      value={formData.additional_info}
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
                  </div>
                  <div className="buttons">
                    <button className="back">
                      {t("applyForJob.previous")}
                    </button>
                    <button className="next">{t("applyForJob.next")}</button>
                  </div>
                </>
              )}
              {stepName === "closer_shot" && (
                <>
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
                  </div>
                  <div className="form_group">
                    <div className="input-field">
                      <label htmlFor="cv">{t("applyForJob.cv")}</label>
                      <label htmlFor="cv" className="cv_area">
                        <input
                          type="file"
                          name="cv"
                          id="cv"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              cv: e.target.files[0]
                            });
                          }}
                        />
                        <div className="content">
                          <i className="fa-regular fa-paperclip"></i>
                          <p>{t("applyForJob.uploadCv")}</p>
                        </div>
                        {formData.cv && <span>{formData.cv?.name}</span>}
                      </label>
                    </div>
                  </div>
                  <div className="buttons">
                    <button className="back">
                      {t("applyForJob.previous")}
                    </button>
                    <SubmitButton
                      name={t("jobsPage.submit")}
                      loading={loading}
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyForJob;
