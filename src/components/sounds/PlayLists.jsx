import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import list from "../../assets/images/list.svg";
import axios from "./../../util/axios";
import { useSelector } from "react-redux";
import DataLoader from "../ui/DataLoader";
import { Link } from "react-router-dom";

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
        <DataLoader minHeight="300px" />
      ) : (
        <>
          {playLists?.map((list) => (
            <div className="col-lg-4 col-6 p-lg-2 p-1" key={list?.id}>
              <Link
                to={`/audios/playlists/${list?.slug}`}
                className="listCard"
                style={{ background: `${list?.color}` }}
              >
                <h5>{list?.name}</h5>
                <div className="img">
                  <img src={list?.icon} alt={list?.name} />
                </div>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PlayLists;
