import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import avatar from "../../../assets/images/avatar.jpg";
import { useTranslation } from "react-i18next";
import InputField from "../../ui/form-elements/InputField";
import Gender from "../../ui/form-elements/Gender";
import TextField from "./../../ui/form-elements/TextField";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import PhoneField from "./../../ui/form-elements/PhoneField";

const AddStudentModal = ({
  showModal,
  setShowModal,
  setFormData,
  formData,
  handleAddStudent,
  loading
}) => {
  const { t } = useTranslation();
  const [renderedImage, setRenderedImage] = useState(avatar);

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

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton />
      <Modal.Body className="add-student">
        <form className="form-ui" onSubmit={handleAddStudent}>
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
          <div className="form_group">
            <InputField
              label={t("dashboard.studentName")}
              placeholder={t("dashboard.studentNamePlaceHolder")}
              htmlFor="studentname"
              value={formData.studentname}
              formData={formData}
              id={"studentname"}
              setFormData={setFormData}
            />
            <InputField
              label={t("dashboard.studentAge")}
              placeholder={t("dashboard.studentAgePlaceHolder")}
              htmlFor="studentage"
              value={formData.studentage}
              formData={formData}
              id={"studentage"}
              type="number"
              setFormData={setFormData}
            />
          </div>
          <PhoneField
            label={t("dashboard.studentContact")}
            placeholder={t("dashboard.studentContactPlaceHolder")}
            htmlFor="studentcontact"
            value={formData.studentcontact}
            formData={formData}
            id={"phone"}
            type="tel"
            setFormData={setFormData}
          />
          <Gender formData={formData} setFormData={setFormData} dataKey="sex" />
          <TextField
            label={t("dashboard.notes")}
            placeholder={t("dashboard.notesPlaceHolder")}
            htmlFor="notes"
            value={formData.notes}
            formData={formData}
            id={"notes"}
            setFormData={setFormData}
          />
          <SubmitButton name={t("dashboard.add")} loading={loading} />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudentModal;
