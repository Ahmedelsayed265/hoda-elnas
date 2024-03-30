import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import AudioCard from "../layout/AudioCard";

const BestAudios = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={4}
      speed={1000}
      loop={true}
      dir="rtl"
      pagination={{
        clickable: true
      }}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        992: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        350: {
          slidesPerView: 1
        }
      }}
      className="teamSwiper"
    >
      <SwiperSlide>
        <AudioCard />
      </SwiperSlide>

      <SwiperSlide>
        <AudioCard />
      </SwiperSlide>

      <SwiperSlide>
        <AudioCard />
      </SwiperSlide>

      <SwiperSlide>
        <AudioCard />
      </SwiperSlide>

      <SwiperSlide>
        <AudioCard />
      </SwiperSlide>

      <SwiperSlide>
        <AudioCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default BestAudios;
