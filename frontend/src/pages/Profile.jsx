import React from 'react';
import MyOrdersPage from './MyOrdersPage';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 flex items-center justify-center flex-col bg-white">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-r from-red-200 to-rabbit-red rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl md:text-4xl text-white font-bold">
                JD
              </span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-center">
              John Doe
            </h1>
            <p className="text-base md:text-lg text-gray-600 mb-6 text-center">
              john@gmail.com
            </p>
            <button className="w-30 md:w-2/3 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
              Logout
            </button>
          </div>

          {/* Right section: Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
