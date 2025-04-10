import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './app/Products';
import Login from './app/Login';
import Signup from './app/Signup';
import Cart from './app/Cart';
import Orders from './app/Orders';
import Admin from './app/Admin';
import Navbar from './app/components/Navbar';

function App() {
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/Product" element={<Products />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;