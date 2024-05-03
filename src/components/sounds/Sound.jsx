import React, { useEffect, useState } from "react";
import audioPoster from "../../assets/images/audio.jpeg";
import axios from "./../../util/axios";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constants";
import {
  setId,
  setIsPlaying,
  setName,
  setSrc
} from "../../redux/slices/audioSrc";
import { useTranslation } from "react-i18next";
import DataLoader from "./../ui/DataLoader";

const Sound = () => {
  const [audio, setAudio] = useState({});
  const { lang } = useSelector((state) => state.language);
  const isPlaying = useSelector((state) => state.audioSrc.isPlaying);
  const { id } = useParams();
  const soundId = useSelector((state) => state.audioSrc.id);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/learningcenter/list_sound_files/?id=${id}`
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
  }, [id, lang]);

  const playSound = (file, id) => {
    if (file) {
      const decodedUrlBase64 = decodeURIComponent(file);
      const decodedUrl = atob(decodedUrlBase64);
      dispatch(setSrc(`${BASE_URL}${decodedUrl}`));
      dispatch(setId(id));
      dispatch(setIsPlaying(true));
      dispatch(setName(audio?.name));
    }
  };

  const stopSound = () => {
    dispatch(setSrc(""));
    dispatch(setId(""));
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
              <img
                src={`${BASE_URL}${audio?.background}` || audioPoster}
                alt={audio?.name}
              />
            </div>
            <div
              className={`likes_container ${
                audio?.paid === true ? "disabled" : ""
              }`}
            >
              <div className="likes">
                <button>
                  <i className="fa-solid fa-thumbs-up"></i>
                </button>
                <span>{audio?.likes || 0}</span>
              </div>
              <div className="dislikes">
                <button>
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
              <div className="buttons">
                {audio?.paid === true ? (
                  <Link to="/library-subscribe" className="subscribe">
                    {t("sounds.subscribeNow")}
                  </Link>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sound;
