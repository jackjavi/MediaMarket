import React, { useState } from "react";
import Image from "next/image";

const Preview = ({ product }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const renderMediaPreview = () => {
    const { images, videos, folders, albums } = product;
    const allFiles = [
      ...(images || []),
      ...(videos || []),
      ...(folders || []),
      ...(albums || []),
    ];

    if (allFiles.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {allFiles.map((file, index) => (
            <div key={index}>
              {file.type.startsWith("image/") && (
                <Image
                  className="rounded-md h-[150px] md:h-[150px] object-cover w-[50%]"
                  src={URL.createObjectURL(file)}
                  alt={`File ${index + 1}`}
                  width={150}
                  height={150}
                />
              )}
              {file.type.startsWith("video/") && (
                <video
                  className="rounded-md h-[150px] md:h-[150px] object-cover w-[50%]"
                  src={URL.createObjectURL(file)}
                  controls
                />
              )}
              {!file.type.startsWith("image/") &&
                !file.type.startsWith("video/") && <p>{file.name}</p>}
            </div>
          ))}
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
          <div className="bg-purple-400 mt-[5%] text-[whitesmoke] rounded-lg p-8 overflow-y-auto no-scrollbar min-w-[40vw] max-h-[80vh]">
            <h2 className="text-2xl text-blue-500 font-bold mb-4">Preview</h2>
            <p className="text-[whitesmoke] mb-4 whitespace-pre-wrap">
              <strong className="text-blue-300">Product Name:</strong>{" "}
              {product.productName}
            </p>
            <p className="text-[whitesmoke] mb-4 whitespace-pre-wrap">
              <strong className="text-blue-300">Description:</strong>{" "}
              {product.description}
            </p>
            <p className="text-[whitesmoke] mb-4">
              <strong className="text-blue-300">Price:</strong> {product.price}
            </p>

            {/* Media Preview */}
            {renderMediaPreview()}

            <button
              type="button"
              className="px-4 mt-4 py-2 text-[whitesmoke] bg-blue-500 rounded-md hover:bg-blue-600"
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
