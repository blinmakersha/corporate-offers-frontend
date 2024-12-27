import React from "react";

const TextWithLinks = ({ text }) => {
  const regex = typeof text === "string" ? /(https?\/\/[^\s]+)/g : null;

  const highlightedText = regex
    ? text.replace(regex, (match) => {
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
      })
    : text;

  return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
};

export default TextWithLinks;
