import React from "react";

const ProductCategories = () => {
  return (
    <div className="bg-purple-400 rounded-md p-4 hidden h-[85vh] md:flex md:flex-col md:gap-2 justify-around ">
      <h2 className="text-xl  font-bold mb-2">Digital Media Products</h2>
      <div className="grid grid-rows-3 gap-4 items-center justify-center">
        {/* Add category cards */}
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg text-pink-500 font-semibold">Discover</h3>
          <p className="text-gray-600">
            Explore products in different Categories
          </p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg text-pink-500 font-semibold">Sell</h3>
          <p className="text-gray-600">
            Create, sell and earn rewards globally
          </p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg text-pink-500 font-semibold">Pricing</h3>
          <p className="text-gray-600">
            Checkout our awesome Pricing structure
          </p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg text-pink-500 font-semibold">Blog</h3>
          <p className="text-gray-600">Start your own blog section here</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
