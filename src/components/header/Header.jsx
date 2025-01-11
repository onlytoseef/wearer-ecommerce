import React, { useState, useEffect } from "react";
import { LuUserRound } from "react-icons/lu";
import { PiShoppingCart } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  HomeOutlined,
  ShopOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  ProfileOutlined,
} from "@ant-design/icons"; // Ant Design Icons
import Logo from "../../assets/images/Logo/Logo.svg";
import Wearers from "../../assets/images/Logo/Wearers.svg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Detect screen size and update `isMobile`
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get cart item count from Redux state
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky text-center top-0 font-monster z-10">
      <div className="font-monster text-xs py-1 text-primary bg-secondary">
        Free Delivery All over Pakistan 🚚
      </div>

      <header className="bg-primary shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-3xl text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>

          {/* Logo Switching Based on Screen Size */}
          {isMobile ? (
            <img
              className="hover:cursor-pointer"
              src={Logo}
              width={40}
              onClick={() => navigate("/")}
            />
          ) : (
            <img
              className="hover:cursor-pointer"
              src={Wearers}
              width={150}
              onClick={() => navigate("/")}
            />
          )}

          {/* Navigation Links for Large Screens */}
          <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              Home
            </Link>
            <Link
              to="/category"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              Contact Us
            </Link>
            <Link
              to="/track-order"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              Track Order
            </Link>
          </nav>

          {/* Cart and Account Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <button
              onClick={() => navigate("/cart")}
              className="relative text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              <PiShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/account")}
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              <LuUserRound size={20} />
            </button>
          </div>

          {/* Cart and Account for Mobile */}
          <div className="md:hidden flex space-x-4 items-center">
            <button className="relative" onClick={() => navigate("/cart")}>
              <PiShoppingCart color="#EBE2D0" size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate("/account")}>
              <LuUserRound color="#EBE2D0" size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        <div
          className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 text-gray-800 text-2xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✕
          </button>
          <nav className="flex flex-col items-start p-6 space-y-4">
            <Link
              to="/"
              className="text-gray-800 text-lg font-medium flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HomeOutlined />
              <span>Home</span>
            </Link>
            <hr className="w-full border-t border-gray-300" />
            <Link
              to="/category"
              className="text-gray-800 text-lg font-medium flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShopOutlined />
              <span>Shop</span>
            </Link>
            <hr className="w-full border-t border-gray-300" />
            <Link
              to="/about"
              className="text-gray-800 text-lg font-medium flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <InfoCircleOutlined />
              <span>About</span>
            </Link>
            <hr className="w-full border-t border-gray-300" />
            <Link
              to="/contact"
              className="text-gray-800 text-lg font-medium flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <PhoneOutlined />
              <span>Contact Us</span>
            </Link>
            <hr className="w-full border-t border-gray-300" />
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/track-order");
              }}
              className="text-gray-800 text-lg font-medium flex items-center space-x-2"
            >
              <ProfileOutlined />
              <span>Track Order</span>
            </button>
          </nav>
        </div>
      </header>
    </header>
  );
}
