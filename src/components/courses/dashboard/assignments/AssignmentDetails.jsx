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

const AssignmentDetails = () => {
  const { assignmentId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [assignment, setAssignment] = useState({});
  const [formData, setFormData] = useState({
    student_answer: "",
    st_file: [],
    st_voice: null,
    recording: false,
    mediaRecorder: null,
    audioChunks: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/instructor/list_assignment/?assignment_id=${assignmentId}`
        );
        if (response.status === 200) {
          setAssignment(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [assignmentId]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevFormData) => ({
      ...prevFormData,
      st_file: [...prevFormData.st_file, ...files]
    }));
  };

  const handleDeleteFile = (e, index) => {
    e.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      st_file: prevFormData.st_file.filter((_, i) => i !== index)
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
      formData.student_answer === "" &&
      formData.st_file.length === 0 &&
      formData.st_voice === null
    ) {
      toast.error(t("dashboard.pleaseEnterAnswer"));
      setLoading(false);
      return;
    }
    try {
      const dataToSend = new FormData();
      dataToSend.append("editor", "student");
      dataToSend.append("student_answer", formData.student_answer);
      formData.st_file.forEach((file, index) => {
        dataToSend.append(`st_file[${index}]`, file);
      });
      if (formData.st_voice) {
        dataToSend.append("st_voice", formData.st_voice, "voice.mp3");
      }
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
        navigate(`/dashboard/${assignment?.subscription_id}/assignments`);
        toast.success(t("dashboard.answerSentSuccessfully"));
      } else {
        toast.error(t("dashboard.somethingWentWrong"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <div className="col-12 p-2">
            <h5 className="dashboard_heading">{t("dashboard.taskAnswer")}</h5>
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
                      multiple
                      onChange={handleFileChange}
                    />
                    <img src={imagePlus} alt="upload" />
                  </label>
                </div>
                {formData.st_file.map((file, index) => (
                  <div className="uploaded_file" key={index}>
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`file-${index}`}
                      />
                    ) : (
                      <div className="doc_icon">
                        <img src={doc} alt={`doc-${index}`} />
                        <span>{file.name}</span>
                      </div>
                    )}
                    <button onClick={(e) => handleDeleteFile(e, index)}>
                      <i className="fa-light fa-xmark"></i>
                    </button>
                  </div>
                ))}
              </div>
              <h5 className="dashboard_sub_heading">
                {t("dashboard.addVoice")}
              </h5>
              <div className="voice_field">
                {formData.recording ? (
                  <button onClick={(e) => stopRecording(e)} className="mic_btn">
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
                        src={URL.createObjectURL(formData.st_voice)}
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
        </div>
      </div>
    </section>
  );
};

export default AssignmentDetails;
