"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "pricing",
    },
    {
      id: 2,
      link: "features",
    },
    {
      id: 3,
      link: "blog",
    },
    {
      id: 4,
      link: "discover",
    },
  ];

  return (
    <div className=" flex z-10 justify-between items-center w-full h-[15vh] px-4 text-gray-700 bg-gray-200 fixed">
      <div>
        <h1 className="text-5xl font-bold font-signature ml-2 cursor-pointer">
          <Link to="home" smooth duration={500}>
            MEDIA MARKET
          </Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            <Link to={link} smooth duration={500}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="hidden md:flex items-center">
        <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
          login
        </li>
        <li className="p-2 rounded-md bg-[whitesmoke] cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
          Sign Up
        </li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gray-200 text-gray-700">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-2xl sm:text-3xl md:text-4xl shadow-md  w-full"
            >
              <Link
                onClick={() => setNav(!nav)}
                to={link}
                smooth
                duration={500}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
