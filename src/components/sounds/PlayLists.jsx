import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import list from "../../assets/images/list.svg";
import axios from "./../../util/axios";
import { useSelector } from "react-redux";
import DataLoader from "../ui/DataLoader";

const PlayLists = () => {
  const [playLists, setPlayLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/learningcenter/list_sound_lists/");
        if (response.status === 200 || response.status === 201) {
          setPlayLists(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [lang]);

  return (
    <div className="row m-0">
      <div className="col-12 p-2 mb-2">
        <div className="swiper_pagination_title">
          <h5>
            <img src={list} alt="list" /> {t("sounds.playLists")}
          </h5>
        </div>
      </div>
      {loading ? (
        <DataLoader />
      ) : (
        <>
          {playLists?.map((list) => (
            <div className="col-lg-3 col-md-4 col-6 p-2"></div>
          ))}
        </>
      )}
    </div>
  );
};

export default PlayLists;
