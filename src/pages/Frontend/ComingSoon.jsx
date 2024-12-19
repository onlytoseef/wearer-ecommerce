import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import Soon from "../../assets/images/ComingSoon/Soon.svg";
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

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.img
        src={Soon}
        alt="Coming Soon"
        className="w-full h-64 object-cover mb-8 rounded-lg max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      <motion.h1
        className="text-5xl sm:text-[6rem] font-monster font-bold text-primary mb-6"
        variants={textVariants}
      >
        <span
          style={{
            WebkitTextStroke: "2px #425652",
            color: "transparent",
          }}
          className="font-monster"
        >
          Coming
        </span>{" "}
        {""}
        Soon
      </motion.h1>
      <motion.p
        className="text-lg font-monster md:text-xl text-primary text-center max-w-lg mb-8"
        variants={textVariants}
        transition={{ delay: 0.8 }}
      >
        We are working hard to bring you something amazing. Stay tuned for
        updates!
      </motion.p>
    </motion.div>
  );
};

export default ComingSoon;
