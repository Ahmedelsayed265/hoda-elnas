import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import icon1 from "../../assets/images/cashBack.svg";
import icon2 from "../../assets/images/switchTeacher.svg";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants";

const FeatureAndStatistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const statistics = useSelector((state) => state.statistics.statistics);
  const whyus = useSelector((state) => state.whyUs.whyUs);
  const grantees = useSelector((state) => state.grantees.grantees);

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
      setImageLoaded(false);
    }, 6000);
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (numberString) => {
    if (numberString.includes("K")) {
      return parseFloat(numberString.replace("K", ""));
    } else {
      return parseFloat(numberString);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleFeatureClick = (index) => {
    setActiveFeature(index);
    clearInterval(intervalId);
    const interval = setInterval(() => {
      setActiveFeature((prevActiveFeature) =>
        prevActiveFeature === 3 ? 0 : prevActiveFeature + 1
      );
      setImageLoaded(false);
    }, 6000);
    setIntervalId(interval);
  };

  return (
    <section className="feature_and_statistics">
      <div className="container">
        <div className="row m-0 pb-3">
          <div className="col-lg-4 col-12 p-2">
            <div className="features toTop">
              {whyus.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className={`feature ${
                    activeFeature === index ? "active" : ""
                  }`}
                  onClick={() => handleFeatureClick(index)}
                >
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2 d-flex justify-content-center align-items-center">
            <div className="img">
              <img
                style={{ opacity: imageLoaded ? 1 : 0 }}
                src={`${BASE_URL}${whyus[activeFeature]?.image}`}
                alt="features"
                onLoad={handleImageLoad}
              />
            </div>
          </div>
          <div className="col-lg-4 col-12 p-2">
            <div className="features toBottom">
              {whyus.slice(2, 4).map((item, index) => (
                <div
                  key={index + 2}
                  className={`feature ${
                    activeFeature === index + 2 ? "active" : ""
                  }`}
                  onClick={() => handleFeatureClick(index + 2)}
                >
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
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
        <div className="col-lg-9 col-12 p-2">
          <div className="good_Experience">
            <h3>{grantees?.title}</h3>
            <div className="notSatisfied">
              <h5>{grantees?.sub_title}</h5>
            </div>
            <div className="solutions">
              <div className="solution">
                <div className="icon">
                  <img src={icon1} alt="icon" />
                </div>
                <div className="text">
                  <h6>{grantees?.grantee_1}</h6>
                  <p>{grantees?.description_1}</p>
                </div>
              </div>
              <div className="solution">
                <div className="icon">
                  <img src={icon2} alt="icon" />
                </div>
                <div className="text">
                  <h6>{grantees?.grantee_2}</h6>
                  <p>{grantees?.description_2}</p>
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
