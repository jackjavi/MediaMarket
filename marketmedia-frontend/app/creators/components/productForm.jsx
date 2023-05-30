"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Preview from "./Preview";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(null);
  const [cloudImages, setCloudImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [cloudVideos, setCloudVideos] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [cloudAlbums, setCloudAlbums] = useState(null);
  const [audio, setAudio] = useState(null);
  const [cloudAudio, setCloudAudio] = useState(null);
  const [folders, setFolders] = useState(null);
  const [cloudFolders, setCloudFolders] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append videos
      if (videos) {
        videos.forEach((video) => {
          formData.append("files", video);
        });

        const videoResponse = await axios.post(
          "http://localhost:8000/api/v1/video",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCloudVideos([videoResponse.data]);
        console.log(cloudVideos);
      }

      // Append images
      if (images) {
        images.forEach((image) => {
          formData.append("files", image);
        });
        const imageResponse = await axios.post(
          "http://localhost:8000/api/v1/upload/image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (imageResponse.data) {
          const imageUrls = imageResponse.data.map((image) => image.url); // Extract the URLs from the response data
          // Store imageUrls in localStorage
          localStorage.setItem("imageUrls", JSON.stringify(imageUrls));

          // Modify the sendProducts function
          const sendProducts = () => {
            // Your code to send the completeProduct to the backend
            const token = localStorage.getItem("token");
            let parsedImageUrls;
            const storedImageUrls = localStorage.getItem("imageUrls");
            if (storedImageUrls) {
              parsedImageUrls = JSON.parse(storedImageUrls);
              setCloudImages(parsedImageUrls);
            }

            let completeProductWithUrls = {
              name: productName,
              description: description,
              price: price,
              images: parsedImageUrls,
              videos: cloudVideos,
              albums: cloudAlbums,
              folders: cloudFolders,
              categories: selectedCategories,
            };
            setProduct(completeProductWithUrls);

            // Send the completeProductWithUrls to the backend
            axios
              .post(
                "http://localhost:8000/api/v1/products",
                completeProductWithUrls,
                {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                  },
                }
              )
              .then((response) => {
                // Handle the response from the backend
                console.log("Product sent successfully:", response.data);
                setLoading(false);
              })
              .catch((error) => {
                // Handle errors
                console.error("Error sending product:", error);
                setLoading(false);
              });
          };

          sendProducts(); // Call the sendProducts function
        }
      }

      // Append albums
      if (audio) {
        audio.forEach((aud) => {
          formData.append("files", aud);
        });

        const audioResponse = await axios.post(
          "http://localhost:8000/api/v1/audio",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCloudAudio([audioResponse.data]);
        console.log(cloudAudio);
      }

      // Append folders
      if (folders) {
        folders.forEach((folder) => {
          formData.append("files", folder);
        });
        const folderResponse = await axios.post(
          "http://localhost:8000/api/v1/upload/folder",
          formData,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCloudFolders(folderResponse.data);
        console.log(cloudFolders);
      }

      // Set loading state to false after upload
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false); // Set loading state to false in case of error
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const form = document.getElementById("product-form");
      const formRect = form.getBoundingClientRect();
      const topDistance = formRect.top;

      if (topDistance <= 0) {
        setShowPreview(true);
      } else {
        setShowPreview(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto mt-8 p-2">
      <form
        id="product-form"
        onSubmit={handleSubmit}
        className="text-gray-700 "
      >
        <div className="mb-4">
          <label
            className="block mb-2 font-bold text-[whitesmoke]"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            className="w-full px-3 py-2 border border-purple-400 outline-purple-400 rounded-md"
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
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
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
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
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
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
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
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
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
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
            type="file"
            accept=".zip, audio/*"
            multiple
            onChange={(e) => {
              const selectedFiles = e.target.files;
              const audioFiles = Array.from(selectedFiles).filter((file) =>
                file.type.startsWith("audio/")
              );
              const zipFiles = Array.from(selectedFiles).filter(
                (file) => file.type === "application/zip"
              );
              setAlbums([...zipFiles]);
              setAudio([...audioFiles]); // Store selected audio files in the audio state
              // Process zipFiles as needed
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Folders
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
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

        <div className="mb-8">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>

      {!showPreview && (
        <div className="sticky bottom-4 right-4">
          <Preview
            product={{
              productName,
              description,
              price,
              images,
              videos,
              albums,
              folders,
              selectedCategories,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductForm;
