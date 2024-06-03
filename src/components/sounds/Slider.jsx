import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import AudioCard from "../layout/AudioCard";

const Slider = ({ slides, prevbuttonClass, nextbuttonClass, onReacting }) => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={3}
      speed={1000}
      loop={true}
      dir="rtl"
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: nextbuttonClass,
        prevEl: prevbuttonClass
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      breakpoints={{
        992: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        },
        350: {
          slidesPerView: 1
        }
      }}
      className="teamSwiper"
    >
      {slides?.map((slide) => (
        <SwiperSlide key={slide?.id}>
          <AudioCard audio={slide} onReact={onReacting} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
