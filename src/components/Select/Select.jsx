import React, { useState } from "react";
import "./Select.css";

const Select = ({
  data,
  label,
  selected,
  setSelected,
  multi = false,
  style,
}) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleItemClick = (item) => {
    if (multi) {
      setSelected((prevItems) =>
        prevItems.includes(item.name)
          ? prevItems.filter((i) => i !== item.name)
          : [...prevItems, item.name]
      );
      setIsListOpen(false);
    } else {
      setSelected(item);
      setIsListOpen(false);
    }
  };

  const handleFocus = () => {
    setIsListOpen(true);
  };

  const renderSelected = () => {
    if (!multi) {
      return selected ? selected.name : "";
    }
    return selected.length > 0 ? selected.join(", ") : "";
  };

  return (
    <div style={style} className="select">
      {label && (
        <label className="select-label" htmlFor="select">
          {label}
        </label>
      )}
      <div className="select-box" onFocus={handleFocus}>
        <div className="current-selected" tabIndex="0">
          <p>{renderSelected()}</p>
          <img
            className="select-icon"
            src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
        <ul
          className={`select-item-list ${
            isListOpen ? "select-item-list--open" : ""
          }`}
        >
          {data.map((item) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`select-item-list-option ${
                multi && selected.includes(item.name) ? "selected" : ""
              }`}
            >
              <span className="option-item-label">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
