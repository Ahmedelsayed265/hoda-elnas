import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import noResults from "../../assets/images/nodata.svg";
import axios from "./../../util/axios";
import DataLoader from "./../ui/DataLoader";
import AudioCard from "../layout/AudioCard";
import list from "../../assets/images/lib.svg";

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
        const libraryResponse = await axios.get(
          `/members/List_useraudiolist_files_fav/`
        );
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

  const handleReacting = async (id, react) => {
    try {
      const res = await axios.post(
        "/learningcenter/Add_like_or_dislike/audio/",
        {
          item_id: id,
          react: react
        }
      );
      if (res.status === 200) {
        const files = [...library?.files];
        setLibrary((prev) => ({
          ...prev,
          files: files.map((file) => {
            if (file?.id === id) {
              return {
                ...file,
                likes: res?.data?.object?.likes,
                dislikes: res?.data?.object?.dislikes,
                user_reaction: res?.data?.object?.user_reaction
              };
            }
            return file;
          })
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <>
              <div className="col-12 p-2 mb-2">
                <div className="swiper_pagination_title">
                  <h5>
                    <img src={list} alt="list" /> {t("sounds.library")}
                  </h5>
                </div>
              </div>
              {library?.files?.map((file) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={file?.id}>
                  <AudioCard
                    audio={file}
                    onReact={handleReacting}
                    hasRemoveBtn={true}
                  />
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyLibirary;
