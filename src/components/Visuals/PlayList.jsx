import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "./../../util/axios";
import DataLoader from "../ui/DataLoader";
import VisualCard from "../layout/VisualCard";

const PlayList = () => {
  const { slug } = useParams();
  const { lang } = useSelector((state) => state.language);
  const hasAccess = useSelector((state) => state.authedUser.access_token);
  const [playList, setPlayList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/learningcenter/list_resources_lists/?slug=${slug}&list_files=true`
        );
        if (response.status === 200 || response.status === 201) {
          setPlayList(response?.data?.message[0]);
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
        "/learningcenter/Add_like_or_dislike/resource/",
        {
          item_id: id,
          react: react
        }
      );
      if (res.status === 200) {
        const files = [...playList?.files];
        setPlayList((prev) => ({
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
        <DataLoader minHeight="300px" />
      ) : (
        <>
          <div className="col-12 p-2 mb-2">
            <div className="swiper_pagination_title">
              <div className="d-flex align-items-start gap-3">
                <button className="back" onClick={() => window.history.back()}>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
                <div className="d-flex flex-column">
                  <h5 className="mb-0">{playList?.name}</h5>
                  <p className="mb-0">{playList?.description}</p>
                </div>
              </div>
            </div>
          </div>
          {playList?.files?.map((file) => (
            <div className="col-lg-4 col-md-6 col-12 p-2" key={file?.id}>
              <VisualCard file={file} onReact={handleReacting} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PlayList;
