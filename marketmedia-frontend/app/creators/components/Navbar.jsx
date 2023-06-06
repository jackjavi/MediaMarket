"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const parsedUser = JSON.parse(localStorage.getItem("user"));

    if (userToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    if (parsedUser && parsedUser.profileImage) {
      setUser(parsedUser.profileImage);
    }
  }, []);

  if (user && user.length > 0) {
    console.log(user);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    // Additional logout logic if needed
  };

  const links = [
    {
      id: 1,
      link: "buy",
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
      link: "product",
    },
  ];

  return (
    <nav className="bg-purple-400 rounded-md flex justify-between items-center w-full h-[15vh]  text-[whitesmoke] px-[5vw] z-10">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold font-signature ml-2 cursor-pointer flex items-center justify-center">
          <Link href="/">
            <span className="bg-purple-300 rounded-full p-2 text-[teal] lg:text-5xl mr-2">
              MM
            </span>
          </Link>
        </h1>
        <h1 className="text-5xl text-[whitesmoke] hidden md:flex font-bold font-signature ml-2 cursor-pointer">
          <Link href="/">
            <span>MEDIA MARKET</span>
          </Link>
        </h1>
      </div>

      <ul className="hidden md:flex">
        <Link href="/product">
          <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
            Discover
          </li>
        </Link>

        <Link href="/dashboard">
          <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
            Dashboard
          </li>
        </Link>

        <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
          Blog
        </li>
        <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
          Buy
        </li>
        <Link href="/creators">
          <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
            Sell
          </li>
        </Link>
      </ul>

      <ul className="hidden md:flex items-center">
        {loggedIn ? (
          <div className="flex justify-center items-center">
            <li
              onClick={handleLogout}
              className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
            >
              Logout
            </li>
            <Link href="/dashboard">
              <div className="">
                {user && user.length > 0 ? (
                  <Image
                    src={user}
                    height={70}
                    width={70}
                    alt="Profile Picture"
                    className="rounded-full w-16 h-16 object-cover"
                  />
                ) : (
                  <FaUserCircle size={50} />
                )}
              </div>
            </Link>
          </div>
        ) : (
          <>
            <Link href="/login">
              <li className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
                Login
              </li>
            </Link>
            <Link href="/register">
              <li className="p-2 rounded-md bg-[whitesmoke] cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200">
                Sign Up
              </li>
            </Link>
          </>
        )}
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
              </Link>*/}
              {link}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
