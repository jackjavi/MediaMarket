"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please provide an email"); // Set error message
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://www.jackjavi.tech/api/v1/auth/subscribe",
        { email } // Send the email in the request body
      );

      console.log(res.data); // Handle the response as per your requirement

      // Clear the input field after successful submission
      setEmail("");
      setError(null);
    } catch (err) {
      console.log(err);
      setError("An error occurred"); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen md:px-[5rem] rounded-md bg-purple-400 mt-8 flex flex-col md:flex-row justify-between items-center font-shock">
      <div className="flex flex-col items-center md:items-end">
        <Link href="/">
          <div className="flex justify-center items-center bg-white rounded-full p-2 text-blue-500 text-base md:text-3xl mb-4 md:mb-0">
            MM
          </div>
        </Link>
        <div className="flex flex-col items-center md:items-end mt-8 space-y-2">
          <Link className="text-purple-900 hover:text-purple-700" href="/">
            Sell
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/creators"
          >
            Home
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/product"
          >
            Discover
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center md:items-start mt-8 md:mt-0">
        <div className="flex space-x-4 mb-4">
          <Link
            href="https://www.linkedin.com/in/jack-mtembete-b14350113/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-3xl text-purple-900 hover:text-purple-700" />
          </Link>
          <Link
            href="https://www.twitter.com/mediamarketmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-3xl text-purple-900 hover:text-purple-700" />
          </Link>
          <Link
            href="https://instagram.com/mediamarketapp?igshid=NTc4MTIwNjQ2YQ=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-3xl text-purple-900 hover:text-purple-700" />
          </Link>
          <Link
            href="https://youtube.com/@jackjavi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-3xl text-purple-900 hover:text-purple-700" />
          </Link>
        </div>
        <div className="text-purple-900 flex flex-col">
          <span>MM</span>
          <span>00100-Nairobi</span>
          <span>(+254) 708 313 804</span>
          <span>Monday - Friday</span>
          <span>8:00am to 5:00pm EAT</span>
          <Link href="/contact">
            <button className="font-shock bg-blue-400 px-4 py-2 text-lg text-white rounded-md hover:bg-amber-300">
              Let us Chat
            </button>
          </Link>
        </div>
        <div className="mt-8 text-purple-900 max-w-[90%]">
          Subscribe to our newsletter to get tips on how to grow the way you
          want.
          <form className="mt-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email"
              className="rounded-md py-2 px-4 mr-2 focus:outline-none"
              value={email}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="font-shock bg-blue-400 px-4 py-2 text-lg text-white rounded-md hover:bg-amber-300"
              disabled={loading} // Disable the button when loading
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Display error message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
