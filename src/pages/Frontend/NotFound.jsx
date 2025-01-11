import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import NoFound from "../../assets/images/NotFound/NoFound.svg";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center overflow-hidden">
      <Helmet>
        <title>404 Not Found</title>
        <meta name="description" content="This page contains error 404" />
      </Helmet>
      <motion.h1
        className="text-9xl font-extrabold text-gray-800 mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
      >
        <img width={500} src={NoFound} alt="" />
      </motion.h1>
      <motion.p
        className="text-2xl text-gray-600 font-monster mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>
      <Link to="/">
        <motion.div
          className="px-6 font-monster py-3 bg-primary text-white rounded-lg hover:bg-green-900 transition shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Go Back Home
        </motion.div>
      </Link>
    </div>
  );
};

export default NotFound;
