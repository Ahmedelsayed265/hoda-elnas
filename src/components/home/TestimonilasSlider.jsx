import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "../layout/TestimonialCard";

const TestimonilasSlider = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={5}
      speed={1000}
      loop={true}
      pagination={{
        clickable: true
      }}
      modules={[Pagination, Autoplay]}
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
        <TestimonialCard />
      </SwiperSlide>

      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>

      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>

      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>

      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>

      <SwiperSlide>
        <TestimonialCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default TestimonilasSlider;
