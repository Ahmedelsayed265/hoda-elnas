import React, { useEffect, useState } from "react";
import audioPoster from "../../assets/images/audio.jpeg";
import axios from "./../../util/axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants";
import { useTranslation } from "react-i18next";
import DataLoader from "./../ui/DataLoader";
import { toast } from "react-toastify";
import AddFileToListModal from "./AddFileToListModal";

const Visual = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const hasAccess = useSelector((state) => state.authedUser.access_token);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState({});
  const [loading, setLoading] = useState(true);

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

  const handleReacting = async (id, react) => {
    try {
      const res = await axios.post(
        "/learningcenter/Add_like_or_dislike/resource/",
        {
          item_id: id,
          react: react
        }
      );
      if (res.status === 200) {
        setFile((prev) => ({
          ...prev,
          likes: res?.data?.object?.likes,
          dislikes: res?.data?.object?.dislikes,
          user_reaction: res?.data?.object?.user_reaction
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToLibrary = async () => {
    try {
      const res = await axios.put(`/members/Add_resouces_to_user_fav/`, {
        resource_id: file?.id
      });
      if (res.status === 200) {
        setFile(res?.data?.object[0]);
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromLibrary = async () => {
    try {
      const res = await axios.delete(
        `/members/Delete_file_resources_list_fav/?resource_id=${file?.id}`
      );
      if (res.status === 200) {
        setFile(res?.data?.object[0]);
      } else {
        toast.error(res?.response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="col-lg-5 col-12 p-2">
            <div className="sound_img">
              <img
                src={
                  file?.background
                    ? `${BASE_URL}${file?.background}`
                    : audioPoster
                }
                alt={file?.name}
              />
            </div>
            <div
              className={`likes_container mt-3 mb-3 ${
                file?.paid === true && !hasAccess ? "disabled" : ""
              }`}
            >
              <div className="likes">
                <button
                  className={file?.user_reaction === "like" ? "active" : ""}
                  onClick={() => handleReacting(file?.id, "like")}
                >
                  <i className="fa-solid fa-thumbs-up"></i>
                </button>
                <span>{file?.likes || 0}</span>
              </div>
              <div className="dislikes">
                <button
                  className={file?.user_reaction === "dislike" ? "active" : ""}
                  onClick={() => handleReacting(file?.id, "dislike")}
                >
                  <i className="fa-solid fa-thumbs-down"></i>
                </button>
                <span>{file?.dislikes || 0}</span>
              </div>
            </div>
            <div className="sound_content">
              <div className="buttons mt-2">
                {file?.paid === true ? (
                  <Link to="/library-subscribe" className="subscribe">
                    {t("sounds.subscribeNow")}
                  </Link>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex gap-4">
                      <button
                        className={`add_to_library ${
                          file?.in_fav === true ? "danger" : ""
                        }`}
                        onClick={
                          file?.in_fav === true
                            ? removeFromLibrary
                            : addToLibrary
                        }
                      >
                        <span>
                          {file?.in_fav === true ? (
                            <i className="fa-sharp fa-solid fa-bookmark-slash"></i>
                          ) : (
                            <i className="fa-regular fa-bookmark"></i>
                          )}
                        </span>
                        {file?.in_fav === true
                          ? t("sounds.removeFromMyLibrary")
                          : t("sounds.addToMyLibrary")}
                      </button>
                      <button
                        className="add_to_library"
                        onClick={() => setShowModal(true)}
                      >
                        <span>
                          <i className="fa-regular fa-plus"></i>
                        </span>
                        {t("sounds.addTolist")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-12 p-2">
            <div className="sound_content">
              <h5 className="mb-0">{file?.name}</h5>
              <p className="mb-0">{file?.description}</p>
            </div>
          </div>
        </div>
      )}
      <AddFileToListModal
        setShowModal={setShowModal}
        showModal={showModal}
        file={file}
      />
    </>
  );
};

export default Visual;
