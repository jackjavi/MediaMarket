"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/app/creators/components/Navbar";
import Footer from "@/app/(home)/components/Footer";
import Link from "next/link";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Register");
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      setButtonText("Loading...");
    } else {
      setButtonText("Register");
    }
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://www.jackjavi.tech/api/v1/auth/register",
        user
      );

      if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      router.push("/login");
    }
  };

  return (
    <div>
      <NavBar />
      <main className="flex flex-col justify-center items-center h-screen">
        <p className="bg-orange-300 w-full text-center p-2 text-sm lg:text-md">
          Already a member?{" "}
          <Link href="/login">
            <span className="font-lora text-[teal] italic cursor-pointer">
              Login
            </span>
          </Link>
        </p>

        <form
          className="w-full h-full p-4 shadow text-gray-500 rounded flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="md:w-[40vw] w-[100vw] flex flex-col items-center ">
            <h2 className="text-xl text-[whitesmoke] font-bold mb-4">
              Register
            </h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded px-2 py-1"
                value={user.email}
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
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
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

export default Register;
