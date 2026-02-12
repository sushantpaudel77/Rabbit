import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ cartDrawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-120 h-full bg-white shadow-2xl transform transition-transform duration-300 flex flex-col z-50 ${cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Close Button */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
        <button
          onClick={toggleCartDrawer}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Cart contents with scrollable area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <CartContents />
      </div>

      {/* Checkout button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm"
        >
          Checkout
        </button>
        <p className="text-xs text-gray-500 text-center mt-3 leading-relaxed">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
