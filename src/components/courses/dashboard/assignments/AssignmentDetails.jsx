import React, { useEffect, useState } from "react";
import axios from "./../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../constants";
import { useTranslation } from "react-i18next";
import imagePlus from "../../../../assets/images/upload.svg";
import man from "../../../../assets/images/man.svg";
import mic from "../../../../assets/images/mic.svg";
import pause from "../../../../assets/images/pause.svg";
import doc from "../../../../assets/images/doc.svg";
import TextField from "../../../ui/form-elements/TextField";
import SubmitButton from "./../../../ui/form-elements/SubmitButton";
import DataLoader from "./../../../ui/DataLoader";

const AssignmentDetails = () => {
  const { subscriptionId } = useParams();
  const { assignmentId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState({});
  const [assignmentLoading, setAssignmentLoading] = useState(false);
  const [formData, setFormData] = useState({
    student_answer: "",
    st_file: "",
    st_voice: null,
    recording: false,
    mediaRecorder: null,
    audioChunks: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAssignmentLoading(true);
        const response = await axios.get(
          `/instructor/list_assignment/?assignment_id=${assignmentId}`
        );
        if (response.status === 200) {
          setAssignment(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setAssignmentLoading(false);
      }
    };
    fetchData();
  }, [assignmentId]);

  useEffect(() => {
    if (assignment?.status === "submitted") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        student_answer: assignment?.student_answer,
        st_file: assignment?.st_file,
        st_voice: assignment?.st_voice
      }));
    }
  }, [
    assignment?.st_file,
    assignment?.st_voice,
    assignment?.status,
    assignment?.student_answer
  ]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      st_file: file
    }));
  };

  const handleDeleteFile = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      st_file: null
    }));
  };

  const handleDeleteVoice = (e) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      st_voice: null
    }));
  };

  const startRecording = async (e) => {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
        setFormData((prevFormData) => ({
          ...prevFormData,
          st_voice: audioBlob,
          recording: false,
          mediaRecorder: null,
          audioChunks: []
        }));
      });
      mediaRecorder.start();
      setFormData((prevFormData) => ({
        ...prevFormData,
        recording: true,
        mediaRecorder,
        audioChunks
      }));
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = (e) => {
    e.preventDefault();
    const { mediaRecorder } = formData;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      formData?.student_answer === "" &&
      formData?.st_file.length === 0 &&
      formData?.st_voice === null
    ) {
      toast.error(t("dashboard.pleaseEnterAnswer"));
      setLoading(false);
      return;
    }
    console.log(formData);
    try {
      const dataToSend = {
        editor: "student",
        file: formData?.st_file,
        voice: formData?.st_voice,
        student_answer: formData?.student_answer
      };
      const headers = {
        Accept: "application/json",
        "content-type": "multipart/form-data"
      };
      const reqOptions = {
        method: "PUT",
        headers: headers,
        data: dataToSend
      };
      const response = await axios.request(
        `/members/put_Assignment/${assignmentId}/`,
        reqOptions
      );
      if (response.status === 200) {
        navigate(`/dashboard/${subscriptionId}/assignments`);
        toast.success(t("dashboard.answerSentSuccessfully"));
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
    <>
      {assignmentLoading ? (
        <DataLoader />
      ) : (
        <section className="assignments">
          <div className="container p-0">
            <div className="row m-0">
              <div className="col-12 p-2">
                <div className="header">
                  <div className="title">
                    <h5>{assignment?.title}</h5>
                    <div className="name_img">
                      <div className="img">
                        <img
                          src={
                            assignment?.instructor?.instructor_img
                              ? `${BASE_URL}${assignment?.instructor?.instructor_img}`
                              : man
                          }
                          alt="instructor"
                        />
                      </div>
                      <h6>{assignment?.instructor?.name}</h6>
                    </div>
                    <div className="date">
                      <i className="fa-duotone fa-calendar-days"></i>{" "}
                      {assignment?.created_date}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 p-2">
                <p className="description">{assignment?.description}</p>
              </div>
              {assignment?.status !== "expired" &&
                assignment?.status !== "reviewed" && (
                  <>
                    <div className="col-12 p-2">
                      <h5 className="dashboard_heading">
                        {t("dashboard.taskAnswer")}
                      </h5>
                    </div>
                    <div className="col-12 p-2">
                      <form className="form-ui" onSubmit={handleSubmit}>
                        <TextField
                          placeholder={t("dashboard.writeHere")}
                          id={"answer"}
                          value={formData.student_answer}
                          htmlFor={"student_answer"}
                          formData={formData}
                          setFormData={setFormData}
                        />
                        <h5 className="dashboard_sub_heading">
                          {t("dashboard.attachImages")}
                        </h5>
                        <div className="images_grid">
                          <div className="file_upload">
                            <label htmlFor="file_upload">
                              <input
                                type="file"
                                id="file_upload"
                                onChange={handleFileChange}
                                accept="image/*, .pdf, .doc, .docx"
                              />
                              <img src={imagePlus} alt="upload" />
                            </label>
                          </div>
                          {formData.st_file && (
                            <div className="uploaded_file">
                              {formData?.st_file.type?.startsWith("image/") ? (
                                <img
                                  src={URL.createObjectURL(formData.st_file)}
                                  alt="file"
                                />
                              ) : (
                                <div className="doc_icon">
                                  <img src={doc} alt="file" />
                                  <span>{formData.st_file.name}</span>
                                </div>
                              )}
                              <button onClick={(e) => handleDeleteFile(e)}>
                                <i className="fa-light fa-xmark"></i>
                              </button>
                            </div>
                          )}
                        </div>
                        <h5 className="dashboard_sub_heading">
                          {t("dashboard.addVoice")}
                        </h5>
                        <div className="voice_field">
                          {formData.recording ? (
                            <button
                              onClick={(e) => stopRecording(e)}
                              className="mic_btn"
                            >
                              <img src={pause} alt="pause" />
                            </button>
                          ) : (
                            <button
                              onClick={(e) => startRecording(e)}
                              className="mic_btn"
                            >
                              <img src={mic} alt="mic" />
                            </button>
                          )}
                          {formData.st_voice && (
                            <div className="uploaded_voice">
                              <audio controls>
                                <source
                                  src={
                                    typeof formData?.st_voice === "string"
                                      ? `${BASE_URL}${formData?.st_voice}`
                                      : URL.createObjectURL(formData?.st_voice)
                                  }
                                  type="audio/mp3"
                                />
                              </audio>
                              <button onClick={(e) => handleDeleteVoice(e)}>
                                <i className="fa-regular fa-trash"></i>
                              </button>
                            </div>
                          )}
                        </div>
                        <SubmitButton
                          loading={loading}
                          name={t("dashboard.sendHomeWork")}
                          className={"submit_btn"}
                        />
                      </form>
                    </div>
                  </>
                )}
              {assignment?.status === "reviewed" && (
                <div className="col-12 p-2">
                  <h5 className="studnet_answer">
                    {t("dashboard.studentAnswer")}
                  </h5>
                  {assignment?.student_answer && (
                    <div className="answer_field">
                      <p>{assignment?.student_answer}</p>
                    </div>
                  )}
                  {assignment?.st_voice && (
                    <div className="voice_answer">
                      <audio controls>
                        <source
                          src={`${BASE_URL}${assignment?.st_voice}`}
                          type="audio/mp3"
                        />
                      </audio>
                    </div>
                  )}
                  <h5 className="studnet_answer">
                    {t("dashboard.instructorRate")}:{" "}
                    <span>{assignment?.grade}</span>
                  </h5>
                  {assignment?.notes && (
                    <div className="answer_field">
                      <p>{assignment?.notes}</p>
                    </div>
                  )}
                  {assignment?.inst_voice && (
                    <div className="voice_answer">
                      <audio controls>
                        <source
                          src={`${BASE_URL}${assignment?.inst_voice}`}
                          type="audio/mp3"
                        />
                      </audio>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AssignmentDetails;
