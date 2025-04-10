import React, { useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleRemoveItem = (uuid) => {
    const updatedCart = cartItems.filter(item => item.uuid !== uuid);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuyAll = async () => {
    if (!user || !user.token) {
      alert('Please login to place your order.');
      return;
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.sellingPrice, 0);

    const payload = {
      products: cartItems,
      totalAmount,
      paymentMethod: 'COD',
    };

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/orders', payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      localStorage.removeItem('cart');
      setCartItems([]);
      setMessage('Order placed successfully via Cash on Delivery!');
    } catch (err) {
      console.error('Order error:', err);
      alert('Error placing order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping Cart</h2>

        {message && (
          <div className="bg-green-100 text-green-700 p-4 rounded mb-6 text-center">
            {message}
          </div>
        )}

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">No items in cart.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {cartItems.map(item => (
                <div key={item.uuid} className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-lg">
                  <h4 className="text-xl font-semibold text-gray-700 mb-2">{item.name}</h4>
                  <p className="text-gray-600 text-lg">Price: ₹{item.sellingPrice}</p>
                  <button
                    onClick={() => handleRemoveItem(item.uuid)}
                    className="mt-3 text-red-500 font-medium hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={handleBuyAll}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
