import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import customer from "../../assets/images/AboutUs/customer.svg";
import refund from "../../assets/images/AboutUs/refund.svg";
import about from "../../assets/images/AboutUs/about.svg";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="text-secondary font-sans min-h-screen flex flex-col">
        <section className="flex mt-[5rem] flex-col md:flex-row items-center justify-center w-full px-8 py-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={about}
              width={500}
              alt="About Us"
              className="rounded-lg shadow-lg object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-left"
          >
            <h1 className="sm:text-[6rem] text-[3.2rem] md:-ml-[6rem] font-monster font-extrabold mb-6 flex">
              <span
                style={{
                  WebkitTextStroke: "2px #425652",
                  color: "transparent",
                }}
              >
                ABOUT
              </span>
              <span className="text-[#425652]">US</span>
            </h1>
            <div className="font-secondary text-center sm:text-left md:-ml-10 p-5">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Wearers, we believe that clothing is more than just
                fabric—it's a way to express individuality, confidence, and
                creativity. Founded with the mission to redefine modern fashion,
                Wearers is a clothing brand that blends timeless designs with
                contemporary aesthetics to create outfits that empower you.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Wearers was born from a simple idea: to create high-quality,
                stylish, and versatile clothing that fits seamlessly into every
                lifestyle. From our humble beginnings as a small team of fashion
                enthusiasts to becoming a trusted name in the industry, we have
                always stayed true to our core values of innovation,
                sustainability, and customer satisfaction. Every stitch, every
                design, and every fabric is carefully chosen to ensure our
                customers receive not just clothing but an experience of comfort
                and elegance.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      <div className="flex justify-center flex-col mb-[5rem] sm:flex-row sm:space-x-[10rem] space-y-[5rem] sm:space-y-0">
        {/* First Card */}
        <div className="flex-col text-center">
          <img
            className="m-auto"
            src={customer}
            width={200}
            alt="Customer Support"
          />
          <h1 className="text-black text-[2rem] font-secondary font-[500]">
            Customer Support
          </h1>
          <p className="text-primary font-secondary">
            We Provide Quality Stuff to our Customers
          </p>
        </div>

        {/* Second Card */}
        <div className="flex-col text-center">
          <img className="m-auto" src={refund} width={238} alt="Easy Refund" />
          <h1 className="text-black text-[2rem] font-secondary font-[500]">
            Easy Exchange
          </h1>
          <p className="text-primary font-secondary">
            Customer can Exchange if find any Fault
          </p>
        </div>

        {/* Third Card */}
        <div className="flex-col text-center">
          <img
            className="m-auto"
            src={customer}
            width={200}
            alt="Customer Support"
          />
          <h1 className="text-black text-[2rem] font-secondary font-[500]">
            Customer Support
          </h1>
          <p className="text-primary font-secondary">
            We Provide Quality Stuff to our Customers
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
