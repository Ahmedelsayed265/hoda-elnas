import React, { useEffect, useState } from "react";
import PdfViewer from "../../../ui/PdfViewer";
import { useParams } from "react-router-dom";
import axios from "./../../../../util/axios";

const CertificateViewer = () => {
  const { reportId } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const res = await axios.get(
          `/members/List_certificates/?report_id=${reportId}`
        );
        if (res.status === 200) {
          setPdfUrl(
            "https://backend.hodaelnas.online" +
              res?.data?.message[0]?.report_file
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPdf();
  }, [reportId]);

  return (
    <section className="course_reports">
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
  );
};

export default CertificateViewer;
