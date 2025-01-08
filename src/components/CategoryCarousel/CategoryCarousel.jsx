import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "",
    image:
      "https://i.pinimg.com/736x/be/9b/4b/be9b4b2dba47b9ff50d14885b7f5b15c.jpg",
    link: "/productPage",
  },
  {
    id: 2,
    title: "",
    image:
      "https://i.pinimg.com/736x/e8/33/3a/e8333a5e0f6061ce2403a3fc7598bbaa.jpg",
    link: "/upcoming",
  },
  {
    id: 3,
    title: "",
    image:
      "https://i.pinimg.com/736x/98/a1/3f/98a13f3db7841e8eef7d21060e7b51f7.jpg",
    link: "/upcoming",
  },
  {
    id: 4,
    title: "",
    image:
      "https://i.pinimg.com/736x/bf/a2/d0/bfa2d04056745a98795f59c791166f36.jpg",
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
