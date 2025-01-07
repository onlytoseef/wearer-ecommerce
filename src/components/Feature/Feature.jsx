import React from "react";
import blackhoodie from "../../assets/images/product/whiteHoodieFront.svg";
import whitehoodie from "../../assets/images/product/BlackHoodieBack.svg";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>

        <div className="flex sm:flex-row flex-col items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            <img src={blackhoodie} alt="" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-secondary font-bold border-gray-500 text-xxl sm:text-[4rem]">
              Fashion that Meets the Requirements
            </h1>
          </motion.div>
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            <h1 className="font-secondary font-bold border-gray-500 text-xxl sm:text-[4rem]">
              Ahead the Time, Wearers is Latest
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            <img src={whitehoodie} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
