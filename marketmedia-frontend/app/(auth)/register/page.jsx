"use client";

import React, { useState } from "react";
import axios from "axios";

const page = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform registration logic here
    const res = await axios.post(
      "http://localhost:8000/api/v1/auth/register",
      user
    );
    console.log(res.data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full h-full p-4 shadow text-gray-500 rounded flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <div className="md:w-[40vw] w-[100vw] flex flex-col items-center ">
          <h2 className="text-xl text-[whitesmoke] font-bold mb-4">Register</h2>
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 "
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
