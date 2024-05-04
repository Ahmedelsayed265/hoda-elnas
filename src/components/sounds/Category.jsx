import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "./../../util/axios";
import DataLoader from "../ui/DataLoader";
import AudioCard from "../layout/AudioCard";

const Category = () => {
  const { slug } = useParams();
  const { lang } = useSelector((state) => state.language);
  const [category, setCategory] = useState([]);
  const hasAccess = useSelector((state) => state.authedUser.access_token);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/learningcenter/list_sound_categories/?slug=${slug}&list_files=true`
        );
        if (response.status === 200 || response.status === 201) {
          setCategory(response?.data?.message[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [slug, lang, hasAccess]);

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
        const files = [...category?.files];
        setCategory((prev) => ({
          ...prev,
          files: files.map((file) => {
            if (file?.id === id) {
              return {
                ...file,
                likes: res?.data?.object?.likes,
                dislikes: res?.data?.object?.dislikes,
                user_reaction: res?.data?.object?.user_reaction
              };
            }
            return file;
          })
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row m-0">
      {loading ? (
        <DataLoader />
      ) : (
        <>
          <div className="col-12 p-2 mb-2">
            <div className="swiper_pagination_title">
              <div className="d-flex align-items-start gap-3">
                <button className="back" onClick={() => window.history.back()}>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
                <div className="d-flex flex-column">
                  <h5 className="mb-0">{category?.name}</h5>
                  <p className="mb-0">{category?.description}</p>
                </div>
              </div>
            </div>
          </div>
          {category?.files?.map((file) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={file?.id}>
              <AudioCard audio={file} onReact={handleReacting} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Category;
