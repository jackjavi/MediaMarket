"use client";

import React, { useState } from "react";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform submission logic here
    console.log({
      productName,
      description,
      price,
      images,
      videos,
      albums,
      folders,
      selectedCategories,
    });

    // Reset form fields
    setProductName("");
    setDescription("");
    setPrice("");
    setImages([]);
    setVideos([]);
    setAlbums([]);
    setFolders([]);
    setSelectedCategories([]);
  };

  return (
    <div className="container mx-auto mt-8 p-2">
      <form onSubmit={handleSubmit} className="text-gray-700">
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-[whitesmoke]"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-[whitesmoke]"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-md"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-[whitesmoke]"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Images
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Videos
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => setVideos([...e.target.files])}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Albums
          </label>
          <input
            className="w-full px-3 py-2 border

           rounded-md"
            type="file"
            accept=".zip"
            multiple
            onChange={(e) => setAlbums([...e.target.files])}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Folders
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="file"
            webkitdirectory=""
            directory=""
            onChange={(e) => setFolders([...e.target.files])}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Categories
          </label>
          <div>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="audio"
                checked={selectedCategories.includes("audio")}
                onChange={() => handleCategoryChange("audio")}
              />
              <span className="ml-2">Audio</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="video"
                checked={selectedCategories.includes("video")}
                onChange={() => handleCategoryChange("video")}
              />
              <span className="ml-2">Video</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="photo"
                checked={selectedCategories.includes("photo")}
                onChange={() => handleCategoryChange("photo")}
              />
              <span className="ml-2">Photo</span>
            </label>
            <label className="inline-flex items-center text-[whitesmoke]">
              <input
                type="checkbox"
                value="text"
                checked={selectedCategories.includes("text")}
                onChange={() => handleCategoryChange("text")}
              />
              <span className="ml-2">Text</span>
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
