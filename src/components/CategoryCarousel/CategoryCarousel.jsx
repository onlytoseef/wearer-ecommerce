import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const categories = [
  {
    id: 1,
    title: "Track Suits",
    image:
      "https://plus.unsplash.com/premium_photo-1689371958614-cd30635630ef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Hoodie",
    image:
      "https://images.unsplash.com/photo-1616430286685-d11d259848b9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "T-Shirts",
    image:
      "https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Caps",
    image:
      "https://plus.unsplash.com/premium_photo-1675989087109-f8a00bfea7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CategoryCarousel = () => {
  return (
    <div className="flex justify-center items-center   overflow-hidden">
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
            className="flex-none w-48 h-48  md:w-64 md:h-64 rounded-full shadow-lg snap-center bg-white p-4 flex flex-col items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
