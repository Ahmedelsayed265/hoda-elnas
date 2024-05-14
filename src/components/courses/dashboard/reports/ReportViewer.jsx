import React, { useEffect, useState } from "react";
import PdfViewer from "../../../ui/PdfViewer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./../../../../util/axios";
import { useTranslation } from "react-i18next";
import DataLoader from "./../../../ui/DataLoader";
import { BASE_URL } from "../../../../constants";

const ReportViewer = () => {
  const { reportId, subscriptionId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");
  const [recordSrc, setRecordSrc] = useState("");
  const [view, setView] = useState("report");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/members/List_sessions/?session_id=${reportId}`
        );
        if (res.status === 200) {
          setReport(res?.data?.message[0]);
          setPdfUrl(res?.data?.message[0]?.report_file);
          setRecordSrc(res?.data?.message[0]?.recording);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPdf();
  }, [reportId]);

  const goBack = () => {
    navigate(`/dashboard/${subscriptionId}/reports/`);
  };

  return (
    <>
      {loading ? (
        <DataLoader />
      ) : (
        <section className="course_reports pt-3">
          <div className="page_title mb-2 justify-content-between flex-lg-row flex-column align-items-start">
            <div className="d-flex align-items-center gap-2">
              <button className="back" onClick={goBack}>
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
              <h5>
                {t("StudentReport")} {report?.name} {t("inDate")} {report?.date}
              </h5>
            </div>
            <div className="buttons d-flex gap-2">
              <button onClick={() => setView("report")}>
                {t("dashboard.lessonReport")}
              </button>
              <button onClick={() => setView("record")}>
                {t("dashboard.lessonRecord")}
              </button>
            </div>
          </div>
          <div className="container p-0">
            <div className="row m-0">
              {view === "report" ? (
                <>
                  {pdfUrl ? (
                    <div className="col-12 p-2 pt-3">
                      <PdfViewer pdfUrl={`${BASE_URL}${pdfUrl}`} />
                    </div>
                  ) : (
                    <div className="noStudents">
                      <h5>{t("dashboard.reportNotAvailable")}</h5>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {recordSrc ? (
                    <div className="col-12 p-2 pt-3">
                      <video
                        src={`${BASE_URL}${recordSrc}`}
                        controls
                        className="w-100 h-100"
                      ></video>
                    </div>
                  ) : (
                    <div className="noStudents">
                      <h5>{t("dashboard.recordNotAvailable")}</h5>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReportViewer;
