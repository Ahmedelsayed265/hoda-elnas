import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const OurParteners = ({ partners }) => {
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
              dir="rtl"
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
              {partners?.map((partner, index) => (
                <SwiperSlide key={index}>
                  <Link to={partner?.url} target="_blank" className="img">
                    <img src={partner?.image} alt="partner" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurParteners;
