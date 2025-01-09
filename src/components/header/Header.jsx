import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { PiShoppingCart } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../assets/images/Logo/Logo.svg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <button
            className="md:hidden text-3xl text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>

          <img
            className="hover:cursor-pointer"
            src={Logo}
            width={40}
            onClick={() => navigate("/")}
          />

          {/* Navigation Links (Large screens) */}
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

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <nav className="flex flex-col space-y-4 items-center">
              <Link
                to="/"
                className="text-gray-800 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-800 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/cart");
                }}
                className="text-gray-800 text-lg font-medium"
              >
                Cart
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate("/track-order");
                }}
                className="text-gray-800 text-lg font-medium"
              >
                Track Order
              </button>
            </nav>
          </div>
        )}
      </header>
    </header>
  );
}
