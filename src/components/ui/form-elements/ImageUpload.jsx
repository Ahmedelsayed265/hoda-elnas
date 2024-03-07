import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../../assets/images/avatar.jpg";

const ImageUpload = ({formData , setFormData}) => {
  const { t } = useTranslation();
  const imgView = useRef(null);
  const handleUpload = (e) => {
    imgView.current.src = URL.createObjectURL(e.target.files[0]);
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  }
  return (
    <div className="image-change-wrapper">
      <div className="img-wrap">
        <img ref={imgView} src={avatar} alt="avatar" />
      </div>
      <div className="d-flex w-100 justify-content-between align-items-center">
        <label htmlFor="img">{t("auth.personalPhoto")}</label>
        <label className="upload">
          <div className="plus">
            <i className="fa-regular fa-plus"></i>
          </div>
          <input
            type="file"
            name="userImage"
            id="img-upload"
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
