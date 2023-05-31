"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Post = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const featuredSellersRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products logic
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
      // ...
    };

    fetchProducts();
  }, []);

  const handleClick = (slug) => {
    // Handle click logic
    // Store the slug value in localStorage as a JSON string
    localStorage.setItem("slug", JSON.stringify(slug));
    // ...
  };

  const getRandomColor = () => {
    const colors = [
      "#F87171",
      "#FBBF24",
      "#FCD34D",
      "#34D399",
      "#60A5FA",
      "#A78BFA",
      "#F472B6",
      "#C084FC",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="bg-purple-200 h-[85vh] p-4 rounded-md mt-4">
      <div ref={featuredSellersRef} className="sticky top-0 z-10 h-[20%]">
        <h2 className="text-xl md:text-2xl lg:text-3xl p-4 text-blue-500 text-center font-bold font-lora mb-2">
          Featured Sellers
        </h2>
      </div>
      <div className="h-[80%] overflow-y-scroll no-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {/* Products mapping logic */}
          {products.map((product) => (
            <div
              key={product._id}
              className="mt-4 border-4 border-blue-400 shadow-lg shadow-purple-400 p-4 w-full rounded"
              onClick={() => handleClick(product._id)}
            >
              <div>
                {product.videos && product.videos.length > 0 ? (
                  <Link href={`/product/${product._id}`}>
                    <video
                      className="rounded-md h-[150px] md:h-[150px] object-cover w-[100%]"
                      controls
                    >
                      <source src={product.videos[0]} type="video/mp4" />
                      {/* Add additional source tags for different video formats if needed */}
                    </video>
                  </Link>
                ) : (
                  product.images.length > 0 && (
                    <Link href={`/product/${product._id}`}>
                      <Image
                        className="rounded-md shadow-md shadow-blue-400 h-[150px] md:h-[150px] object-cover object-top w-[100%]"
                        src={product.images[0]} // Assuming the first image is used
                        alt={product.name}
                        width={400}
                        height={300}
                      />
                    </Link>
                  )
                )}
                <div
                  style={{ backgroundColor: getRandomColor() }}
                  className=" rounded-md h-[100px] shadow-lg shadow-blue-400"
                >
                  <Link href={`/product/${product._id}`}>
                    <h4 className="mt-2 px-2 font-josefin text-2xl font-bold text-blue-400">
                      {product.name}
                    </h4>
                  </Link>

                  <div className="flex items-center justify-between px-2">
                    <p className="mt-2 text-blue-400 font-lora italic text-sm">
                      {product.categories.join(", ")}
                    </p>

                    <p className="mt-2 text-blue-400  font-lora italic text-sm">
                      {product.price}
                    </p>
                  </div>

                  <p className="mt-2 px-2 overflow-hidden font-valera text-sm leading-6 text-blue-400 ">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* ...
             ...
             ... */}
        </div>
      </div>
    </div>
  );
};

export default Post;
