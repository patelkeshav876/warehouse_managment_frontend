import React from 'react';  // ← Add this line
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">W</span>
        </div>
        
      </div>

      <div className="hidden md:flex gap-8 text-blue bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-semibold">
        <button onClick={() => navigate('/')} className="hover:text-purple-200 transition">WMS</button>
        <button onClick={() => navigate('/inward')} className="hover:text-purple-200 transition">Inward</button>
        <button onClick={() => navigate('/outward')} className="hover:text-purple-200 transition">Outward</button>
        <button onClick={() => navigate('/orders')} className="hover:text-purple-200 transition">Orders</button>
        <button onClick={() => navigate('/reports')} className="hover:text-purple-200 transition">Reports</button>
        
        
      </div>


      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-xl transition"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/vendors/new")}
          className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
        >
        Create New Vendor
        </button>

        <button
        onClick={() => navigate('/vendors/new')}
        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100"
        > 
        + New Vendor
        </button>
      </div>
    </nav>
  );
};

export default Nav;
