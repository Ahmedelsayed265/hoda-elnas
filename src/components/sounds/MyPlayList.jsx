import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "./../../util/axios";
import { useTranslation } from "react-i18next";

const MyPlayList = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const [playList, setPlayList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/members/List_audio_lists/?list_files=true&list_id=${id}`
        );
        if (response.status === 200 || response.status === 201) {
          setPlayList(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, lang]);
  return (
    <div className="row m-0">
      <div className="col-12 p-2 mb-2">
        <div className="swiper_pagination_title">
          <div className="d-flex align-items-center gap-3">
            <button className="back" onClick={() => window.history.back()}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
            <h5 className="mb-0">
              {t("sounds.list")}: "{playList?.listname}"
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPlayList;
