"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Post = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect or handle the case when the token is not available
          return;
        }

        const url = "http://localhost:8000/api/v1/products";

        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            if (response.data) {
              setProducts(response.data.products);
              console.log(response.data.products);
            }
          })
          .catch((error) => {
            console.error("Request failed:", error);
            // Perform error logic here
          });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClick = (slug) => {
    // Store the slug value in localStorage as a JSON string
    localStorage.setItem("slug", JSON.stringify(slug));
  };

  return (
    <div className="h-[85vh] px-[5vw] bg-purple-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="mt-4 border shadow p-4 w-full rounded"
            onClick={() => handleClick(product._id)}
          >
            <div>
              {product.images.length > 0 && (
                <Link href={`/product/${product._id}`}>
                  <Image
                    className="rounded-md h-[150px] md:h-[150px] object-cover w-[100%]"
                    src={product.images[0]} // Assuming the first image is used
                    alt={product.name}
                    width={400}
                    height={300}
                  />
                </Link>
              )}

              <Link href={`/product/${product._id}`}>
                <h4 className="mt-2 font-josefin text-2xl font-bold text-[#bcbe0c]">
                  {product.name}
                </h4>
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
    </div>
  );
};

export default Post;
