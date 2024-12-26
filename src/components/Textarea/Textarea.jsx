import React from "react";
import "./Textarea.css";

const Textarea = ({ value, label, name, placeholder, type, onChange }) => (
  <div className="textarea">
    {label && <label htmlFor="textarea">{label}</label>}
    <textarea
      type={type}
      value={value}
      name={name}
      className="textarea-control"
      placeholder={placeholder}
      onChange={onChange}
      rows={6}
    />
  </div>
);

export default Textarea;
