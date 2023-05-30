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

    if ((images && images.length > 0) || (videos && videos.length > 0)) {
      return (
        <div className="flex flex-wrap gap-2">
          {images &&
            images.map((image, index) => (
              <Image
                className="rounded-md h-[150px] md:h-[150px] object-cover w-[50%]"
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                width={150}
                height={150}
              />
            ))}
          {videos &&
            videos.map((video, index) => (
              <video
                className="rounded-md h-[150px] md:h-[150px] object-cover w-[50%]"
                key={index}
                src={URL.createObjectURL(video)}
                controls
              />
            ))}
        </div>
      );
    }

    if (folders && folders.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {folders.map((folder, index) => (
            <p key={index}>{folder}</p>
          ))}
        </div>
      );
    }

    if (albums && albums.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {albums.map((album, index) => (
            <p key={index}>{album}</p>
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
            {renderMediaPreview()}

            <button
              type="button"
              className="px-4 mt-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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
