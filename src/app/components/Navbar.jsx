import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-yellow-400 transition">ShopEasy</Link>
        </div>

        <div className="flex space-x-6 items-center text-lg">
          <Link to="/Product" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/cart" className="hover:text-yellow-400 transition">Cart</Link>

          {user?.user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-yellow-400 transition">Admin</Link>
          )}

          {user ? (
            <>
              <Link to="/orders" className="hover:text-yellow-400 transition">Orders</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-yellow-400 transition">Login</Link>
              <Link to="/signup" className="hover:text-yellow-400 transition">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
