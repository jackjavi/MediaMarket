import React from "react";
import ProductForm from "./productForm";

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
        <div className="pt-12">
          {/* SVG Art */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="200"
            viewBox="0 0 50 300"
          >
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#ff0080", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#8000ff", stopOpacity: 1 }}
                />
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
                  width="400"
                  height="300"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad)" />
            <circle cx="200" cy="150" r="100" fill="url(#pattern)" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#fff"
              fontSize="32"
            >
              Create Something Beautiful
            </text>
          </svg>
          {/* End of SVG Art */}
        </div>
      </div>
    </section>
  );
};

export default Section;
