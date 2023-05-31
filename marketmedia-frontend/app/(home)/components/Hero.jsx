"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { lora, mono } from "../../fonts/fonts";

const Hero = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    router.push("/creators");
  };

  return (
    <section
      style={{
        backgroundImage: `url('/mediamarketHero.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        position: "relative",
      }}
      className="hero  md:block"
    >
      <div
        className="bg-hero-overlay absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      ></div>
      <div className="bg-hero-image h-[85vh] flex justify-center items-center relative">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4 font-mono">
            Your One-stop shop for digital media downloads.
          </h1>
          <p className="text-xl font-lora">
            Empower yourself by creating and selling unique digital products.
            Let's go and make something awesome!
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
