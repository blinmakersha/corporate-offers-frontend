import React from "react";
import "./Chip.css";

const Chip = (props) => {
    const { children, className, kind } = props;

    return (
        <span className={`${className} chip chip-${kind}`}>
            {children}
        </span>
    );
};

export default Chip;
