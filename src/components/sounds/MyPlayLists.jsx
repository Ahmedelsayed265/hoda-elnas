import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import noResults from "../../assets/images/no-results.svg";
import { useTranslation } from "react-i18next";
import axios from "./../../util/axios";
import DataLoader from "../ui/DataLoader";

const MyPlayLists = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;
  const [playLists, setPlayLists] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        const libraryResponse = await axios.get(`/members/List_audio_lists/`);
        if (libraryResponse.status === 200) {
          setPlayLists(libraryResponse?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div className="row m-0">
      {loading ? (
        <DataLoader minHeight="300px" />
      ) : (
        <>
          {playLists.length === 0 ? (
            <div className="col-12 p-2">
              <div className="noDataFound">
                <img src={noResults} alt="no results" />
                <h5>{t("sounds.noPlayLists")}</h5>
                <p>{t("sounds.noPlayListsSub")}</p>
                <button>{t("sounds.createPlayList")}</button>
              </div>
            </div>
          ) : (
            <p>00</p>
          )}
        </>
      )}
    </div>
  );
};

export default MyPlayLists;
