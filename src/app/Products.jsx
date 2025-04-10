import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');

  const fetchProductdata = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, uuid: uuidv4() });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded-md ${view === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md ${view === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
          >
            List
          </button>
        </div>
      </div>

      <div
        className={`${
          view === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'flex flex-col gap-4'
        }`}
      >
        {filtered.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full sm:w-32 h-40 object-cover rounded-md"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="mt-2 font-bold text-blue-600">₹{p.sellingPrice}</p>
              </div>
              <button
                onClick={() => addToCart(p)}
                className="mt-4 w-full sm:w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
