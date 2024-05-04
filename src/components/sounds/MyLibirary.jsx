import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import noResults from "../../assets/images/nodata.svg";
import axios from "./../../util/axios";
import DataLoader from "./../ui/DataLoader";

const MyLibirary = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState([]);
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;
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
          setLibrary(libraryResponse?.data?.message);
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
          {library.length === 0 ? (
            <div className="col-12 p-2">
              <div className="noDataFound">
                <img src={noResults} alt="no results" />
                <h5>{t("sounds.noLibirary")}</h5>
                <p>{t("sounds.noLibrarySub")}</p>
                <Link to="/audios">{t("sounds.listenNow")}</Link>
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

export default MyLibirary;
