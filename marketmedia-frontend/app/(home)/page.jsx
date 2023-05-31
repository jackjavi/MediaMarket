import React from "react";
import NavBar from "../creators/components/Navbar";
import Post from "./components/post";
import Hero from "./components/Hero";
import ProductCategories from "./components/ProductCategories";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

const page = () => {
  return (
    <>
      <main>
        <NavBar />
        <Hero />

        <div className="h-screen pt-8 grid grid-cols-1 md:grid-cols-4 gap-4 px-[5vw] border-b-2 shadow-lg shadow-purple-800 border-b-purple-900">
          <div className="md:col-span-3">
            <Post />
          </div>
          <div className="md:col-span-1 pt-4 ">
            <ProductCategories />
          </div>
        </div>
        <Categories />
      </main>
      <Footer />
    </>
  );
};

export default page;
