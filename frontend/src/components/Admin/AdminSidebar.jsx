import React from 'react';
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from 'react-icons/fa';
import { PiRabbitFill } from 'react-icons/pi';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-64 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold flex items-center gap-1">
          <PiRabbitFill className="text-rabbit-red" />
          Rabbit
        </h2>
        <p className="text-sm text-gray-400 mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
      </nav>

      <div className="p-4 space-y-2">
        <Link
          to="/shop"
          className="block text-center text-gray-400 hover:text-white py-2 text-sm border border-gray-700 rounded hover:border-gray-600 transition-colors"
        >
          <FaStore className="inline mr-2" />
          Back to Shop
        </Link>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded flex items-center justify-center space-x-2 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;