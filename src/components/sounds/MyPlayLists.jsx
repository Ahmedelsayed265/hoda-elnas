import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import noResults from "../../assets/images/no-results.svg";
import { useTranslation } from "react-i18next";
import axios from "./../../util/axios";
import DataLoader from "../ui/DataLoader";
import AddPlayListModal from "./AddPlayListModal";
import listIcon from "../../assets/images/myLists.svg";
import ListCard from "./ListCard";
import { toast } from "react-toastify";

const MyPlayLists = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cookies] = useCookies(["refreshToken"]);
  const isAuthenticated = cookies.refreshToken ? true : false;
  const [showModal, setShowModal] = useState(false);
  const [playLists, setPlayLists] = useState([]);
  const [playList, setPlayList] = useState({});
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

  const deleteList = async (id) => {
    try {
      const res = await axios.delete(`/members/Delete_audio_list/${id}/`);
      if (res.status === 200 || res.status === 201) {
        toast.success(t("sounds.playListDeleted"));
        setPlayLists(playLists.filter((list) => list.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editList = async (playList) => {
    setShowModal(true);
    setPlayList(playList);
  };

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
                <button onClick={() => setShowModal(true)}>
                  {t("sounds.createPlayList")}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="col-12 p-2 mb-3">
                <div className="swiper_pagination_title">
                  <h5>
                    <img src={listIcon} alt="list" /> {t("sounds.myLists")}
                  </h5>
                  <div className="create_list">
                    <button onClick={() => setShowModal(true)}>
                      <i className="fa-light fa-plus"></i>{" "}
                      {t("sounds.createPlayList")}
                    </button>
                  </div>
                </div>
              </div>
              {playLists?.map((list) => (
                <div className="col-lg-4 p-2" key={list?.id}>
                  <ListCard
                    list={list}
                    onDelete={deleteList}
                    onEdit={editList}
                  />
                </div>
              ))}
            </>
          )}
        </>
      )}
      <AddPlayListModal
        showModal={showModal}
        setShowModal={setShowModal}
        setPlayLists={setPlayLists}
        forEditPlayList={playList}
        setPlayList={setPlayList}
      />
    </div>
  );
};

export default MyPlayLists;
