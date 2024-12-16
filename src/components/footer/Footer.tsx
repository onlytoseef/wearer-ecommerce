import React from "react";
import { Link } from "react-router-dom";

import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary space-between sm:px-[10vw]">
      <div className="sm:flex items-center justify-between  mt-10 text-secondary font-monster">
        <div className="flex  flex-col">
          <p className="uppercase sm:text-[12px] sm:font-bold">Categories</p>
          <Link className="py-2" to="/about">
            Trousers
          </Link>
        </div>
        <div className="flex  flex-col">
          <p className="uppercase sm:text-[12px]  sm:font-bold">
            Customer Service
          </p>
          <Link className="py-2" to="/contact">
            Contact
          </Link>
          <Link to="/terms">Terms and Conditions</Link>
          <Link className="py-3" to="/policy">
            Privacy Policy
          </Link>
        </div>
        <div className="flex  flex-col">
          <p className="uppercase sm:text-[12px] sm:font-bold">Pages</p>
          <Link className="py-3" to="/policy">
            Home
          </Link>
          <Link className="" to="/policy">
            Shop
          </Link>
          <Link className="py-3" to="/policy">
            About
          </Link>
          <Link className="" to="/policy">
            Contact
          </Link>
        </div>
        <div className="flex w-60  flex-col">
          <p className="uppercase sm:text-[12px] sm:font-bold">Social</p>
          <p>
            Follow us on Instagram and get a 10% discount on your first order.
          </p>
          <div className="flex mt-5">
            <FaFacebookSquare size={25} />
            <FaInstagramSquare size={25} />
          </div>
        </div>
      </div>
    </footer>
  );
}
