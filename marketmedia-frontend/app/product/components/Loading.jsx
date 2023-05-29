import React from "react";
import { Audio } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-gray-200">
        <Audio
          height="100%"
          width="100%"
          radius="3"
          color="gold"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    </div>
  );
};

export default Loading;
