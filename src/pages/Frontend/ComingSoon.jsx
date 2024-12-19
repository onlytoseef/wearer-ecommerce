import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const ComingSoon = () => {
  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-white mb-6"
        variants={textVariants}
      >
        Coming Soon
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-white text-center max-w-lg mb-8"
        variants={textVariants}
        transition={{ delay: 0.8 }}
      >
        We are working hard to bring you something amazing. Stay tuned for
        updates!
      </motion.p>
      <motion.button
        className="px-6 py-3 text-lg font-medium text-indigo-600 bg-white rounded-full shadow-md hover:shadow-lg focus:outline-none"
        variants={buttonVariants}
        whileHover="hover"
      >
        Notify Me
      </motion.button>
    </motion.div>
  );
};

export default ComingSoon;
