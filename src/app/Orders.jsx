import React, { use, useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("dtfghjn",user)

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/orders/my-orders/${user?.user._id}`)
        .then(res => setOrders(res.data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-lg">
                <p className="text-lg font-semibold text-gray-700">Order ID: {order._id}</p>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
