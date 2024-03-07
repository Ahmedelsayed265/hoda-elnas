import React from "react";

const InputField = ({
  id,
  label,
  value,
  htmlFor,
  formData,
  placeholder,
  setFormData,
  icon,
  type = "text"
}) => {
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {icon} {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        name={id}
        required
        value={value || formData[htmlFor]}
        onChange={(e) => {
          setFormData({ ...formData, [htmlFor]: e.target.value });
        }}
      />
    </div>
  );
};

export default InputField;
