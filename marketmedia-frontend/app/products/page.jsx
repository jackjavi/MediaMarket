"use client";

import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:8000/api/v1/products";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.log("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
