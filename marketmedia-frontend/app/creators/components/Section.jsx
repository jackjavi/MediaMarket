import React from "react";
import ProductForm from "./productForm";
import Image from "next/image";

const Section = () => {
  return (
    <section className="flex h-[85vh] ">
      <div className="flex md:w-[40vw] w-screen items-center justify-center">
        <div className="w-[70%] h-[85%] rounded-lg overflow-y-scroll no-scrollbar">
          <ProductForm />
        </div>
      </div>
      <div className="md:flex flex-col items-center w-[60vw] pt-[15vh] hidden">
        {/*<div>
          <h3 className="font-bold text-3xl max-w-[30vw]">
            Your One Stop shop for digital media
          </h3>
          <p className="text-lg max-w-[40vw]">
            Empower yourself by selling your product, accept payments globally
            and earn rewards. Get started
          </p>
  </div>*/}
        {/* THIS PART*/}
        <div className="pt-12 flex items-center justify-center">
          <div className="mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="300"
              height="200"
              viewBox="0 0 300 200"
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#9C00FF" stop-opacity="1" />
                  <stop offset="100%" stop-color="#00B4FF" stop-opacity="1" />
                </linearGradient>
                <pattern
                  id="pattern"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  patternUnits="objectBoundingBox"
                >
                  <image
                    href="https://example.com/path/to/image.jpg"
                    width="300"
                    height="200"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grad)" />
              <circle cx="300" cy="200" r="160" fill="url(#pattern)" />
              <text
                x="50%"
                y="40%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#fff"
                font-size="48"
                font-family="Arial, sans-serif"
                transform="rotate(-15 300 200)"
              >
                One Stop
              </text>
              <text
                x="50%"
                y="55%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#fff"
                font-size="48"
                font-family="Arial, sans-serif"
                transform="rotate(15 300 200)"
              >
                Shop
              </text>
              <text
                x="50%"
                y="70%"
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#fff"
                font-size="28"
                font-family="Arial, sans-serif"
                transform="rotate(0 300 200)"
              >
                for Digital Downloads
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
