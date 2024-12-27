import React, { useEffect, useRef, useState } from "react";

import "./Accordion.css";

function Accordion({ title, children }) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <span style={{ marginRight: "10px" }}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.25 7.875L10.5 13.125L15.75 7.875" stroke="#222222" />
          </svg>
        </span>
        <p className="accordion__title">{title}</p>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div className="accordion__text">{children}</div>
      </div>
    </div>
  );
}

export default Accordion;
