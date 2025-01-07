import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Track Suits",
    image: "https://cdn-icons-png.flaticon.com/256/15409/15409235.png",
    link: "/productPage",
  },
  {
    id: 2,
    title: "Hoodie",
    image: "https://cdn-icons-png.flaticon.com/256/6241/6241670.png",
    link: "/upcoming",
  },
  {
    id: 3,
    title: "T-Shirts",
    image: "https://cdn-icons-png.flaticon.com/256/3793/3793341.png",
    link: "/upcoming",
  },
  {
    id: 4,
    title: "Caps",
    image: "https://cdn-icons-png.flaticon.com/256/2806/2806254.png",
    link: "/upcoming",
  },
];

const CategoryCarousel = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (link) => {
    navigate(link);
  };

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <motion.div
        className="flex gap-4 overflow-x-auto snap-x py-10 snap-mandatory px-4 md:px-8 lg:px-16 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="flex-none w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg snap-center bg-white p-4 flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleCategoryClick(category.link)}
          >
            <div className="absolute inset-0 rounded-full py-5 ">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 0.8 }}
              ></motion.div>
            </div>
            <h3 className="text-xl font-semibold text-white z-10">
              {category.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryCarousel;
