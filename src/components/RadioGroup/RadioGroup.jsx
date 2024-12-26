import React from "react";
import "./RadioGroup.css";

const RadioGroup = ({ children, legend }) => {
  return (
    <fieldset className="radio-group">
      {legend && <legend className="radio-group__legend">{legend}</legend>}
      {children}
    </fieldset>
  );
};

export default RadioGroup;
