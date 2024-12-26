import React from "react";
import "./Input.css";

const Input = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  dark = false,
}) => (
  <div className={`input ${dark ? "input--dark" : ""}`}>
    {label && <label htmlFor="input">{label}</label>}
    <input
      type={type}
      value={value}
      name={name}
      className="input-control"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default Input;
