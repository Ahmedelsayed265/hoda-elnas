import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import CourseCard from "../layout/CourseCard";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const BestCoursesSlider = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={3}
      speed={1000}
      loop={true}
      pagination={{
        clickable: true
      }}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
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
      <SwiperSlide>
        <CourseCard />
      </SwiperSlide>

      <SwiperSlide>
        <CourseCard />
      </SwiperSlide>

      <SwiperSlide>
        <CourseCard />
      </SwiperSlide>

      <SwiperSlide>
        <CourseCard />
      </SwiperSlide>

      <SwiperSlide>
        <CourseCard />
      </SwiperSlide>

      <SwiperSlide>
        <CourseCard />
      </SwiperSlide>
    </Swiper>
  );
};

export default BestCoursesSlider;
