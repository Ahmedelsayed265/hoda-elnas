import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import VideoModal from "../components/ui/VideoModal";
import SectionHeader from "../components/layout/SectionHeader";
import { BASE_URL } from "../constants";

const CourseDetails = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const courses = useSelector((state) => state.courses.courses);
  const course = courses.find((c) => c.id === +id);

  const backLinks = [
    {
      name: t("home"),
      path: "/"
    },
    {
      name: t("courses"),
      path: "/courses"
    }
  ];

  return (
    <>
      <SectionHeader pageName={course?.name} backLinks={backLinks} />
      <section className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-12 p-3">
              <div
                className="video_wrapper"
                style={{
                  backgroundImage: `url(${BASE_URL}${course?.background})`
                }}
              >
                <span>{t("installment")}</span>
                <div className="play-btn" onClick={() => setShowModal(true)}>
                  <i className="fa-light fa-play"></i>{" "}
                  <div className="waves-block">
                    <div className="waves wave-1"></div>
                    <div className="waves wave-2"></div>
                    <div className="waves wave-3"></div>
                  </div>
                </div>
              </div>
              <Link className="btn" to="/courses/1/subscripe">
                {t("subscribe")}
              </Link>
              <p className="alreadySub">
                {t("alreadySubscribed")}
                <Link to="/login">{t("login")}</Link>
              </p>
            </div>
            <div className="col-lg-7 col-12 p-3">
              <div className="content">
                <h4>{course?.name}</h4>
                <p>{course?.description}</p>
                <h6>{t("courseGoals")}</h6>
                <ul>
                  {course?.outcome?.split("\r\n").map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <VideoModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CourseDetails;
