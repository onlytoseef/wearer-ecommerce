import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const slides = [
  {
    image:
      "https://i.pinimg.com/1200x/57/c1/9c/57c19c54ee1f91ff42b65a1699c11bc7.jpg",
    text: "Discover the latest fashion trends",
  },
  {
    image:
      "https://i.pinimg.com/1200x/57/c1/9c/57c19c54ee1f91ff42b65a1699c11bc7.jpg",
    text: "40% OFF FOR NOW",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-screen  overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={slides[currentIndex].image}
            className="absolute  w-full h-full "
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full brightness-50 h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2  font-secondary  -translate-x-1/2 -translate-y-1/2 text-primary  font-bold text-center px-4 md:text-6xl">
              <span
                style={{
                  WebkitTextStroke: "2px #ffffff",
                  color: "transparent",
                }}
                className="sm:text-[6rem] text-[5rem] text-white font-monster  p-3 rounded-3xl"
              >
                {slides[currentIndex].text.split(" ")[0]}
              </span>{" "}
              <span className="text-secondary sm:text-[4rem] text-[1.5rem]">
                {slides[currentIndex].text.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
              currentIndex === index ? "bg-white scale-125" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
