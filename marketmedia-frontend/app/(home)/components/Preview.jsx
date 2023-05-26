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
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <p className="text-gray-700 mb-4">
              <strong>Product Name:</strong> {product.productName}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price:</strong> {product.price}
            </p>
            {/* Add additional fields to display */}
            {/* <p className="text-gray-700 mb-4">
              <strong>Images:</strong> {product.images.join(", ")}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Videos:</strong> {product.videos.join(", ")}
            </p> */}
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
