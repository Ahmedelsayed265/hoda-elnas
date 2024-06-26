import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import noResults from "../../assets/images/nodata.svg";
import axios from "./../../util/axios";
import DataLoader from "./../ui/DataLoader";
import list from "../../assets/images/favourites.svg";
import VisualCard from "../layout/VisualCard";
import ConfirmDeleteModal from "./../ui/ConfirmDeleteModal";
import loginImage from "../../assets/images/login.webp";

const Favourites = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [library, setLibrary] = useState([]);
  const [cookies] = useCookies(["refreshToken"]);
  const [showModal, setShowModal] = useState(false);
  const [targetIdForRemove, setTargetIdForRemove] = useState(null);
  const isAuthenticated = cookies.refreshToken ? true : false;

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        setLoading(true);
        const libraryResponse = await axios.get(
          `/members/List_userresourcelist_files_fav/`
        );
        if (libraryResponse.status === 200) {
          setLibrary(libraryResponse?.data?.message?.files);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const removeFromLibrary = async () => {
    if (!targetIdForRemove) return;

    try {
      const res = await axios.delete(
        `/members/Delete_file_resources_list_fav/?resource_id=${targetIdForRemove}`
      );
      if (res.status === 200) {
        toast.success(t("sounds.removedFromLibrary"));
        setShowModal(false);
        setLibrary(library?.filter((file) => file?.id !== targetIdForRemove));
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        setLibrary((prev) => ({
          ...prev,
          files: prev.files.map((file) =>
            file?.id === id
              ? {
                  ...file,
                  likes: res?.data?.object?.likes,
                  dislikes: res?.data?.object?.dislikes,
                  user_reaction: res?.data?.object?.user_reaction
                }
              : file
          )
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getId = (id) => {
    setTargetIdForRemove(id);
    setShowModal(true);
  };

  return (
    <div className="row m-0">
      {loading ? (
        <DataLoader minHeight="300px" />
      ) : isAuthenticated ? (
        <>
          {library?.length === 0 ? (
            <div className="col-12 p-2">
              <div className="noDataFound">
                <img src={noResults} alt="no results" className="mb-3" />
                <h5>{t("sounds.emptyResourcesLibrary")}</h5>
                <Link to="/visuals">{t("sounds.browseNow")}</Link>
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
              {library?.map((file) => (
                <div className="col-lg-4 col-md-6 col-12 p-2" key={file?.id}>
                  <VisualCard
                    file={file}
                    onReact={handleReacting}
                    hasRemoveBtn={true}
                    onRemove={getId}
                  />
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <div className="col-12 p-2">
          <div className="noDataFound">
            <img src={loginImage} alt="no results" className="mb-3" />
            <h5>{t("sounds.noLibiraryLoginMessage")}</h5>
            <Link to="/login" className="mt-2">
              {t("login")}
            </Link>
          </div>
        </div>
      )}
      <ConfirmDeleteModal
        text={t("sounds.removeSoundFromFavourites")}
        buttonText={t("sounds.remove")}
        showModal={showModal}
        setShowModal={setShowModal}
        onDelete={removeFromLibrary}
      />
    </div>
  );
};

export default Favourites;
