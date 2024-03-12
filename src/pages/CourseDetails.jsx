import React from "react";
import SectionHeader from "../components/layout/SectionHeader";
import { useTranslation } from "react-i18next";
import poster from "../assets/images/c1.jpeg";
import VideoModal from "../components/ui/VideoModal";

const CourseDetails = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { t } = useTranslation();
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
      <SectionHeader pageName="كورس صفات المؤمن" backLinks={backLinks} />
      <section className="course-details">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 p-3">
              <div
                className="video_wrapper"
                style={{ backgroundImage: `url(${poster})` }}
              >
                <div
                  rel="noreferrer"
                  target="_blank"
                  data-fancybox="about-us-video"
                  className="play-btn"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fa-light fa-play"></i>{" "}
                  <div className="waves-block">
                    <div className="waves wave-1"></div>
                    <div className="waves wave-2"></div>
                    <div className="waves wave-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12 p-3">
              <div className="content">
                <h4>مفاتيح فهم القرءان (مقدمة في أصول التفسير)</h4>
                <p>
                  مقرر دراسي يبحث في أصول ومبادئ تفسير القرآن الكريم. يهدف هذا
                  المقرر إلى توجيه الطلاب والمهتمين بالدراسات الإسلامية نحو فهم
                  أعمق وأشمل للقرآن، وذلك من خلال تقديمهم للمفاهيم الأساسية التي
                  تسهل فهم وتأويل النص القرآني.
                </p>
                <h6>أهداف المقرر</h6>
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
