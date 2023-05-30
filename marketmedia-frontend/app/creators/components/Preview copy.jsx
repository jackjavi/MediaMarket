"use client";

import React, { useState } from "react";

const Preview = ({ product }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      <button
        type="button"
        className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
        onClick={handlePreview}
      >
        Preview
      </button>

      {showPreview && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full  bg-opacity-50">
          <div className="bg-purple-400 text-[whitesmoke] rounded-lg p-8 overflow-y-auto min-w-[40vw] max-h-[80vh]">
            <h2 className="text-2xl  font-bold mb-4">Preview</h2>
            <p className=" mb-4 whitespace-pre-wrap">
              <strong>Product Name:</strong> {product.productName}
            </p>
            <p className=" mb-4 whitespace-pre-wrap">
              <strong>Description:</strong> {product.description}
            </p>
            <p className=" mb-4">
              <strong>Price:</strong> {product.price}
            </p>

            {/* Media Preview */}
            {product.images && product.images.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.images.map((image, index) => (
                  <img key={index} src={image.url} alt={`Image ${index + 1}`} />
                ))}
              </div>
            )}

            {product.videos && product.videos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.videos.map((video, index) => (
                  <video key={index} src={video.url} controls />
                ))}
              </div>
            )}

            <button
              type="button"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleClosePreview}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
