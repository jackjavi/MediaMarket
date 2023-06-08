import React from "react";
import NavBar from "../creators/components/Navbar";
import Post from "./components/post";
import Hero from "./components/Hero";
import ProductCategories from "./components/ProductCategories";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <main className=" h-full">
        <Hero />

        <div className="h-screen pt-8 grid grid-cols-1 md:grid-cols-4 gap-4 px-[5vw] border-b-2 shadow-lg shadow-purple-800 border-b-purple-900">
          <div className="md:col-span-3 flex items-center justify-center">
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
                dominant-baseline="middle"
                text-anchor="middle"
                fill="#fff"
                font-size="32"
                font-family="Arial, sans-serif"
                font-weight="bold"
                stroke="#000"
                stroke-width="1"
              >
                Create Something Beautiful
              </text>
            </svg>
          </div>
          <div className="md:col-span-1 pt-4 ">
            <ProductCategories />
          </div>
        </div>
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
