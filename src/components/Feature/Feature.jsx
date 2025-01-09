import React from "react";
import BlackHoodie from "../../assets/images/product/WhiteHoodieFront.svg";
import WhiteHoodie from "../../assets/images/product/BlackHoodieBack.svg";
import { motion } from "framer-motion";
import ProductCard from "../ProductCard";

const FeaturedSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center overflow-x-hidden">
        <div className="text-center py-5 font-secondary text-[3rem] font-[450] sm:text-[3rem]">
          Featured Products
        </div>
        <hr />
        <ProductCard />

        {/* First Row */}
        <div className="flex sm:flex-row flex-col items-center justify-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-1/2 flex justify-center"
          >
            <img
              src={BlackHoodie}
              alt="Black Hoodie"
              className="w-full h-auto max-w-[300px] sm:max-w-[400px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-0 w-full sm:w-1/2"
          >
            <h1 className="font-secondary font-bold text-xxl sm:text-[4rem]">
              Fashion that Meets the Requirements
            </h1>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="flex sm:flex-row flex-col items-center justify-center space-x-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-1/2 flex justify-center"
          >
            <h1 className="font-secondary font-bold text-xxl sm:text-[4rem]">
              Ahead the Time, Wearers is Latest
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full sm:w-1/2 flex justify-center"
          >
            <img
              src={WhiteHoodie}
              alt="White Hoodie"
              className="w-full h-auto max-w-[300px] sm:max-w-[400px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
