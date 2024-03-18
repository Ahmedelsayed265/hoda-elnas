import React from "react";
import VideoModal from "../ui/VideoModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../constants";

const HeroSection = () => {
  const [showModal, setShowModal] = React.useState(false);
  const appIntro = useSelector((state) => state.homeIntro.homeIntro);
  const { t } = useTranslation();
  return (
    <>
      <section className="hero_section">
        <div className="container">
          <div className="row m-0 gap-lg-0 gap-3">
            <div className="col-lg-6 col-12 p-lg-3 p-2">
              <div className="content">
                <h1>{appIntro?.title}</h1>
                <p>{appIntro?.description}</p>
                <Link to="/courses" className="button-86">
                  {t("joinUs")}
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-12 p-lg-3 p-2">
              <div
                className="video_wrapper"
                style={{
                  backgroundImage: `url(${BASE_URL}${appIntro?.image})`
                }}
              >
                {appIntro?.video && (
                  <div className="play-btn" onClick={() => setShowModal(true)}>
                    <i className="fa-light fa-play"></i>{" "}
                    <div className="waves-block">
                      <div className="waves wave-1"></div>
                      <div className="waves wave-2"></div>
                      <div className="waves wave-3"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default HeroSection;
