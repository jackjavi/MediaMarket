"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-screen rounded-md bg-purple-400 mt-8 flex flex-col md:flex-row justify-between items-center font-shock">
      <div className="flex flex-col items-center md:items-end">
        <div className="flex justify-center items-center bg-white rounded-full p-2 text-blue-500 text-base md:text-3xl mb-4 md:mb-0">
          MM
        </div>
        <div className="flex flex-col items-center md:items-end mt-8 space-y-2">
          <Link className="text-purple-900 hover:text-purple-700" href="/">
            Home
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/portfolio"
          >
            Portfolio
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/process"
          >
            Our Process
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/design-team"
          >
            Our Design Team
          </Link>
          <Link
            className="text-purple-900 hover:text-purple-700"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start mt-8 md:mt-0">
        <div className="flex space-x-4 mb-4">
          <a
            href="https://www.facebook.com/mediamarketmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-3xl text-purple-900 hover:text-purple-700" />
          </a>
          <a
            href="https://www.twitter.com/mediamarketmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-3xl text-purple-900 hover:text-purple-700" />
          </a>
          <a
            href="https://www.instagram.com/mediamarketmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-3xl text-purple-900 hover:text-purple-700" />
          </a>
          <a
            href="https://www.youtube.com/mediamarketmm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-3xl text-purple-900 hover:text-purple-700" />
          </a>
        </div>
        <div className="text-purple-900 flex flex-col">
          <span>MM</span>
          <span>00100-Nairobi</span>
          <span>(+254) 708 313 804</span>
          <span>Monday - Friday</span>
          <span>8:00am to 5:00pm EAT</span>
          <Link href="/chat">
            <button className="font-shock bg-blue-400 px-4 py-2 text-lg text-white rounded-md hover:bg-amber-300">
              Let's Chat
            </button>
          </Link>
        </div>
        <div className="mt-8 text-purple-900 max-w-[90%]">
          Subscribe to our newsletter to get tips on how to grow the way you
          want.
          <form className="mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="rounded-md py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              type="submit"
              className="font-shock bg-blue-400 px-4 py-2 text-lg text-white rounded-md hover:bg-amber-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
