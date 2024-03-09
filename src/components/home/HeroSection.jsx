import React from "react";
import poster from "../../assets/images/videoPoster.png";
import VideoModal from "../ui/VideoModal";

const HeroSection = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <section className="hero_section">
        <div className="container">
          <div className="row m-0">
            <div className="col-lg-6 col-12 p-lg-3 p-2">
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
            <div className="col-lg-6 col-12 p-lg-3 p-2">
              <div className="content">
                <h1>تعلم القرءان خطوة بخطوة</h1>
                <p>
                  سوف تحصل على حصص فردية مع رفيق رحلتك والكثير من المواد
                  التعليمية والمحتوى المرئي المبسط لجميع الطلاب يمكنك الوصول لها
                  واستخدامها في أي وقت. كل من معلمينا لديهم العلم الكافي والخبرة
                  الكافية لشرح وإعداد المادة العلمية الموجودة المستخدمة في
                  المحاضرات.
                </p>
                <button className="button-86">إنضم الينا</button>
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
