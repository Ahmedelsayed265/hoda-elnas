import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import partener1 from "../../assets/images/p1-min.png";
import partener2 from "../../assets/images/p2-min.png";
import partener3 from "../../assets/images/p3-min.png";
import partener4 from "../../assets/images/p4-min.png";
import partener5 from "../../assets/images/p5-min.png";
import partener6 from "../../assets/images/p6-min.png";

const OurParteners = () => {
  const { t } = useTranslation();
  return (
    <section className="our_parteners">
      <div className="container">
        <div className="slider_wrapper">
          <h3>{t("homePage.ourPartners")}</h3>
          <p>{t("homePage.ourPartnersSubTitle")}</p>
          <div className="slider">
            <Swiper
              spaceBetween={16}
              slidesPerView={5}
              speed={1000}
              loop={true}
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                992: {
                  slidesPerView: 5
                },
                768: {
                  slidesPerView: 4
                },
                350: {
                  slidesPerView: 2
                }
              }}
              className="teamSwiper"
            >
              <SwiperSlide>
                <div className="img">
                  <img src={partener1} alt="partner" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img">
                  <img src={partener2} alt="partner" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img">
                  <img src={partener3} alt="partner" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img">
                  <img src={partener4} alt="partner" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img">
                  <img src={partener5} alt="partner" />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img">
                  <img src={partener6} alt="partner" />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurParteners;
