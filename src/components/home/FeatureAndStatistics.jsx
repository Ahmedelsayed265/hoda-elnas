import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import featureImg from "../../assets/images/features.jpg";
import icon1 from "../../assets/images/cashBack.svg";
import icon2 from "../../assets/images/switchTeacher.svg";

const FeatureAndStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      const top = document.querySelector(".feature_and_statistics").offsetTop;
      if (window.scrollY >= top - 100) {
        setIsVisible(true);
      }
    };
    handleVisibility();
    const handleScroll = () => {
      handleVisibility();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="feature_and_statistics">
      <div className="container">
        <div className="row m-0">
          <div className="col-lg-4 col-12 p-2">
            <div className="features toTop">
              <div className="feature">
                <h4>المعلم الأنسب لأبناءك!</h4>
                <p>نوفر لأبناءك تجربة سهلة وجودة ما لها مثيل في كل خطوة.</p>
              </div>
              <div className="feature">
                <h4>دروس على راحتك!</h4>
                <p>نوفر لأبناءك تجربة سهلة وجودة ما لها مثيل في كل خطوة.</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2 d-flex justify-content-center align-items-center">
            <div className="img">
              <img src={featureImg} alt="features" />
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="features toBottom">
              <div className="feature">
                <h4>منصة يُعتمد عليها!</h4>
                <p>نوفر لأبناءك تجربة سهلة وجودة ما لها مثيل في كل خطوة.</p>
              </div>
              <div className="feature">
                <h4>متابعة أول بأول!</h4>
                <p>نوفر لأبناءك تجربة سهلة وجودة ما لها مثيل في كل خطوة.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 mt-5">
          <div className="col-lg-3 col-6 p-2">
            <div className="statistic">
              {isVisible && (
                <h3>
                  <CountUp end={25} duration={4} />
                  k+
                </h3>
              )}
              <p>الطلاب الناشطين</p>
            </div>
          </div>
          <div className="col-lg-3 col-6 p-2">
            <div className="statistic">
              {isVisible && (
                <h3>
                  <CountUp end={899} duration={4} />
                </h3>
              )}
              <p>الكورسات المتوفره</p>
            </div>
          </div>
          <div className="col-lg-3 col-6 p-2">
            <div className="statistic">
              {isVisible && (
                <h3>
                  <CountUp end={158} duration={4} />
                </h3>
              )}
              <p>الشيوخ المتوفرين</p>
            </div>
          </div>
          <div className="col-lg-3 col-6 p-2">
            <div className="statistic">
              {isVisible && (
                <h3>
                  <CountUp end={70} duration={4} />
                  k+
                </h3>
              )}
              <p>الصوتيات والمرئيات</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center m-0 mt-5">
        <div className="col-lg-8 col-12 p-2">
          <div className="good_Experience">
            <h3>نضمن لك تجربة تعليمية ممتازة</h3>
            <div className="notSatisfied">
              <h5>إذا ما أعجبتك التجربة؟</h5>
            </div>
            <div className="solutions">
              <div className="solution">
                <div className="icon">
                  <img src={icon1} alt="icon" />
                </div>
                <div className="text">
                  <h6>ضمان استرداد الأموال</h6>
                  <p>في حال عدم رضاك عن جودة خدماتنا</p>
                </div>
              </div>
              <div className="solution">
                <div className="icon">
                  <img src={icon2} alt="icon" />
                </div>
                <div className="text">
                  <h6>ضمان استبدال المعلم</h6>
                  <p>نضمن لك توفير المعلم المناسب لابنك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureAndStatistics;
