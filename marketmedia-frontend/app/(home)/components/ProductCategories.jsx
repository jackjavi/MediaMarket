"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const ProductCategories = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem("user"));

    if (parsedUser) {
      setUser(user);
    }
  }, []);
  return (
    <div className="bg-purple-400 rounded-md p-4 hidden h-[85vh] md:flex md:flex-col md:gap-2 justify-around ">
      <h2 className="text-xl  font-bold mb-2">Digital Media Products</h2>
      <div className="grid grid-rows-3 gap-4 items-center justify-center">
        {/* Add category cards */}
        <div className="bg-white rounded-md p-4">
          <Link href={user ? "/product" : "/register"}>
            <h3 className="text-md 2xl:text-lg cursor-pointer font-lora text-pink-500 font-semibold">
              Discover
            </h3>
          </Link>

          <p className="text-gray-600 text-sm 2xl:text-md">
            Explore products in different Categories
          </p>
        </div>
        <div className="bg-white rounded-md p-4">
          <Link href={user ? "/creators" : "/register"}>
            <h3 className="ttext-md 2xl:text-lg cursor-pointer text-pink-500 font-semibold">
              Sell
            </h3>
          </Link>

          <p className="text-gray-600 text-sm 2xl:text-md">
            Create, sell and earn rewards globally
          </p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-md 2xl:text-lg cursor-pointer text-pink-500 font-semibold">
            Pricing
          </h3>
          <p className="text-gray-600 text-sm 2xl:text-md">
            Checkout our awesome Pricing structure
          </p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-md 2xl:text-lg cursor-pointer text-pink-500 font-semibold">
            Blog
          </h3>
          <p className="text-gray-600 text-sm 2xl:text-md">
            Start your own blog section here
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
