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
        const url = `http://localhost:8000/api/v1/products/${slug}`;

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

  // Function to update the cart
  const updateCart = () => {
    if (product) {
      const itemExists = cartItems.some((item) => item.id === product.id);

      if (itemExists) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } else {
        const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }
    }
  };

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
          </div>
        </div>
      </div>
      <Cart
        cartItems={cartItems}
        updateCart={updateCart}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
};

export default Page;
