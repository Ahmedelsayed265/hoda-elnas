import React from "react";

const FileUploadField = ({
  label,
  htmlFor,
  formData,
  setFormData,
  uploadText,
  Accept
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <label htmlFor={htmlFor} className="cv_area">
        <input
          type="file"
          accept={Accept}
          name={htmlFor}
          id={htmlFor}
          onChange={(e) => {
            setFormData({
              ...formData,
              [htmlFor]: e.target.files[0]
            });
          }}
        />
        <div className="content">
          <i className="fa-regular fa-paperclip"></i>
          <p>{uploadText}</p>
        </div>
        {formData[htmlFor] && <span>{formData[htmlFor]?.name}</span>}
      </label>
    </div>
  );
};

export default FileUploadField;
