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
import { useTimeFormatting } from "./../../../../hooks/useTimeFormatting";

const Appointments = () => {
  const { t } = useTranslation();
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const lang = useSelector((state) => state?.language?.lang);
  const { convertTo12HourFormat, translateToArabic } = useTimeFormatting();
  const [forWhom, setForWhom] = useState("");
  const [rowData, setRowData] = useState({});
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [subscriptionStudents, setSubscriptionStudents] = useState([]);

  useEffect(() => {
    setForWhom(t("dashboard.allStudents"));
  }, [lang, t]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/list_Student/?subscription_id=${subscriptionId}`
        );
        if (response.status === 200) {
          setSubscriptionStudents(response?.data?.message);
          if (response?.data?.message?.length === 0) {
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url;
        if (forWhom === t("dashboard.allStudents")) {
          url = `/members/List_appointments/?sub_id=${subscriptionId}`;
        } else {
          const studentId = subscriptionStudents.find(
            (s) => s.name === forWhom
          ).studentclass_id;
          url = `/members/List_appointments/?student_id=${studentId}`;
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
  }, [subscriptionId, forWhom, lang, subscriptionStudents]);

  const handleEdit = (id) => {
    setShowEditModal(true);
    setRowData(appointments.find((a) => a.id === id));
  };

  const handleCancelSession = async (id) => {
    const res = await axios.post(`/instructor/Cancel_session/${id}/`, {
      temp: false,
      day: rowData?.day,
      time: rowData?.starttime
    });
    if (res.status === 200) {
      toast.success(t("dashboard.cancelAppointmentSuccess"));
      setAppointments(
        appointments.map((a) => (a.id === id ? res?.data?.object : a))
      );
    } else {
      toast.error(t("auth.someThingWentWrong"));
    }
  };

  return (
    <section className="course_appointments">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12 p-2">
            <div className="header">
              <div className="title">
                <h5 className="forWhom">
                  <img src={timer} alt="timer" />
                  {forWhom === t("dashboard.allStudents")
                    ? t("dashboard.allStudentsAppointments")
                    : t("dashboard.studentAppointment") + " " + forWhom}
                </h5>
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
                <div className="col-12 p-2">
                  <div className="time_table">
                    <table>
                      <thead>
                        <tr>
                          <th>{t("dashboard.day")}</th>
                          <th>{t("dashboard.fromHour")}</th>
                          <th>{t("dashboard.toHour")}</th>
                          <th>{t("dashboard.student")}</th>
                          <th>{t("dashboard.instructor")}</th>
                          <th>{t("dashboard.editAppointment")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments?.map((appointment) => (
                          <>
                            {appointment?.temp === true ? (
                              <>
                                <tr
                                  key={appointment?.id}
                                  className="exeptional"
                                >
                                  <td>{appointment?.temp_day}</td>
                                  <td>
                                    {lang === "ar" &&
                                    appointment?.temp_start_time
                                      ? translateToArabic(
                                          convertTo12HourFormat(
                                            appointment?.temp_start_time
                                          )
                                        )
                                      : convertTo12HourFormat(
                                          appointment?.temp_start_time
                                        )}
                                  </td>
                                  <td>
                                    {lang === "ar" && appointment?.temp_end_time
                                      ? translateToArabic(
                                          convertTo12HourFormat(
                                            appointment?.temp_end_time
                                          )
                                        )
                                      : convertTo12HourFormat(
                                          appointment?.temp_end_time
                                        )}
                                  </td>
                                  <td>{appointment?.student_details?.name}</td>
                                  <td>
                                    {appointment?.instructor_details?.name}
                                  </td>
                                  <td>
                                    <button
                                      className="exiptionalCancel"
                                      onClick={() =>
                                        handleCancelSession(appointment?.id)
                                      }
                                    >
                                      {t("dashboard.cancelAppointment")}
                                    </button>
                                  </td>
                                </tr>
                                <tr className="exeptional_text">
                                  <td colSpan={6}>
                                    {t("dashboard.exptionalDay")}{" "}
                                    {appointment?.day} , {t("hour")}{" "}
                                    {lang === "ar" && appointment?.starttime
                                      ? translateToArabic(
                                          convertTo12HourFormat(
                                            appointment?.starttime
                                          )
                                        )
                                      : convertTo12HourFormat(
                                          appointment?.starttime
                                        )}
                                  </td>
                                </tr>
                              </>
                            ) : (
                              <tr key={appointment?.id}>
                                <td>{appointment?.day}</td>
                                <td>
                                  {lang === "ar"
                                    ? translateToArabic(
                                        convertTo12HourFormat(
                                          appointment?.starttime
                                        )
                                      )
                                    : convertTo12HourFormat(
                                        appointment?.starttime
                                      )}
                                </td>
                                <td>
                                  {lang === "ar"
                                    ? translateToArabic(
                                        convertTo12HourFormat(
                                          appointment?.endtime
                                        )
                                      )
                                    : convertTo12HourFormat(
                                        appointment?.endtime
                                      )}
                                </td>
                                <td>{appointment?.student_details?.name}</td>
                                <td>{appointment?.instructor_details?.name}</td>
                                <td>
                                  <button
                                    onClick={() => handleEdit(appointment?.id)}
                                  >
                                    <img src={edit} alt="" />
                                  </button>
                                </td>
                              </tr>
                            )}
                          </>
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
        setAppointments={setAppointments}
      />
    </section>
  );
};

export default Appointments;
