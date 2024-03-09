import React from "react";
import poster from "../../assets/images/videoPoster.png";

const HeroSection = () => {
  return (
    <section className="hero_section">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-6 col-12 p-lg-3 p-2">
            <div
              className="video_wrapper"
              style={{ backgroundImage: `url(${poster})` }}
            >
              <a
                href="img/Somu Training.MP4"
                data-fancybox="about-us-video"
                class="play-btn"
              >
                <i class="fa-light fa-play"></i>
                <div class="waves-block">
                  <div class="waves wave-1"></div>
                  <div class="waves wave-2"></div>
                  <div class="waves wave-3"></div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-12 p-lg-3 p-2">
            <div className="content">
              <h1>تعلم القرءان خطوة بخطوة</h1>
              <p>
                سوف تحصل على حصص فردية مع رفيق رحلتك والكثير من المواد التعليمية
                والمحتوى المرئي المبسط لجميع الطلاب يمكنك الوصول لها واستخدامها
                في أي وقت. كل من معلمينا لديهم العلم الكافي والخبرة الكافية لشرح
                وإعداد المادة العلمية الموجودة المستخدمة في المحاضرات.
              </p>
              <button className="button-86">إنضم الينا</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
