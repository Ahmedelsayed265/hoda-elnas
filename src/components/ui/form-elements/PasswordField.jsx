import React, { useState } from "react";

const PasswordField = ({
  htmlFor,
  label,
  icon,
  value,
  id,
  formData,
  setFormData
}) => {
  const [showPass, setShowPass] = useState(false);
  const handleInputType = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="input-field">
      <label htmlFor={htmlFor}>
        {icon} {label}
      </label>
      <div className="pass-group">
        <input
          placeholder="************"
          type={showPass ? "text" : "password"}
          id={id}
          required
          name={id}
          value={value || formData[htmlFor]}
          onChange={(e) => {
            setFormData({ ...formData, [htmlFor]: e.target.value });
          }}
        />
        <button onClick={handleInputType}>
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
