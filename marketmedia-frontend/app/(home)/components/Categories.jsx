import React from "react";
import Image from "next/image";
import { lora, roboto_mono } from "../../fonts/fonts";

const Categories = () => {
  const productCards = [
    {
      id: 1,
      imgUrl: "/audio.jpg",
      title: "Audio",
      description: "Explore and purchase audio-related products.",
      tags: ["#music", "#soundeffects", "#creativecontent"],
    },
    {
      id: 2,
      imgUrl: "/3D.jpg",
      title: "3D",
      description: "Discover and buy stunning 3D models.",
      tags: ["#modeling", "#animation", "#visualization"],
    },
    {
      id: 3,
      imgUrl: "/business.jpg",
      title: "Business and Money",
      description:
        "Get resources to grow your business and manage your finances.",
      tags: ["#entrepreneurship", "#finance", "#startups"],
    },
    {
      id: 4,
      imgUrl: "/comics.jpg",
      title: "Comics and Graphic Novels",
      description: "Explore a world of comics and graphic novels.",
      tags: ["#comics", "#illustration", "#storytelling"],
    },
    {
      id: 5,
      imgUrl: "/design.jpg",
      title: "Design",
      description: "Find design assets and resources.",
      tags: ["#uiux", "#graphicdesign", "#creativity"],
    },
    {
      id: 6,
      imgUrl: "/education.jpg",
      title: "Education",
      description: "Discover educational materials and courses.",
      tags: ["#learning", "#teaching", "#knowledge"],
    },
    {
      id: 7,
      imgUrl: "/fiction.jpg",
      title: "Fiction Books",
      description: "Explore a collection of captivating fiction books.",
      tags: ["#novels", "#literature", "#reading"],
    },
    {
      id: 8,
      imgUrl: "/films.jpg",
      title: "Films",
      description: "Enjoy a selection of films and documentaries.",
      tags: ["#movies", "#cinema", "#entertainment"],
    },
    {
      id: 9,
      imgUrl: "/fitness.jpg",
      title: "Fitness and Health",
      description: "Discover fitness routines and health resources.",
      tags: ["#exercise", "#wellness", "#nutrition"],
    },
    // Add more category objects here...
  ];

  return (
    <section className="min-h-screen">
      {/* Looking for inspiration Section */}
      <div className="container mx-auto py-12">
        <h2 className="text-3xl text-blue-600 font-bold mb-6  text-center">
          Looking for inspiration on what you can sell?
        </h2>
        <p className="text-lg text-purple-500 mb-8 font-lora text-center">
          Discover the best-selling products and creators on MarketMedia.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Category Cards */}
          {productCards.map((productCard) => (
            <div
              key={productCard.id}
              className="bg-[whitesmoke] rounded-lg shadow-lg shadow-purple-400s p-6"
            >
              <Image
                className="rounded-md shadow-md shadow-purple-400 h-[150px]  md:h-[150px] object-cover w-[100%]"
                src={productCard.imgUrl}
                width={100}
                height={100}
                alt={productCard.title + " Category"}
              />
              <div className="bg-blue-400 rounded-md p-4">
                <h3 className="Lora text-xl text-blue-900 font-semibold mb-2">
                  {productCard.title}
                </h3>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                  className="text-[whitesmoke] {lora.className}"
                >
                  {productCard.description}
                </p>
                <div className="flex items-center mt-4">
                  <span className="text-xs text-gray-500">Tags: </span>
                  {productCard.tags.map((tag) => (
                    <span key={tag} className="text-xs text-blue-500 ml-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
