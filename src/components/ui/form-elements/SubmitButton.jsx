import React from "react";

const SubmitButton = ({ loading, name, className, onClick }) => {
  return (
    <button
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      onClick={onClick}
      className={`save ${className}`}
    >
      {name} <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
    </button>
  );
};

export default SubmitButton;
