"use client";

import React from "react";
import { useRouter } from "next/navigation";

const CategoriesComponent = ({ setCategory }) => {
  const router = useRouter();
  const handleCategory = (category) => {
    // Update the URL query parameter with the modified category
    setCategory(category);
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
    <div className="text-sm sm:text-md md:text-lg font-bold h-full w-full flex flex-wrap items-center justify-between gap-2">
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("All")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        All
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("3D")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        3D
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Education")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Education
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Design")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Design
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Business+and+Money")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Business and Money
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Films")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Films
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Fitness+and+Health")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Fitness and Health
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Fiction+Books")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Fiction Books
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("audio")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Audio
      </button>
      <button
        style={{ color: getRandomColor() }}
        onClick={() => handleCategory("Comics+and+Graphic+Novels")}
        className="cursor-pointer hover:scale-105 duration-200"
      >
        Comics and Graphic Novels
      </button>
    </div>
  );
};

export default CategoriesComponent;
