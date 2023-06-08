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
      link: "Discover",
      href: "/product",
    },
    {
      id: 2,
      link: "Dashboard",
      href: "/dashboard",
    },
    {
      id: 3,
      link: "Sell",
      href: "/creators",
    },
    {
      id: 4,
      link: "login",
      href: "/login",
    },
    {
      id: 5,
      link: "Sign Up",
      href: "/register",
    },
  ];

  return (
    <nav className="bg-purple-400 flex justify-between items-center w-full h-[15vh]  text-[whitesmoke] px-[5vw] z-10">
      <div className="flex items-center justify-center">
        <h1 className="text-5xl font-bold font-signature ml-2 cursor-pointer flex items-center justify-center">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="200"
              height="200"
            >
              <path
                d="M45 110C45 90 60 75 80 75C100 75 115 90 115 110V135H85V110H95V105C95 100 91 95 86 95C81 95 77 100 77 105V110H45V135H75V110H45Z"
                fill="purple"
              />
              <path
                d="M135 110C135 90 120 75 100 75C80 75 65 90 65 110V135H95V110H85V105C85 100 89 95 94 95C99 95 103 100 103 105V110H135V135H105V110H135Z"
                fill="purple"
              />
              <path d="M75 125H125V135H75V125Z" fill="white" />
            </svg>
          </Link>
        </h1>
        <h1 className=" text-[whitesmoke] hidden md:flex font-bold font-signature cursor-pointer">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 40"
              width="250"
              height="50"
            >
              <text
                x="0"
                y="30"
                font-size="20"
                fill="purple"
                font-family="Arial, sans-serif"
                font-weight="bold"
              >
                MEDIA MARKET
              </text>
            </svg>
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
        className="cursor-pointer pr-4 z-50 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 z-50 w-full h-screen bg-gray-200 text-gray-700">
          {links.map(({ id, link, href }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-2xl sm:text-3xl md:text-4xl shadow-md  w-full"
            >
              <Link onClick={() => setNav(!nav)} href={href}>
                {link}
              </Link>
              {link}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
