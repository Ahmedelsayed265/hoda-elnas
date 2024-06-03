import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import AudioCard from "../layout/AudioCard";
import axios from "../../util/axios";
import { setHighLightedAudios } from "../../redux/slices/highlightedAudios";

const BestAudios = () => {
  const hightLightedAudios = useSelector(
    (state) => state.highlightedAudios.audios
  );
  const dispatch = useDispatch();

  const handleReacting = async (id, react) => {
    try {
      const res = await axios.post(
        "/learningcenter/Add_like_or_dislike/audio/",
        {
          item_id: id,
          react: react
        }
      );
      if (res.status === 200) {
        const updatedAudios = hightLightedAudios.map((file) => {
          if (file?.id === id) {
            return {
              ...file,
              likes: res?.data?.object?.likes,
              dislikes: res?.data?.object?.dislikes,
              user_reaction: res?.data?.object?.user_reaction
            };
          }
          return file;
        });
        dispatch(setHighLightedAudios(updatedAudios));
      }
    } catch (error) {
      console.error("Error reacting to audio:", error);
    }
  };

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
      {hightLightedAudios?.map((audio) => (
        <SwiperSlide key={audio?.id}>
          <AudioCard audio={audio} onReact={handleReacting} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BestAudios;
