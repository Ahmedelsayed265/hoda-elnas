import React from "react";

const RadiosSelect = ({
  headLine,
  labelPlaceholder,
  icon,
  options,
  name,
  checked,
  handleChange,
  additionalInfo
}) => {
  return (
    <div className="input-field">
      {headLine ? (
        <h6>{headLine}</h6>
      ) : (
        <label>
          {icon}
          {labelPlaceholder}
        </label>
      )}

      <div className="time-group">
        {options?.map((option, index) => (
          <label htmlFor={option} key={index} className="duration_check">
            <input
              type="radio"
              name={name}
              id={option}
              value={option}
              checked={checked === option}
              onChange={handleChange}
            />
            <div className="time">
              <span>{option}</span>
              <span>{additionalInfo}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadiosSelect;
