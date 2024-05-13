import React from "react";

const FileUploadField = ({
  label,
  htmlFor,
  formData,
  setFormData,
  icon,
  Accept
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {icon} {label}
      </label>
      <div className="upload_wrapper">
        <input
          type="file"
          id={htmlFor}
          accept={Accept}
          onChange={(e) => {
            setFormData({ ...formData, [htmlFor]: e.target.files[0] });
          }}
        />
        {formData[htmlFor] ? (
          <div className="img">
            <button
              onClick={(e) => {
                e.preventDefault();
                setFormData({ ...formData, [htmlFor]: null });
              }}
            >
              <i className="fa-light fa-xmark"></i>
            </button>
            {formData[htmlFor].type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(formData[htmlFor])}
                alt="uploaded"
              />
            ) : (
              <p>{formData[htmlFor].name}</p>
            )}
          </div>
        ) : (
          <label htmlFor={htmlFor}>
            <i className="fa-sharp fa-solid fa-rectangle-history-circle-plus"></i>
          </label>
        )}
      </div>
    </div>
  );
};

export default FileUploadField;
