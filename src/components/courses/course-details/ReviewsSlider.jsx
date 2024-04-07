import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "../../layout/TestimonialCard";

const ReviewsSlider = ({ reviews }) => {
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
      {reviews?.map((feedback, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard feedback={feedback} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewsSlider;
