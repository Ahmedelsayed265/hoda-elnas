import React from "react";

const TextField = ({
  id,
  label,
  value,
  htmlFor,
  formData,
  placeholder,
  setFormData
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>{label}</label>
      <textarea
        placeholder={placeholder}
        id={id}
        name={id}
        value={value || formData[htmlFor]}
        onChange={(e) => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      ></textarea>
    </div>
  );
};

export default TextField;
