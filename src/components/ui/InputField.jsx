import React from "react";
import { Form } from "react-bootstrap";

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
      <Form.Control
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
