"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/app/creators/components/Navbar";
import Loading from "../components/Loading";

const page = () => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full  bg-gray-200">
      <NavBar />
      <div className=" pt-12 h-[85vh] flex flex-col w-[90vw] m-auto gap-4">
        <div className=" flex-[12] flex justify-center pt-20 h-full overflow-auto no-scrollbar">
          <div className="flex flex-col items-center">
            <img
              className="rounded-md h-[40%] w-full object-cover"
              src={product.images}
              alt=""
            />

            <h4 className="text-center font-lora text-[20px] font-bold cursor-pointer">
              {product.name}
            </h4>

            <p className="py-4 gap-20 text-[16px] font-valera text-[#b39656]">
              Author: <b>{product.createdBy}</b>
            </p>

            <p className="font-lora text-[16px] w-[90%] md:w-[50%] leading-8 text-[#666] first-letter:text-[30px] first-letter:ml-[20px] first-letter:font-semibold">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
