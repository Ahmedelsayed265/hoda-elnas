import React, { useEffect, useState } from "react";
import PdfViewer from "../../../ui/PdfViewer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "./../../../../util/axios";
import { useTranslation } from "react-i18next";
import DataLoader from "./../../../ui/DataLoader";

const ReportViewer = () => {
  const { reportId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subscriptionId } = useParams();
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/members/List_reports/?report_id=${reportId}`
        );
        if (res.status === 200) {
          setReport(res?.data?.message[0]);
          setPdfUrl(
            "https://backend.hodaelnas.online" +
              res?.data?.message[0]?.report_file
          );
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
          <div className="page_title mb-2">
            <button className="back" onClick={goBack}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
            <h5>
              {t("StudentReport")} {report?.name} {t("inDate")} {report?.date}
            </h5>
          </div>
          <div className="container p-0">
            <div className="row m-0">
              <div className="col-12 p-2 pt-3">
                <div>
                  <PdfViewer pdfUrl={pdfUrl} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReportViewer;
