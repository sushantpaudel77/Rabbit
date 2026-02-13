import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // simulate fetching orders
    setTimeout(() => {
      const mockOrders = [
        {
          _id: '12345',
          createdAt: new Date(),
          shippingAddress: { city: 'Kathmandu', country: 'Nepal' },
          ordersItems: [
            {
              name: 'Product 1',
              image: 'https://picsum.photos/500/500?random=1',
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: '45067',
          createdAt: new Date(),
          shippingAddress: { city: 'Sydney', country: 'Australia' },
          ordersItems: [
            {
              name: 'Product 2',
              image: 'https://picsum.photos/500/500?random=2',
            },
          ],
          totalPrice: 150,
          isPaid: true,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left">Order Id</th>
                  <th className="px-4 py-3 text-left">Created</th>
                  <th className="px-4 py-3 text-left">Products</th>
                  <th className="px-4 py-3 text-left">Shipping Address</th>
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3">#{order._id}</td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                      <br />
                      <span className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {order.ordersItems.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        ))}
                        {order.ordersItems.length > 3 && (
                          <span className="text-sm text-gray-500">
                            +{order.ordersItems.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {order.shippingAddress
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                        : 'N/A'}
                    </td>
                    <td className="px-4 py-3">{order.ordersItems.length}</td>
                    <td className="px-4 py-3 font-semibold">
                      ${order.totalPrice}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          order.isPaid
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-semibold">#{order._id}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.isPaid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </div>

                {/* Product Images */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    {order.ordersItems.slice(0, 4).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ))}
                    {order.ordersItems.length > 4 && (
                      <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                        <span className="text-sm text-gray-600 font-medium">
                          +{order.ordersItems.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time:</span>
                    <span>
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping:</span>
                    <span>
                      {order.shippingAddress
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Items:</span>
                    <span>{order.ordersItems.length}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t">
                    <span>Total:</span>
                    <span>${order.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">You have no orders</p>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;