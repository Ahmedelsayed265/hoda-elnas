import React from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import CourseCard from "../layout/CourseCard";
import "swiper/css";
import "swiper/css/pagination";

const BestCoursesSlider = () => {
  const hightLightedCourses = useSelector(
    (state) => state.highlightedCourses.courses
  );
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={3}
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
      {hightLightedCourses?.map((course) => (
        <SwiperSlide key={course?.id}>
          <CourseCard course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BestCoursesSlider;
