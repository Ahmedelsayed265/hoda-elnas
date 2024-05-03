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
  }, [slug, lang]);

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
              <AudioCard audio={file} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Category;
