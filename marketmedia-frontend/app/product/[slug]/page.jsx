"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "@/app/creators/components/Navbar";
import Loading from "../components/Loading";
import Cart from "./components/Cart";
import Image from "next/image";

const Page = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Retrieve cart items from localStorage on component mount
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const getProduct = async () => {
      try {
        // Retrieve the slug value from localStorage
        const slugJson = localStorage.getItem("slug");
        // Check if the slug exists before proceeding
        if (!slugJson) {
          // Handle the case when the slug is undefined
          return;
        }
        // Parse the JSON string to get the original slug value
        const slug = JSON.parse(slugJson);
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect or handle the case when the token is not available
          return;
        }
        const url = `https://www.jackjavi.tech/api/v1/products/${slug}`;

        // Fetch the product from the backend using the slug
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        });
        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, []);

  const removeItem = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const updateQuantity = (item, quantity) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem === item) {
        return { ...cartItem, quantity: parseInt(quantity) };
      }
      return cartItem;
    });

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleDownload = (fileUrl) => {
    // Perform download logic here
    // For example, you can create a download link and simulate a click to trigger the download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = getFileNameFromUrl(fileUrl); // Extract the filename from the URL
    link.target = "_blank";
    link.click();
  };

  const getFileNameFromUrl = (url) => {
    const startIndex = url.lastIndexOf("/") + 1;
    const filename = url.substr(startIndex);
    return decodeURIComponent(filename);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full bg-gray-200">
      <NavBar />
      <div className="pt-12 h-[85vh] flex flex-col w-[90vw] m-auto gap-4">
        <div className="flex-[12] flex justify-center pt-20 h-full overflow-auto no-scrollbar">
          <div className="flex flex-col items-center">
            {product && product.images && product.images.length > 0 && (
              <Image
                className="rounded-md h-[40%] w-full object-cover object-top"
                src={product.images[0]}
                alt={product.name}
                width={200}
                height={200}
              />
            )}

            <h4 className="text-center font-lora text-[20px] font-bold cursor-pointer">
              {product && product.name}
            </h4>

            <p className="py-4 gap-20 text-[16px] font-valera text-[#b39656]">
              Author: <b>{product && product.createdBy}</b>
            </p>

            <p className="font-lora text-[16px] w-[90%] md:w-[50%] leading-8 text-[#666] first-letter:text-[30px] first-letter:ml-[20px] first-letter:font-semibold">
              {product && product.description}
            </p>

            {product && product.videos && product.videos.length > 0 && (
              <div className="mt-8">
                <h4 className="text-center font-lora text-[20px] font-bold cursor-pointer">
                  Files
                </h4>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {product.videos.map((file, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-purple-400 rounded-md p-4"
                    >
                      {getFileIcon(file.type)}
                      <p>{file.type}</p>
                      <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleDownload(file)}
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Cart
        cartItems={cartItems}
        product={product}
        setCartItems={setCartItems}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

const getFileIcon = (fileType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 object-contain"
      alt={fileType}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
};

export default Page;
