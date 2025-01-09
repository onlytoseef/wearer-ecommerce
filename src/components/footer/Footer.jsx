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
              <Link to="/hoodies" className="hover:text-gray-400">
                Hoodies
              </Link>
            </li>
            <li>
              <Link to="/track-suits" className="hover:text-gray-400">
                Track Suits
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="hover:text-gray-400">
                Caps
              </Link>
            </li>
            <li>
              <Link to="/t-upcoming" className="hover:text-gray-400">
                T-Shirts
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Column */}
        <div>
          <h3 className="font-bold text-white mb-4">CUSTOMER SERVICE</h3>
          <ul>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-gray-400">
                Track Order
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
              <Link to="/about" className="hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/corporate-orders" className="hover:text-gray-400">
                Corporate Orders
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-gray-400">
                category
              </Link>
            </li>

            <li>
              <Link to="/admin" className="hover:text-gray-400">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">ABOUT</h3>
          <ul>
            <li>
              <Link to="/about" className="hover:text-gray-400">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400">
                Our Values
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-400">
                Innovation made Accessible
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">SOCIAL</h3>
          <p className="mb-4">
            Follow us on Instagram and get a Exclusive Deals
          </p>
          <div className="flex space-x-4">
            <a
              href="https://web.facebook.com/wearers.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <AiFillFacebook size={30} />
            </a>

            <a
              href="https://www.instagram.com/wearers.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <AiFillInstagram size={30} />
            </a>
            <a
              href="https://www.youtube.com/@wearerspk"
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
