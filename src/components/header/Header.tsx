import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { PiShoppingCart } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo/Logo.svg";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="sticky text-center top-0 font-monster z-10">
      <div className="font-monster text-primary bg-secondary">
        Free Delivery All over Pakistan
      </div>

      <header className="bg-primary shadow-md">
        <div className="container mx-auto flex items-center justify-between p-4">
          <button
            className="md:hidden text-3xl text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>

          {/* <div className="text-2xl font-bold text-secondary font-monster flex items-center">
            Wearers
          </div> */}
          <img
            className="hover:cursor-pointer"
            src={Logo}
            width={70}
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
              Trousers
            </Link>
            <Link
              to="/about"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              About
            </Link>
            <Link
              to="/terms"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              Return/Exchange
            </Link>
          </nav>

          {/* Cart and Account Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <a
              href="#"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              <PiShoppingCart size={20} />
            </a>
            <a
              href="#"
              className="text-secondary transition duration-300 ease-in-out hover:border-b-2"
            >
              <LuUserRound size={20} />
            </a>
          </div>

          <div className="md:hidden flex space-x-4 items-center">
            <button
              className="color-secondary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <PiShoppingCart color="#EBE2D0" size={20} />
            </button>
            <button>
              {" "}
              <LuUserRound color="#EBE2D0" size={20} />
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg py-4">
            <nav className="flex flex-col space-y-4 items-center">
              <a
                href="#"
                className="text-gray-800 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-800 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </a>
              <a
                href="#"
                className="text-gray-800 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-800 text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2"
              >
                Cart
              </button>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                Account
              </button>
            </nav>
          </div>
        )}
      </header>
    </header>
  );
}
