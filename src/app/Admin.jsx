import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/getallusers')
      .then(res => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Users</h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map(user => (
              <div key={user._id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                <p className="text-lg font-semibold text-gray-700">{user.email}</p>
                <p className="text-gray-600 capitalize">Role: {user.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
