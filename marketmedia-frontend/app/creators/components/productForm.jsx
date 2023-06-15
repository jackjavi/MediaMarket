"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Preview from "./Preview";
import { useRouter } from "next/navigation";
import { FaToggleOff } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";
import imageCompression from "browser-image-compression";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const compressProductFile = async (file) => {
    // Compress the image
    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 20,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedProductFile = await imageCompression(file, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedProductFile instanceof Blob
      ); // true
      console.log(
        `compressedProductFile size ${
          compressedProductFile.size / 1024 / 1024
        } MB`
      ); // smaller than maxSizeM
    } catch (error) {
      console.log(error);
    }
  };

  const compressImage = async (image) => {
    // Compress the image
    console.log("originalFile instanceof Blob", image instanceof Blob); // true
    console.log(`originalFile size ${image.size / 1024 / 1024} MB`);
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      console.log(
        "compressedFile instanceof Blob",
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeM
    } catch (error) {
      console.log(error);
    }
  };

  const setProductPrice = () => {
    if (toggle) {
      setPrice("0");
    }
  };

  const handleCategoryChange = (category) => {
    // Check if the category is already selected
    if (selectedCategories.includes(category)) {
      // Remove the category from the selected categories
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // Add the category to the selected categories
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const sendProducts = () => {
    // Your code to send the completeProduct to the backend
    const token = localStorage.getItem("token");
    let parsedImageUrls;
    let parsedProductUrls;
    const storedImageUrls = localStorage.getItem("imageUrls");
    if (storedImageUrls) {
      parsedImageUrls = JSON.parse(storedImageUrls);
    }
    const storedProductUrls = localStorage.getItem("fileUrls");
    if (storedProductUrls) {
      parsedProductUrls = JSON.parse(storedProductUrls);
    }

    let completeProductWithUrls = {
      name: productName,
      description: description,
      price: price,
      images: parsedImageUrls,
      videos: parsedProductUrls ? parsedProductUrls : videos,
      categories: selectedCategories,
    };

    // Send the completeProductWithUrls to the backend
    axios
      .post(
        "https://www.jackjavi.tech/api/v1/products",
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
        router.push("/");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error sending product:", error);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setProductPrice();
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append images
      if (images) {
        images.forEach((image) => {
          compressImage(image);
          formData.append("files", image);
        });
        const imageResponse = await axios.post(
          "https://www.jackjavi.tech/api/v1/upload/image",
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
          console.log(imageUrls);
          formData.delete("files");

          // Append videos
          if (videos) {
            videos.forEach((productFile) => {
              compressProductFile(productFile);
              formData.append("files", productFile);
            });

            const videoResponse = await axios.post(
              "https://www.jackjavi.tech/api/v1/video",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(token)}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (videoResponse.data) {
              const productUrls = videoResponse.data.map((file) => file.url); // Extract the URLs from the response data
              // Store imageUrls in localStorage
              localStorage.setItem("fileUrls", JSON.stringify(productUrls));
              sendProducts();
            }
          }
          // Modify the sendProducts function

          // Call the sendProducts function
        }
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

      if (form) {
        const formRect = form.getBoundingClientRect();
        const topDistance = formRect.top;

        if (topDistance <= 0) {
          setShowPreview(true);
        } else {
          setShowPreview(false);
        }
      }
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
            disabled={toggle} // Disable the input when toggle is on
          />

          <div className="relative h-6 ">
            <div>
              <span className="absolute bottom-0">
                {toggle ? (
                  <FaToggleOn
                    onClick={() => setToggle((prev) => !prev)}
                    size={20}
                    color="teal"
                  />
                ) : (
                  <FaToggleOff
                    onClick={() => setToggle((prev) => !prev)}
                    size={20}
                    color="purple"
                  />
                )}
              </span>
            </div>
            <div className="ml-8 text-purple-500">Set free</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Images
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
            type="file"
            accept="image/*"
            required
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-[whitesmoke]">
            Product Files - All types
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md border-purple-400 outline-purple-400"
            type="file"
            accept="*"
            required
            multiple
            onChange={(e) => setVideos([...e.target.files])}
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
                value="3D"
                checked={selectedCategories.includes("3D")}
                onChange={() => handleCategoryChange("3D")}
              />
              <span className="ml-2">3D</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="Business and Money"
                checked={selectedCategories.includes("Business and Money")}
                onChange={() => handleCategoryChange("Business and Money")}
              />
              <span className="ml-2">Business and Money</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="Design"
                checked={selectedCategories.includes("Design")}
                onChange={() => handleCategoryChange("Design")}
              />
              <span className="ml-2">Design</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="audio"
                checked={selectedCategories.includes("Education")}
                onChange={() => handleCategoryChange("Education")}
              />
              <span className="ml-2">Education</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="Fitness and Health"
                checked={selectedCategories.includes("Fitness and Health")}
                onChange={() => handleCategoryChange("Fitness and Health")}
              />
              <span className="ml-2">Fitness and Health</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="Films"
                checked={selectedCategories.includes("Films")}
                onChange={() => handleCategoryChange("Films")}
              />
              <span className="ml-2">Films</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="Fictin Books"
                checked={selectedCategories.includes("Fictin Books")}
                onChange={() => handleCategoryChange("Fictin Books")}
              />
              <span className="ml-2">Fictin Books</span>
            </label>
            <label className="inline-flex items-center mr-4 text-[whitesmoke]">
              <input
                type="checkbox"
                value="Comics and graphic Novels"
                checked={selectedCategories.includes(
                  "Comics and graphic Novels"
                )}
                onChange={() =>
                  handleCategoryChange("Comics and graphic Novels")
                }
              />
              <span className="ml-2">Comics and graphic Novels</span>
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

              selectedCategories,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductForm;
