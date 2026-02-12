import React from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { FiPhoneCall } from 'react-icons/fi';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
} from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 lg:px-6">
        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Newsletter
          </h3>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-700 mb-4">
            Sign up and get 10% off on your first order.
          </p>

          <form className="flex flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="p-3 w-full mb-2 text-sm border border-gray-300 rounded-t-md sm:rounded-l-md sm:rounded-tr-none
              focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
            />
            <button
              type="submit"
              className="bg-black mb-2 text-white px-6 py-3 text-sm font-medium rounded-b-md sm:rounded-r-md sm:rounded-bl-none 
              hover:bg-gray-800 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>
              <Link to="/products/mens-topwear" className="hover:text-gray-900">
                Men's Topwear
              </Link>
            </li>
            <li>
              <Link
                to="/products/womens-topwear"
                className="hover:text-gray-900"
              >
                Women's Topwear
              </Link>
            </li>
            <li>
              <Link
                to="/products/mens-bottomwear"
                className="hover:text-gray-900"
              >
                Men's Bottomwear
              </Link>
            </li>
            <li>
              <Link
                to="/products/womens-bottomwear"
                className="hover:text-gray-900"
              >
                Women's Bottomwear
              </Link>
            </li>
            <li>
              <Link to="/products/accessories" className="hover:text-gray-900">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Support</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li>
              <Link to="/contact" className="hover:text-gray-900">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-gray-900">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-gray-900">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect & Payments */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Connect With Us
          </h3>

          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Twitter"
            >
              <RiTwitterXLine className="h-6 w-6" />
            </a>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-2">Call Us</p>
            <p className="text-gray-800 font-medium flex items-center">
              <FiPhoneCall className="mr-2 h-4 w-4" />
              0123-345-32
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-3">We Accept</p>
            <div className="flex flex-wrap gap-2">
              <div className="payment-icon">
                <FaCcVisa className="h-5 w-7 text-blue-600" />
              </div>
              <div className="payment-icon">
                <FaCcMastercard className="h-5 w-7 text-red-500" />
              </div>
              <div className="payment-icon">
                <FaCcAmex className="h-5 w-7 text-blue-500" />
              </div>
              <div className="payment-icon">
                <FaCcPaypal className="h-5 w-7 text-blue-700" />
              </div>
              <div className="payment-icon">
                <SiGooglepay className="h-5 w-7 text-gray-700" />
              </div>
              <div className="payment-icon">
                <FaApplePay className="h-5 w-7 text-gray-900" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="container mx-auto mt-12 h-2 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          © 2026, CompileTab, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
