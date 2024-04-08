import React, { useEffect, useState } from "react";
import axios from "./../../../../util/axios";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import timer from "../../../../assets/images/inReview.svg";
import edit from "../../../../assets/images/edit.svg";
import noAppointments from "../../../../assets/images/noAppointments.png";
import DataLoader from "../../../ui/DataLoader";
import EditAppointmentModal from "./EditAppointmentModal";

const Appointments = () => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state) => state?.language?.lang);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forWhom, setForWhom] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [rowData, setRowData] = useState({});

  useEffect(() => {
    setForWhom(t("dashboard.allStudents"));
  }, [lang, t]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url;
        if (forWhom === t("dashboard.allStudents")) {
          url = `/members/List_appoinments/?sub_id=${subscriptionId}`;
        } else {
          const studentId = subscriptionStudents.find(
            (s) => s.name === forWhom
          ).studentclass_id;
          url = `/members/List_appoinments/?student_id=${studentId}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setAppointments(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId, forWhom, lang]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/list_Student/?subscription_id=${subscriptionId}`
        );
        if (response.status === 200) {
          setSubscriptionStudents(response?.data?.message);
          if (response?.data?.message === 0) {
            toast.error(t("dashboard.noStudentsSubTitle"));
            navigate(`/dashboard/${subscriptionId}/course-students`);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionId]);

  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":");
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? "PM" : "AM";
    const hours12 = ((hoursInt + 11) % 12) + 1;
    const formattedHours = hours12.toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${suffix}`;
  }

  function translateToArabic(timeString) {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const amPmTranslation = {
      AM: "ص",
      PM: "م"
    };
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    const translateDigits = (digits) =>
      digits
        .split("")
        .map((digit) => arabicNumbers[parseInt(digit)])
        .join("");
    const translatedHours = translateDigits(hours);
    const translatedMinutes = translateDigits(minutes);
    const translatedSuffix = amPmTranslation[period];
    return `${translatedHours}:${translatedMinutes} ${translatedSuffix}`;
  }
  const handleEdit = (id) => {
    setShowEditModal(true);
    setRowData(appointments.find((a) => a.id === id));
  };

  return (
    <section className="course_appointments">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="header">
              <div className="title">
                <h5>{t("dashboard.appointments")}</h5>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {forWhom}
                </Dropdown.Toggle>
                <Dropdown.Menu dir={lang === "ar" ? "rtl" : "ltr"}>
                  <Dropdown.Item
                    onClick={() => setForWhom(t("dashboard.allStudents"))}
                  >
                    {t("dashboard.allStudents")}
                  </Dropdown.Item>
                  {subscriptionStudents?.map((student) => (
                    <Dropdown.Item
                      key={student?.id}
                      onClick={() => setForWhom(student?.name)}
                    >
                      {student?.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {loading ? (
            <DataLoader />
          ) : (
            <>
              {appointments?.length === 0 ? (
                <div className="col-12 p-2">
                  <div className="noAppointments">
                    <img src={noAppointments} alt="noAppointments" />
                    <p>{t("dashboard.noAppointments")}</p>
                    <button>{t("dashboard.addAppointment")}</button>
                  </div>
                </div>
              ) : (
                <div className="col-12 p-2 pt-4">
                  <h5 className="forWhom">
                    <img src={timer} alt="timer" />
                    {forWhom === t("dashboard.allStudents")
                      ? t("dashboard.allStudentsAppointments")
                      : t("dashboard.studentAppointment") + " " + forWhom}
                  </h5>
                  <div className="time_table">
                    <table>
                      <thead>
                        <tr>
                          <th>{t("dashboard.day")}</th>
                          <th>{t("dashboard.fromHour")}</th>
                          <th>{t("dashboard.toHour")}</th>
                          <th>{t("dashboard.editAppointment")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments?.map((appointment) => (
                          <tr key={appointment?.id}>
                            <td>{appointment?.day}</td>
                            <td>
                              {lang === "ar"
                                ? translateToArabic(
                                    convertTo12HourFormat(
                                      appointment?.starttime
                                    )
                                  )
                                : convertTo12HourFormat(appointment?.starttime)}
                            </td>
                            <td>
                              {lang === "ar"
                                ? translateToArabic(
                                    convertTo12HourFormat(appointment?.endtime)
                                  )
                                : convertTo12HourFormat(appointment?.endtime)}
                            </td>
                            <td>
                              <button
                                onClick={() => handleEdit(appointment?.id)}
                              >
                                <img src={edit} alt="" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <EditAppointmentModal
        rowData={rowData}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />
    </section>
  );
};

export default Appointments;
