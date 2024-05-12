import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import avatar from "../../assets/images/avatar.jpg";
import PhoneField from "../ui/form-elements/PhoneField";
import Gender from "../ui/form-elements/Gender";
import SubmitButton from "../ui/form-elements/SubmitButton";
import InputField from "../ui/form-elements/InputField";
import NameField from "../ui/form-elements/NameField";
import { useSelector } from "react-redux";
import axios from "./../../util/axios";
import { toast } from "react-toastify";

const EditAccount = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authedUser.user);
  const [renderedImage, setRenderedImage] = useState(user?.image || avatar);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.first_name || "",
        lastname: user.last_name || "",
        email: user.email || "",
        phone_number: user.phone || "",
        whatsapp_number: user.whatsapp || "",
        gender: user.gender || "",
        age: user.age || ""
      });
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRenderedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/accounts/Edit_user/${user?.id}/`, formData);
      if (res.status === 200 || res.status === 201) {
        toast.success(t("profileUpdated"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-ui" onSubmit={handleSubmit}>
      <div className="input-field image-change-wrapper">
        <div className="img-wrap">
          <img src={renderedImage} alt="avatar" />
        </div>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <label htmlFor="img">{t("profilePic")}</label>
          <label className="upload">
            <div className="plus">
              <i className="fa-regular fa-plus"></i>
            </div>
            <input
              type="file"
              name="userImage"
              id="img-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
      {/* name */}
      <NameField setFormData={setFormData} formData={formData} />
      <div className="form_group">
        {/* email */}
        <InputField
          label={t("auth.email")}
          placeholder={t("auth.emailPlaceHolder")}
          htmlFor="email"
          value={formData.email}
          formData={formData}
          id={"email"}
          setFormData={setFormData}
          icon={<i className="fa-light fa-envelope"></i>}
        />
        {/* age */}
        <InputField
          label={t("dashboard.studentAge")}
          placeholder={"00"}
          htmlFor="age"
          value={formData.age}
          formData={formData}
          id={"age"}
          setFormData={setFormData}
          icon={<i className="fa-light fa-calendar"></i>}
        />
      </div>
      <div className="form_group">
        {/* phone */}
        <PhoneField
          label={t("auth.phone")}
          icon={<i className="fa-sharp fa-light fa-phone"></i>}
          formData={formData}
          setFormData={setFormData}
          value={formData.phone_number}
          id="phone_number"
        />
        {/* whats app */}
        <PhoneField
          label={t("auth.whatsapp")}
          icon={<i className="fa-brands fa-whatsapp"></i>}
          formData={formData}
          setFormData={setFormData}
          value={formData.whatsapp_number}
          id="whatsapp_number"
        />
      </div>
      {/* gender */}
      <Gender setFormData={setFormData} formData={formData} dataKey="gender" />
      <SubmitButton name={t("editAccount")} loading={loading} />
    </form>
  );
};

export default EditAccount;
