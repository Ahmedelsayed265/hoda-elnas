import React from "react";

const InputField = ({
  name,
  labelPlaceholder,
  placeHolder,
  icon,
  type = "text",
  value,
  handleChange,
  required
}) => {
  return (
    <div className="input-field">
      <label htmlFor={name}>
        {icon}
        {labelPlaceholder}
      </label>
      <input
        required={required}
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
