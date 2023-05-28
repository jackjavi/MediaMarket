import React, { useState } from "react";

const Preview = ({ product }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const renderMediaPreview = () => {
    const mediaFiles = [...product.images, ...product.videos];

    if (mediaFiles.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {mediaFiles.map((file, index) => {
            if (file.type.startsWith("image")) {
              return (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              );
            } else if (file.type.startsWith("video")) {
              return (
                <video
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Video ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                  controls
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      );
    }

    return null;
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
          <div className="bg-white rounded-lg p-8 overflow-y-auto min-w-[40vw] max-h-[80vh]">
            <h2 className="text-2xl text-gray-700 font-bold mb-4">Preview</h2>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              <strong>Product Name:</strong> {product.productName}
            </p>
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Price:</strong> {product.price}
            </p>

            {/* Media Preview */}
            <div className="flex flex-wrap gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                />
              ))}
              {product.videos.map((video, index) => (
                <video
                  key={index}
                  src={URL.createObjectURL(video)}
                  alt={`Video ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-md"
                  controls
                />
              ))}
            </div>

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
