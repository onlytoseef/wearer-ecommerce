import React from "react";
import { motion } from "framer-motion";
import ContactUs from "../../assets/images/Contact/ContactUs.svg";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Contact Us | Wearers</title>
        <meta
          name="description"
          content="Get in touch with Wearers for customer support, inquiries, or feedback."
        />
        <meta
          name="keywords"
          content="contact, wearers, support, customer service"
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="sm:text-[6rem] text-primary text-[3.2rem] md:-ml-[6rem] font-monster font-extrabold ">
          <span
            style={{
              WebkitTextStroke: "2px #425652",
              color: "transparent",
            }}
            className="text-pri"
          >
            Contact
          </span>{" "}
          Us
        </h1>
        <p className="mt-4 font-monster text-gray-700">
          We'd love to hear from you! Feel free to reach out through any of the
          contact methods below.
        </p>
      </motion.div>

      <div className="flex flex-col font-monster lg:flex-row gap-12">
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
            <p className="text-gray-600">+92 3144642896</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold">WhatsApp:</h3>
            <a target="_blank" href="https://wa.me/+923144642896">
              +92 3084801871
            </a>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 flex justify-center"
        >
          <img src={ContactUs} alt="Contact Us" className="w-full max-w-md" />
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
