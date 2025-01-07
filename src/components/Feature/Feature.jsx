import React from "react";
import { motion } from "framer-motion";

const FeaturedSection = () => {
  const pulseVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Product 1", "Product 2", "Product 3"].map((product, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl"
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={pulseVariants}
            >
              <img
                src={`https://via.placeholder.com/150?text=${product}`}
                alt={product}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product}</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <motion.button
                className="bg-green-500 text-white py-2 px-4 rounded-lg focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
