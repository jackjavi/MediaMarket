"use client";

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

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
    <div className=" flex  z-10 justify-between items-center w-full h-[15vh] px-[5vw] text-[whitesmoke]fixed">
      <div>
        <h1 className="text-5xl font-bold font-signature ml-2 cursor-pointer">
          <Link href="/">MEDIA MARKET</Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            {link}
          </li>
        ))}
      </ul>
      <ul className="hidden md:flex items-center">
        <Link href="/login">
          <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
            login
          </li>
        </Link>
        <Link href="register">
          <li className="p-2 rounded-md bg-[whitesmoke] cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
            Sign Up
          </li>
        </Link>
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
              {/*<Link
                onClick={() => setNav(!nav)}
                href={link}
                smooth
                duration={500}
              >
                {link}
          </Link>*/}{" "}
              {link}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
