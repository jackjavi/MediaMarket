"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const images = [
    "/mediamarketHero2.jpg",
    "/mediamarketHero3.jpg",
    "/mediamarketHero4.jpg",

    "/mediamarketHero5.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 20000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = () => {
    setIsLoading(true);
    const userToken = JSON.parse(localStorage.getItem("token"));

    if (userToken) {
      setLoggedIn(true);
      router.push("/creators");
    } else {
      setLoggedIn(false);
      router.push("/register");
    }
  };

  return (
    <section
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        position: "relative",
        transition: "background-image 1.5s ease-in-out",
      }}
      className="hero md:block"
    >
      <div
        className="bg-hero-overlay absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      ></div>
      <div className="bg-hero-image h-[85vh] flex justify-center items-center relative rounded-md">
        <div className="text-center text-white px-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 font-lora text-white sticky top-0 z-0">
            Your One-stop shop for digital media downloads.
          </h1>
          <p className="text-md md:text-xl text-white font-lora">
            Empower yourself by creating and selling unique digital products.
            Let&apos;s go and make something awesome!
          </p>
          <button
            onClick={handleButtonClick}
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Get Started"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
