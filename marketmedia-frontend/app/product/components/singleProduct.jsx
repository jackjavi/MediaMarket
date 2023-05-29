import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Loading from "./Loading";

const SingleProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { productId } = router.query;
        alert(productId);

        // Fetch the product from the backend using the imageId
        const res = await axios.get(
          `http://localhost:8000/api/v1/products/${productId}`
        );
        setProduct(res.data);
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
  );
};

export default SingleProduct;
