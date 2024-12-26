import React from "react";
import "./RadioButton.css";

const RadioButton = ({
  id,
  name,
  value,
  checked,
  labelText,
  onChange,
  children,
}) => {
  return (
    <label className="radio">
      <input
        className="radio-input"
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span>{children ? children : labelText}</span>
    </label>
  );
};

export default RadioButton;
