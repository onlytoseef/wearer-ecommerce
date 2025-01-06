import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold">
          <span className="text-green-600">Contact</span> Us
        </h1>
        <p className="mt-4 text-gray-700">
          We'd love to hear from you! Feel free to reach out through any of the
          contact methods below.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Contact Details */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2"
        >
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions, need assistance, or want to learn more
            about our services, feel free to contact us. Our team is always
            ready to help!
          </p>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Email:</h3>
            <p className="text-gray-600">contact@wearers.com</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">Phone:</h3>
            <p className="text-gray-600">+92 300 1234567</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">WhatsApp:</h3>
            <p className="text-gray-600">+92 300 1234567</p>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img
            src="https://undraw.io/assets/illustrations/undraw_contact_us.svg"
            alt="Contact Us"
            className="w-full max-w-md"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <p className="text-gray-700">
          Thank you for choosing Wearers. We’re committed to providing the best
          support and services!
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
