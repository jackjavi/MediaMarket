"use client";

import React from "react";
import NavBar from "../creators/components/Navbar";
import Post from "./components/post";

const page = () => {
  return (
    <main>
      <NavBar />
      <Post />
    </main>
  );
};

export default page;
