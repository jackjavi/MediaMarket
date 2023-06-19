"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/app/creators/components/Navbar";
import Footer from "@/app/(home)/components/Footer";
import Link from "next/link";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Login");
  const [error, setError] = useState(null); // Add error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loading) {
      setButtonText("Loading...");
    } else {
      setButtonText("Login");
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password.length < 6) {
      setError("Password must be at least 6 characters long"); // Set error message
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://www.jackjavi.tech/api/v1/auth/login",
        credentials // Send credentials instead of user
      );

      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      setError("Incorrect email/password combination"); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <NavBar />
      <main className="flex flex-col justify-center items-center h-[85vh]">
        <p className="bg-orange-300 w-full text-center p-2 text-sm lg:text-md">
          Craete an account?
          <Link href="/register">
            <span className="font-lora ml-2 text-[teal] italic cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
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
            {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
            {/* Display error message */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading} // Disable the button when loading
            >
              {buttonText}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
