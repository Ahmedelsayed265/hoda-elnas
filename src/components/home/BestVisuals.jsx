import React from "react";
import { Swiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// import VisualCard from "../layout/VisualCard";

const BestVisuals = () => {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={4}
      speed={1000}
      dir="rtl"
      loop={true}
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
          slidesPerView: 2
        }
      }}
      className="teamSwiper"
    >
      {/* <SwiperSlide>
        <VisualCard />
      </SwiperSlide>

      <SwiperSlide>
        <VisualCard />
      </SwiperSlide>

      <SwiperSlide>
        <VisualCard />
      </SwiperSlide>

      <SwiperSlide>
        <VisualCard />
      </SwiperSlide> */}
    </Swiper>
  );
};

export default BestVisuals;
