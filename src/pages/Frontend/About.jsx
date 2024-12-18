import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import customer from "../../assets/images/AboutUs/customer.svg";
import refund from "../../assets/images/AboutUs/refund.svg";
import about from "../../assets/images/AboutUs/about.svg";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  // Scroll handler to detect scroll direction and position
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollAnimation = {
    x: scrollY * 0.3,
    transition: { type: "tween", ease: "linear" },
  };

  const reverseScrollAnimation = {
    x: -scrollY * 0.3,
    transition: { type: "tween", ease: "linear" },
  };

  return (
    <>
      <div className=" text-secondary font-sans min-h-screen flex flex-col">
        <section className="flex mt-[5rem] flex-col md:flex-row items-center justify-center w-full px-8 py-12 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            // className="w-full md:w-1/2"
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
            <h1 className="sm:text-[6rem] text-[3.2rem]  md:-ml-[6rem] font-monster font-extrabold mb-6 flex">
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
            <div className="font-secondary text-center sm:text-left md:-ml-10 p-5 rounded-">
              <p className="text-lg  text-primary leading-relaxed">
                Hackney started as a small interior design firm in downtown
                Michigan, aiming to help home buyers make the most of their
                newly acquired spaces. We soon realized the value of helping
                clients envision what lies beyond their walls and floor plans.
              </p>
              <p className="text-lg text-primary leading-relaxed mt-4">
                Today, we offer tailored interior design, architecture, and
                realtor services. Our goal is to exceed customer expectations
                with seamless and personalized solutions.
              </p>
            </div>
          </motion.div>
        </section>
      </div>

      <div className="flex justify-center flex-col mb-[5rem] sm:flex-row sm:space-x-[10rem] space-y-[5rem] sm:space-y-0">
        {/* First Card */}
        <motion.div
          style={{
            x: scrollY > 0 ? scrollAnimation.x : reverseScrollAnimation.x,
          }}
          className="flex-col text-center"
        >
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
        </motion.div>

        {/* Second Card */}
        <motion.div
          style={{
            x: scrollY > 0 ? scrollAnimation.x : reverseScrollAnimation.x,
          }}
          className="flex-col text-center"
        >
          <img className="m-auto" src={refund} width={238} alt="Easy Refund" />
          <h1 className="text-black text-[2rem] font-secondary font-[500]">
            Easy Refund
          </h1>
          <p className="text-primary font-secondary">
            Customer can refund if find any Fault
          </p>
        </motion.div>

        {/* Third Card */}
        <motion.div
          style={{
            x: scrollY > 0 ? scrollAnimation.x : reverseScrollAnimation.x,
          }}
          className="flex-col text-center"
        >
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
        </motion.div>
      </div>
    </>
  );
};

export default About;
