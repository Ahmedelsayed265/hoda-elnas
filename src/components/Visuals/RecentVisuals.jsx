import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./../../util/axios";
import DataLoader from "../ui/DataLoader";
import listIcon from "../../assets/images/book-list.svg";
import Slider from "./Slider";

const RecentVisuals = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const hasAccess = useSelector((state) => state.authedUser.access_token);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/learningcenter/list_resources_lists/?list_files=true&highlighted=true"
        );
        if (response.status === 200 || response.status === 201) {
          setLists(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [lang, hasAccess]);

  const handleReacting = async (id, react, listId) => {
    console.log(id, react, listId);
    try {
      const res = await axios.post(
        "/learningcenter/Add_like_or_dislike/resource/",
        {
          item_id: id,
          react: react
        }
      );
      if (res.status === 200) {
        setLists((prevLists) => {
          return prevLists.map((list) => {
            if (list?.id === listId) {
              const updatedFiles = list.files.map((file) => {
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
              return { ...list, files: updatedFiles };
            }
            return list;
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <DataLoader minHeight="300px" />
      ) : (
        <div className="row m-0">
          {lists?.map((list) => (
            <Fragment key={list?.id}>
              <div className="col-12 p-2">
                <div className="swiper_pagination_title">
                  <h5>
                    <img src={listIcon} alt="list" /> {list?.name}
                  </h5>
                  <div className="swiper_pagination">
                    <button className={`swiper-button-next-${list?.id}`}>
                      <i className="fa-regular fa-angle-right"></i>
                    </button>
                    <button className={`swiper-button-prev-${list?.id}`}>
                      <i className="fa-regular fa-angle-left"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 p-2 pt-3">
                <Slider
                  onReacting={(id, react) =>
                    handleReacting(id, react, list?.id)
                  }
                  slides={list?.files}
                  prevbuttonClass={`.swiper-button-prev-${list?.id}`}
                  nextbuttonClass={`.swiper-button-next-${list?.id}`}
                />
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default RecentVisuals;
