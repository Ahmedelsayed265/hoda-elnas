import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import icon1 from "../../assets/images/cashBack.svg";
import icon2 from "../../assets/images/switchTeacher.svg";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants";

const FeatureAndStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const statistics = useSelector((state) => state.statistics.statistics);
  const whyus = useSelector((state) => state.whyUs.whyUs);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prevActiveFeature) =>
        prevActiveFeature === 3 ? 0 : prevActiveFeature + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (numberString) => {
    if (numberString.includes("K")) {
      return parseFloat(numberString.replace("K", ""));
    } else {
      return parseFloat(numberString);
    }
  };

  return (
    <section className="feature_and_statistics">
      <div className="container">
        <div className="row m-0 pb-3">
          <div className="col-lg-4 col-12 p-2">
            <div className="features toTop">
              <div
                className={`feature ${activeFeature === 0 ? "active" : ""}`}
                onClick={() => setActiveFeature(0)}
              >
                <h4>{whyus[0]?.title}</h4>
                <p>{whyus[0]?.description}</p>
              </div>
              <div
                className={`feature ${activeFeature === 1 ? "active" : ""}`}
                onClick={() => setActiveFeature(1)}
              >
                <h4>{whyus[1]?.title}</h4>
                <p>{whyus[1]?.description}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2 d-flex justify-content-center align-items-center">
            <div className="img">
              <img
                src={`${BASE_URL}${whyus[activeFeature]?.image}`}
                alt="features"
              />
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="features toBottom">
              <div
                className={`feature ${activeFeature === 2 ? "active" : ""}`}
                onClick={() => setActiveFeature(2)}
              >
                <h4>{whyus[2]?.title}</h4>
                <p>{whyus[2]?.description}</p>
              </div>
              <div
                className={`feature ${activeFeature === 3 ? "active" : ""}`}
                onClick={() => setActiveFeature(3)}
              >
                <h4>{whyus[3]?.title}</h4>
                <p>{whyus[3]?.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 mt-lg-5 mt-3">
          {statistics?.map((statistic) => (
            <div className="col-lg-3 col-6 p-2" key={statistic.id}>
              <div className="statistic">
                {isVisible && (
                  <h3>
                    <CountUp
                      end={formatNumber(statistic?.number)}
                      duration={4}
                    />
                    {statistic.number.includes("K") && "K"}
                    {statistic.number.includes("+") && "+"}
                  </h3>
                )}
                <p>{statistic?.title}</p>
              </div>
            </div>
          ))}
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
