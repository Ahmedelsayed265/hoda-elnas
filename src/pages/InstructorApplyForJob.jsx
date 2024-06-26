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
import PhoneField from "../components/ui/form-elements/PhoneField";
import Gender from "../components/ui/form-elements/Gender";
import NameField from "../components/ui/form-elements/NameField";
import FileUploadField from "../components/ui/form-elements/FileUploadField";

const InstructorApplyForJob = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const userId = useSelector((state) => state.authedUser?.user?.id);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [stepName, setStepName] = useState("closer_shot");

  const wizardTabs = [
    { step: "closer_shot", label: t("applyForJob.closerShot") },
    { step: "education", label: t("applyForJob.education") },
    { step: "experience", label: t("applyForJob.experience") },
    {
      step: "teaching_methodologies",
      label: t("applyForJob.teachingMethodologies")
    },
    {
      step: "relations_with_students",
      label: t("applyForJob.relationsWithStudents")
    },
    { step: "personal", label: t("applyForJob.attachments") }
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
    job_id: +id,
    user_id: userId,
    name_ar: "",
    name_en: "",
    firstname: "",
    lastname: "",
    phone_number: "",
    whatsapp_number: "",
    gender: "male",
    email: "",
    licensed: false,
    available_hours: "",
    age: "",
    education_level: "Bachelor",
    major_or_area_of_study: "",
    academic_achievements: "",
    years_teaching: "",
    previous_institutions: "",
    grade_levels_taught: "",
    subjects_taught: "",
    languages_spoken: "",
    teaching_philosophy: "",
    student_engagement_approach: "",
    individualized_learning_approach: "",
    goal_setting_progress_monitoring: "",
    customized_learning_plans: "",
    feedback_reflection: "",
    communication_support: "",
    documentation_record_keeping: "",
    student_retention_strategies: "",
    handling_challenging_situations: "",
    cv: "",
    certification: "",
    personal_image: "",
    introduction_video: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const key in formData) {
        if (formData[key] === "") {
          setStepName("education");
          toast.error(t("applyForJob.incompleteDataError"));
          return;
        }
      }
      const headers = {
        Accept: "application/json",
        "content-type": "multipart/form-data"
      };
      const reqOptions = {
        method: "POST",
        headers: headers,
        data: formData
      };
      const response = await axios.request(
        `/hr/Create_instructor/`,
        reqOptions
      );
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
              {stepName === "closer_shot" && (
                <>
                  <div className="form_group">
                    {/* name */}
                    <NameField setFormData={setFormData} formData={formData} />
                    <InputField
                      label={t("applyForJob.age")}
                      placeholder={"00"}
                      type="number"
                      htmlFor="age"
                      id={"age"}
                      value={formData.age}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <InputField
                      label={t("auth.email")}
                      placeholder={t("auth.emailPlaceHolder")}
                      htmlFor="email"
                      value={formData.email}
                      formData={formData}
                      id={"email"}
                      setFormData={setFormData}
                    />
                    <Gender
                      setFormData={setFormData}
                      formData={formData}
                      dataKey="gender"
                    />
                  </div>
                  <div className="form_group">
                    <PhoneField
                      label={t("auth.phone")}
                      formData={formData}
                      setFormData={setFormData}
                      value={formData.phone_number}
                      id="phone_number"
                    />
                    <PhoneField
                      label={t("auth.whatsapp")}
                      formData={formData}
                      setFormData={setFormData}
                      value={formData.whatsapp_number}
                      id="whatsapp_number"
                    />
                  </div>
                  <div className="buttons justify-content-end">
                    <button
                      className="next"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("education");
                      }}
                    >
                      {t("applyForJob.next")}
                    </button>
                  </div>
                </>
              )}
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
                          name: t("applyForJob.bachelorDegree"),
                          value: "Bachelor"
                        },
                        {
                          name: t("applyForJob.masterDegree"),
                          value: "Master Degree"
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
                      label={t("applyForJob.academicAchievements")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="academic_achievements"
                      id="academic_achievements"
                      value={formData.academic_achievements}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.subjectsTaught")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="subjects_taught"
                      id="subjects_taught"
                      value={formData.subjects_taught}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.gradeLevelsTaught")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="grade_levels_taught"
                      id="grade_levels_taught"
                      value={formData.grade_levels_taught}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.languagesSpoken")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="languages_spoken"
                      id="languages_spoken"
                      value={formData.languages_spoken}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-row-reverse justify-content-end">
                    <label htmlFor="license">{t("applyForJob.licensed")}</label>
                    <input
                      type="checkbox"
                      id="license"
                      name="license"
                      checked={formData.licensed}
                      onChange={(e) =>
                        setFormData({ ...formData, licensed: e.target.checked })
                      }
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="back"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("closer_shot");
                      }}
                    >
                      {t("applyForJob.previous")}
                    </button>
                    <button
                      className="next"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("experience");
                      }}
                    >
                      {t("applyForJob.next")}
                    </button>
                  </div>
                </>
              )}
              {stepName === "experience" && (
                <>
                  <div className="form_group">
                    <InputField
                      label={t("applyForJob.yearsTeaching")}
                      placeholder="00"
                      type="number"
                      id="years_teaching"
                      htmlFor="years_teaching"
                      value={formData.years_teaching}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <InputField
                      label={t("applyForJob.availableHours")}
                      placeholder="00"
                      type="number"
                      id="available_hours"
                      htmlFor="available_hours"
                      value={formData.available_hours}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.previousInstitutions")}
                      placeholder={t("dashboard.writeHere")}
                      id="previous_institutions"
                      htmlFor="previous_institutions"
                      value={formData.previous_institutions}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.handlingChallengingSituations")}
                      placeholder={t("dashboard.writeHere")}
                      id="handling_challenging_situations"
                      htmlFor="handling_challenging_situations"
                      value={formData.handling_challenging_situations}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="back"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("education");
                      }}
                    >
                      {t("applyForJob.previous")}
                    </button>
                    <button
                      className="next"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("teaching_methodologies");
                      }}
                    >
                      {t("applyForJob.next")}
                    </button>
                  </div>
                </>
              )}
              {stepName === "teaching_methodologies" && (
                <>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.teachingPhilosophy")}
                      placeholder={t("dashboard.writeHere")}
                      id="teaching_philosophy"
                      htmlFor="teaching_philosophy"
                      value={formData.teaching_philosophy}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.studentEngagementApproach")}
                      placeholder={t("dashboard.writeHere")}
                      id="student_engagement_approach"
                      htmlFor="student_engagement_approach"
                      value={formData.student_engagement_approach}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.individualizedLearningApproach")}
                      placeholder={t("dashboard.writeHere")}
                      id="individualized_learning_approach"
                      htmlFor="individualized_learning_approach"
                      value={formData.individualized_learning_approach}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.goalSettingProgressMonitoring")}
                      placeholder={t("dashboard.writeHere")}
                      id="goal_setting_progress_monitoring"
                      htmlFor="goal_setting_progress_monitoring"
                      value={formData.goal_setting_progress_monitoring}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.customizedLearningPlans")}
                      placeholder={t("dashboard.writeHere")}
                      id="customized_learning_plans"
                      htmlFor="customized_learning_plans"
                      value={formData.customized_learning_plans}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="back"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("experience");
                      }}
                    >
                      {t("applyForJob.previous")}
                    </button>
                    <button
                      className="next"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("relations_with_students");
                      }}
                    >
                      {t("applyForJob.next")}
                    </button>
                  </div>
                </>
              )}
              {stepName === "relations_with_students" && (
                <>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.feedbackReflection")}
                      placeholder={t("dashboard.writeHere")}
                      id="feedback_reflection"
                      htmlFor="feedback_reflection"
                      value={formData.feedback_reflection}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.communicationSupport")}
                      placeholder={t("dashboard.writeHere")}
                      id="communication_support"
                      htmlFor="communication_support"
                      value={formData.communication_support}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <TextField
                      label={t("applyForJob.documentationRecordKeeping")}
                      placeholder={t("dashboard.writeHere")}
                      id="documentation_record_keeping"
                      htmlFor="documentation_record_keeping"
                      value={formData.documentation_record_keeping}
                      formData={formData}
                      setFormData={setFormData}
                    />
                    <TextField
                      label={t("applyForJob.studentRetentionStrategies")}
                      placeholder={t("dashboard.writeHere")}
                      id="student_retention_strategies"
                      htmlFor="student_retention_strategies"
                      value={formData.student_retention_strategies}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="back"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("teaching_methodologies");
                      }}
                    >
                      {t("applyForJob.previous")}
                    </button>
                    <button
                      className="next"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("personal");
                      }}
                    >
                      {t("applyForJob.next")}
                    </button>
                  </div>
                </>
              )}
              {stepName === "personal" && (
                <>
                  <div className="form_group">
                    <InputField
                      label={t("applyForJob.nameAr")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="name_ar"
                      value={formData.name_ar}
                      formData={formData}
                      id={"name_ar"}
                      setFormData={setFormData}
                    />
                    <InputField
                      label={t("applyForJob.nameEn")}
                      placeholder={t("dashboard.writeHere")}
                      htmlFor="name_en"
                      value={formData.name_en}
                      formData={formData}
                      id={"name_en"}
                      setFormData={setFormData}
                    />
                  </div>
                  <div className="form_group">
                    <FileUploadField
                      label={t("applyForJob.cv")}
                      htmlFor={"cv"}
                      formData={formData}
                      setFormData={setFormData}
                      Accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      uploadText={t("applyForJob.uploadCv")}
                    />
                    <FileUploadField
                      label={t("applyForJob.certification")}
                      htmlFor={"certification"}
                      formData={formData}
                      setFormData={setFormData}
                      Accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      uploadText={t("applyForJob.uploadCertification")}
                    />
                  </div>
                  <div className="form_group">
                    <FileUploadField
                      label={t("applyForJob.personalImage")}
                      htmlFor={"personal_image"}
                      formData={formData}
                      setFormData={setFormData}
                      Accept="image/*"
                      uploadText={t("applyForJob.uploadImage")}
                    />
                    <FileUploadField
                      label={t("applyForJob.introductionVideo")}
                      htmlFor={"introduction_video"}
                      formData={formData}
                      setFormData={setFormData}
                      Accept="video/mp4,video/x-m4v,video/*"
                      uploadText={t("applyForJob.uploadVideo")}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      className="back"
                      onClick={(e) => {
                        e.preventDefault();
                        setStepName("experience");
                      }}
                    >
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

export default InstructorApplyForJob;
