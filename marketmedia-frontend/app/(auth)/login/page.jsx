"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/app/creators/components/Navbar";
import Footer from "@/app/(home)/components/Footer";

const page = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (credentials.password.length < 6) {
      alert("Password should be at least 6 characters long");
      return;
    }

    // Perform login logic here
    const token = localStorage.getItem("token");
    const url = "https://www.jackjavi.tech/api/v1/auth/login";

    axios
      .post(url, credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Perform success logic here
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          router.push("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Perform error logic here
      });
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <main className="flex justify-center items-center h-[85vh]">
        <form
          className="w-full h-full shadow rounded flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="md:w-[40vw] w-[100vw] text-gray-500 flex flex-col items-center ">
            <h2 className="text-xl text-[whitesmoke] font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Log in
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default page;
