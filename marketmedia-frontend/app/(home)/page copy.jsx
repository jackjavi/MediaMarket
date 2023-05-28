"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/products"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="mt-4 border shadow p-4 w-full rounded"
        >
          <div>
            {product.images.length > 0 && (
              <Link href={`/product/${product._id}`}>
                <a>
                  <Image
                    className="rounded-md"
                    src={product.images[0]} // Assuming the first image is used
                    alt={product.name}
                    width={400}
                    height={300}
                  />
                </a>
              </Link>
            )}

            <Link href={`/product/${product._id}`}>
              <a>
                <h4 className="mt-2 font-josefin text-2xl font-bold text-[#bcbe0c]">
                  {product.name}
                </h4>
              </a>
            </Link>

            <div className="flex items-center justify-between">
              <p className="mt-2 text-[#999] font-lora italic text-sm">
                {product.categories.join(", ")}
              </p>

              <p className="mt-2 text-[#999] font-lora italic text-sm">
                {product.price}
              </p>
            </div>

            <p className="mt-2 overflow-hidden font-valera text-sm leading-6 text-[#444]">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
