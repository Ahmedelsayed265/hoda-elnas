import React, { useEffect, useState } from "react";
import axios from "./../../util/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DataLoader from "./../ui/DataLoader";
import PdfViewer from "./../ui/PdfViewer";
import { BASE_URL } from "../../constants";

const VisualContent = () => {
  const { slug } = useParams();
  const { lang } = useSelector((state) => state.language);
  const hasAccess = useSelector((state) => state.authedUser.access_token);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(true);
  const [fileSrc, setFileSrc] = useState("");

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/learningcenter/list_resource_files/?slug=${slug}`
        );
        if (response.status === 200 || response.status === 201) {
          setFile(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [slug, lang, hasAccess]);

  const decodeFileUrl = (file) => {
    const decodedUrlBase64 = decodeURIComponent(file);
    const decodedUrl = atob(decodedUrlBase64);
    setFileSrc(`${BASE_URL}${decodedUrl}`);
  };

  useEffect(() => {
    if (file && file?.file) {
      decodeFileUrl(file?.file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  return (
    <>
      {loading ? (
        <DataLoader />
      ) : (
        <div className="row m-0">
          <div className="col-12 p-2 mb-2">
            <div className="swiper_pagination_title">
              <div className="d-flex align-items-center gap-3">
                <button className="back" onClick={() => window.history.back()}>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
                <h5 className="mb-0">{file?.name}</h5>
              </div>
            </div>
          </div>
          {file?.type === "PDF" ? (
            <div className="col-12 p-2">
              {fileSrc && <PdfViewer pdfUrl={fileSrc} />}
            </div>
          ) : (
            <div className="col-12 p-2">
              <video src={fileSrc} controls className="w-100"></video>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VisualContent;
