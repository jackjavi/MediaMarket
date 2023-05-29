"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/app/creators/components/Navbar";
import Loading from "./components/Loading";

const page = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { slug } = router.query;

        // Fetch the product from the backend using the imageId
        const res = await axios.get(
          `http://localhost:8000/api/v1/products/${slug}`
        );
        setProduct(res.data);
        console.log(product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [router.query]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="h-full w-full  bg-gray-200">
      <NavBar />
      <div className="pt-24 flex flex-col w-[90vw] m-auto gap-4">
        <div className="scrollbar scrollbar-hide flex-[12] flex justify-center pt-20 h-screen overflow-auto">
          <div className="flex flex-col items-center">
            <img
              className="rounded-md h-[300px] w-full object-cover"
              src={product.photo}
              alt=""
            />

            <h4 className="text-center font-lora text-[20px] font-bold cursor-pointer">
              {product.title}
            </h4>

            <p className="py-4 gap-20 text-[16px] font-valera text-[#b39656]">
              Author: <b>{product.username}</b>
            </p>

            <p className="font-lora text-[16px] w-[90%] md:w-[50%] leading-8 text-[#666] first-letter:text-[30px] first-letter:ml-[20px] first-letter:font-semibold">
              {product.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
