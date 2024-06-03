import React, { useEffect, useState } from "react";
import audioPoster from "../../assets/images/audio.jpeg";
import axios from "./../../util/axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setId,
  setIsPlaying,
  setName,
  setSrc
} from "../../redux/slices/audioSrc";
import { useTranslation } from "react-i18next";
import DataLoader from "./../ui/DataLoader";
import { toast } from "react-toastify";
import AddAudioToPlayListModal from "./AddAudioToPlayListModal";

const Sound = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { lang } = useSelector((state) => state.language);
  const hasAccess = useSelector((state) => state.authedUser.access_token);
  const soundId = useSelector((state) => state.audioSrc.id);
  const isPlaying = useSelector((state) => state.audioSrc.isPlaying);
  const dispatch = useDispatch();
  const [audio, setAudio] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/learningcenter/list_sound_files/?slug=${slug}`
        );
        if (response.status === 200 || response.status === 201) {
          setAudio(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAudio();
  }, [slug, lang, hasAccess]);

  const playSound = (file, id) => {
    if (file) {
      const decodedUrlBase64 = decodeURIComponent(file);
      const decodedUrl = atob(decodedUrlBase64);
      dispatch(setSrc(decodedUrl));
      dispatch(setId(id));
      dispatch(setIsPlaying(true));
      dispatch(setName(audio?.name));
    }
  };

  const stopSound = () => {
    dispatch(setSrc(""));
    dispatch(setId(""));
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
        setAudio((prev) => ({
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
      const res = await axios.put(`/members/Add_audio_to_user_fav/`, {
        audio_id: audio?.id
      });
      if (res.status === 200) {
        setAudio(res?.data?.object[0]);
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
        `/members/Delete_file_audio_list_fav/?audio_id=${audio?.id}`
      );
      if (res.status === 200) {
        setAudio(res?.data?.object[0]);
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
                <h5 className="mb-0">{audio?.name}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-12 p-2">
            <div className="sound_img">
              <img src={audio?.background || audioPoster} alt={audio?.name} />
            </div>
            <div
              className={`likes_container mt-3 ${
                audio?.paid === true && !hasAccess ? "disabled" : ""
              }`}
            >
              <div className="likes">
                <button
                  className={audio?.user_reaction === "like" ? "active" : ""}
                  onClick={() => handleReacting(audio?.id, "like")}
                >
                  <i className="fa-solid fa-thumbs-up"></i>
                </button>
                <span>{audio?.likes || 0}</span>
              </div>
              <div className="dislikes">
                <button
                  className={audio?.user_reaction === "dislike" ? "active" : ""}
                  onClick={() => handleReacting(audio?.id, "dislike")}
                >
                  <i className="fa-solid fa-thumbs-down"></i>
                </button>
                <span>{audio?.dislikes || 0}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-12 p-2">
            <div className="sound_content">
              <h5 className="mb-0">{audio?.name}</h5>
              <p className="mb-0">{audio?.description}</p>
              <div className="buttons mt-2">
                {audio?.paid === true ? (
                  <Link to="/library-subscribe" className="subscribe">
                    {t("sounds.subscribeNow")}
                  </Link>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex gap-4">
                      <button
                        className={`add_to_library ${
                          audio?.in_fav === true ? "danger" : ""
                        }`}
                        onClick={
                          audio?.in_fav === true
                            ? removeFromLibrary
                            : addToLibrary
                        }
                      >
                        <span>
                          {audio?.in_fav === true ? (
                            <i className="fa-sharp fa-solid fa-bookmark-slash"></i>
                          ) : (
                            <i className="fa-regular fa-bookmark"></i>
                          )}
                        </span>
                        {audio?.in_fav === true
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
                        {t("sounds.addToPlaylist")}
                      </button>
                    </div>
                    {soundId === audio?.id && isPlaying === true ? (
                      <div className="play_btnn" onClick={stopSound}>
                        <i className="fa-duotone fa-pause"></i>
                        {t("sounds.pause")}
                      </div>
                    ) : (
                      <div
                        className="play_btnn"
                        onClick={() => playSound(audio?.file, audio?.id)}
                      >
                        <i className="fa-duotone fa-play"></i>
                        {t("sounds.play")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <AddAudioToPlayListModal
        setShowModal={setShowModal}
        showModal={showModal}
        audio={audio}
      />
    </>
  );
};

export default Sound;
