import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./../../util/axios";
import { useSelector } from "react-redux";

const PlayList = () => {
  const [playList, setPlayList] = useState([]);
  const { lang } = useSelector((state) => state.language);
  const { id } = useParams();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `/learningcenter/list_sound_lists/?id=${id}`
        );
        if (response.status === 200 || response.status === 201) {
          setPlayList(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLists();
  }, [id, lang]);

  return <div>PlayList</div>;
};

export default PlayList;
