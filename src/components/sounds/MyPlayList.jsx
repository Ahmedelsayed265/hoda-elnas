import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "./../../util/axios";
import { useTranslation } from "react-i18next";
import noResults from "../../assets/images/no-results.svg";
import DataLoader from "../ui/DataLoader";
import AudioCard from "../layout/AudioCard";
import { toast } from "react-toastify";

const MyPlayList = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const [loading, setLoading] = useState(true);
  const [playList, setPlayList] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/members/List_useraudiolist_files/${id}/`
        );
        if (response.status === 200 || response.status === 201) {
          setPlayList(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, lang]);

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
        const files = [...playList?.files];
        setPlayList((prev) => ({
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

  const removeFromPlayList = async (fileId) => {
    try {
      const res = await axios.delete(
        `/members/Delete_file_audio_list/${id}/?file_id=${fileId}`
      );
      if (res.status === 200) {
        toast.success(t("sounds.removedFromPlayList"));
        setPlayList((prev) => ({
          ...prev,
          files: prev?.files?.filter((file) => file?.id !== fileId)
        }));
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row m-0">
      <div className="col-12 p-2 mb-2">
        <div className="swiper_pagination_title">
          <div className="d-flex align-items-center gap-3">
            <button className="back" onClick={() => window.history.back()}>
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
            <h5 className="mb-0">
              {t("sounds.list")}: "{playList?.name}"
            </h5>
          </div>
        </div>
      </div>
      {loading ? (
        <DataLoader minHeight="300px" />
      ) : (
        <>
          {playList?.files?.length < 1 ? (
            <div className="col-12 p-2">
              <div className="noDataFound">
                <img src={noResults} alt="no results" />
                <h5 className="mb-2">{t("sounds.emptyPlayList")}</h5>
                <Link to="/audios">{t("sounds.listenNow")}</Link>
              </div>
            </div>
          ) : (
            <>
              {playList?.files?.map((file) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={file?.id}>
                  <AudioCard
                    audio={file}
                    hasRemoveBtn={true}
                    onReact={handleReacting}
                    onRemove={removeFromPlayList}
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

export default MyPlayList;
