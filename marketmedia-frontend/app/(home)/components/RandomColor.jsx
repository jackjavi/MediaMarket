import React from "react";

const RandomColor = ({ children }) => {
  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const randomColor = getRandomColor();

  return <div style={{ backgroundColor: randomColor }}>{children}</div>;
};

export default RandomColor;
