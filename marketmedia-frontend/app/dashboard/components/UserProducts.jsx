"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Link from "next/link";
import Image from "next/image";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // Fetch products logic
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          setUser(user);
        }
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect or handle the case when the token is not available
          return;
        }

        let url;
        if (user) {
          url = `http://localhost:8000/api/v1/products?userId=${user._id}`;
        } else {
          url = `http://localhost:8000/api/v1/products`;
        }
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

  return (
    <main className=" h-full md:px-[5rem]  px-4">
      <div className="h-full overflow-y-scroll no-scrollbar">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Products mapping logic */}
          {products.map((product) => (
            <div
              key={product._id}
              className="mt-4 border-2 h-full border-blue-400 shadow-lg shadow-purple-400 p-4 w-full rounded"
              onClick={() => handleClick(product._id)}
            >
              <div>
                {product.images && product.images.length > 0 && (
                  <div className="h-[50vh]">
                    <Link href={`/product/${product._id}`}>
                      <Image
                        className="rounded-md  h-full object-cover object-top w-[100%]"
                        src={product.images[0]} // Assuming the first image is used
                        alt={product.name}
                        width={400}
                        height={300}
                      />
                    </Link>
                  </div>
                )}
                <div
                  style={{ backgroundColor: getRandomColor() }}
                  className=" rounded-md h-[20vh] shadow-lg shadow-blue-400"
                >
                  <Link href={`/product/${product._id}`}>
                    <h4 className="mt-2 px-2 font-josefin text-2xl font-bold text-[whitesmoke]">
                      {product.name}
                    </h4>
                  </Link>

                  <div className="flex items-center justify-between px-2">
                    <p className="mt-2 text-[whitesmoke] font-lora italic text-sm">
                      {product.categories.join(", ")}
                    </p>

                    <p className="mt-2 text-[whitesmoke]  font-lora italic text-sm">
                      {product.price || "Free"}
                    </p>
                  </div>

                  <p className="mt-2 px-2 overflow-hidden font-valera text-sm leading-6 text-[whitesmoke] ">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
