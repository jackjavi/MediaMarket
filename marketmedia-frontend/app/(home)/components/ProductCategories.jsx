import React from "react";

const ProductCategories = () => {
  return (
    <div className="bg-purple-400 rounded-md p-4  h-[85vh]">
      <h2 className="text-xl  font-bold mb-2">Digital Product Categories</h2>
      <div className="grid grid-rows-3 gap-4 items-center justify-center">
        {/* Add category cards */}
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg font-semibold">Category 1</h3>
          <p className="text-gray-600">Explore products in Category 1</p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg font-semibold">Category 2</h3>
          <p className="text-gray-600">Discover products in Category 2</p>
        </div>
        <div className="bg-white rounded-md p-4">
          <h3 className="text-lg font-semibold">Category 3</h3>
          <p className="text-gray-600">Browse products in Category 3</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
