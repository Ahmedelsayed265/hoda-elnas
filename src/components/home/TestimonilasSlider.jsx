import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "../layout/TestimonialCard";
import { useSelector } from "react-redux";

const TestimonilasSlider = () => {
  const feedBacks = useSelector((state) => state.feedBacks.feedBacks);
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={5}
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
      {feedBacks.map((feedback) => (
        <SwiperSlide key={feedback?.name}>
          <TestimonialCard feedback={feedback} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonilasSlider;
