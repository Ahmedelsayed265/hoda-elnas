import React from "react";
import { Link } from "react-router-dom";
import library from "../../assets/images/lib.svg";
import headPhone from "../../assets/images/Headphones.svg";
import { useTranslation } from "react-i18next";

const ListCard = ({ list, onDelete, onEdit }) => {
  const { t } = useTranslation();
  return (
    <Link to={`/audios/my-playlists/${list?.id}`} className="list-card">
      <div className="icon">
        <img src={library} alt="library" />
      </div>
      <div className="content">
        <h6>{list.listname}</h6>
        <p>
          <img src={headPhone} alt="headphone" />
          {list?.files_count} {t("sounds.file")}
        </p>
        <p>{list?.date_create}</p>
      </div>
      <div className="buttons">
        <Link onClick={() => onEdit(list)}>
          <i className="fa-light fa-pen-to-square"></i>
        </Link>
        <Link onClick={() => onDelete(list?.id)}>
          <i className="fa-sharp fa-solid fa-trash"></i>
        </Link>
      </div>
    </Link>
  );
};

export default ListCard;
