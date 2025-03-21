"use client";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define your images with the text overlay
  const images = [
    { src: "https://unsplash.com/photos/2f_8hzqjUjc", text: "This is Image 1" },
    { src: "https://www.pexels.com/photo/photo-of-a-woman-exercising-3807727/", text: "This is Image 2" },
    { src: "https://pixabay.com/photos/man-woman-fitness-trainers-4065869/", text: "This is Image 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Image container */}
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold p-4 text-center">
          {images[currentIndex].text}
        </div>

        {/* Left Arrow */}
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer opacity-75 hover:opacity-100"
          onClick={prevSlide}
        >
          &#8249;
        </div>

        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl cursor-pointer opacity-75 hover:opacity-100"
          onClick={nextSlide}
        >
          &#8250;
        </div>
      </div>
    </div>
  );
};

export default HomePage;
