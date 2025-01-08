import React from "react";
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-primary  text-secondary font-monster py-8">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        <div>
          <h3 className="font-bold text-white mb-4">CATEGORIES</h3>
          <ul>
            <li>
              <Link to="/shirts" className="hover:text-gray-400">
                Shirts
              </Link>
            </li>
            <li>
              <Link to="/pants" className="hover:text-gray-400">
                Pants
              </Link>
            </li>
            <li>
              <Link to="/active-wear" className="hover:text-gray-400">
                Active Wear
              </Link>
            </li>
            <li>
              <Link to="/t-shirts" className="hover:text-gray-400">
                T-Shirts
              </Link>
            </li>
            <li>
              <Link to="/sale" className="hover:text-gray-400">
                Sale
              </Link>
            </li>
            <li>
              <Link to="/return-exchange" className="hover:text-gray-400">
                Return/Exchange
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div>
          <h3 className="font-bold text-white mb-4">CUSTOMER SERVICE</h3>
          <ul>
            <li>
              <Link to="/contact-us" className="hover:text-gray-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-gray-400">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/place-return" className="hover:text-gray-400">
                Place Return/Exchange
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-gray-400">
                Return, Refund & Cancellation Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-gray-400">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-gray-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Pages Column */}
        <div>
          <h3 className="font-bold text-white mb-4">PAGES</h3>
          <ul>
            <li>
              <Link to="/our-muffs" className="hover:text-gray-400">
                Our Muff's
              </Link>
            </li>
            <li>
              <Link to="/inquiry" className="hover:text-gray-400">
                Inquiry
              </Link>
            </li>
            <li>
              <Link to="/corporate-orders" className="hover:text-gray-400">
                Corporate Orders
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-gray-400">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-gray-400">
                FAQ's
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className="hover:text-gray-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-gray-400">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* About Column */}
        <div>
          <h3 className="font-bold text-white mb-4">ABOUT</h3>
          <ul>
            <li>
              <Link to="/our-story" className="hover:text-gray-400">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/our-values" className="hover:text-gray-400">
                Our Values
              </Link>
            </li>
            <li>
              <Link to="/innovation" className="hover:text-gray-400">
                Innovation made Accessible
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h3 className="font-bold text-white mb-4">SOCIAL</h3>
          <p className="mb-4">
            Follow us on Instagram and get a 10% discount on your first order.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <AiFillFacebook size={30} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <AiFillInstagram size={30} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <AiFillYoutube size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
