
//import React from 'react';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 8,
    totalOrders: 2,
    pendingOrders: 1,
    lowStock: 0,
    inwardToday: 1,
    outwardToday: 1
  });

  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const quickActions = [
    { icon: '⬇️', name: 'Inward Stock', desc: 'Manage incoming inventory', route: '/inward', gradient: 'from-green-500 to-emerald-600' },
    { icon: '⬆️', name: 'Outward Stock', desc: 'Handle outgoing shipments', route: '/outward', gradient: 'from-blue-500 to-cyan-600' },
    { icon: '📋', name: 'Order Management', desc: 'Track and manage orders', route: '/orders', gradient: 'from-purple-500 to-pink-600' },
    { icon: '📊', name: 'Reports & Analytics', desc: 'View comprehensive reports', route: '/reports', gradient: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-950 to-purple-900 border-r border-white/10 shadow-2xl">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-white font-bold text-xl">WMS Central</span>
          </div>

          {/* User Profile */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6 border border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">👤</span>
              </div>
              <div>
                <div className="text-white font-semibold">{user?.fullName || 'keshav'}</div>
                <div className="text-purple-300 text-sm capitalize">{user?.role || 'admin'}</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {[
              { icon: '⬇️', label: 'Inward Stock', desc: 'Manage incoming inventory', route: '/inward' },
              { icon: '⬆️', label: 'Outward Stock', desc: 'Handle outgoing shipments', route: '/outward' },
              { icon: '📋', label: 'Order Management', desc: 'Track and manage orders', route: '/orders' },
              { icon: '📊', label: 'Reports & Analytics', desc: 'View comprehensive reports', route: '/reports' }
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => navigate(item.route)}
                whileHover={{ scale: 1.02, x: 5 }}
                className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-lg transition group border border-transparent hover:border-white/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-white font-medium">{item.label}</div>
                    <div className="text-purple-300 text-xs">{item.desc}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full p-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition border border-red-500/30 flex items-center justify-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-2"
          >
            Welcome back, {user?.fullName || 'keshav'}
          </motion.h1>
          <p className="text-purple-200 text-lg">Here's what's happening in your warehouse today</p>
        </div>

        {/* Quick Action Button */}
        <div className="flex justify-end mb-6">
          <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition flex items-center gap-2">
            <span>+</span> Quick Action
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Products', value: stats.totalProducts, icon: '📦', color: 'blue' },
            { label: 'Total Orders', value: stats.totalOrders, icon: '📋', color: 'green' },
            { label: 'Pending Orders', value: stats.pendingOrders, icon: '⚠️', color: 'yellow' },
            { label: 'Low Stock Items', value: stats.lowStock, icon: '🔻', color: 'red' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-purple-200 font-medium">{stat.label}</h3>
                <div className={`text-3xl p-3 bg-${stat.color}-500/20 rounded-xl`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl font-bold text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Inward and Outward Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Today's Inward */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⬇️</span>
              <div>
                <h3 className="text-white text-xl font-bold">Today's Inward</h3>
                <span className="text-purple-300">{stats.inwardToday}</span>
              </div>
            </div>

            <div className="bg-green-500/20 rounded-xl p-4 border border-green-500/30">
              <div className="text-green-200 mb-2">Stock Received</div>
              <div className="text-white text-2xl font-bold mb-1">{stats.inwardToday}</div>
              <div className="text-green-300 text-sm">Total transactions today</div>
            </div>

            <button
              onClick={() => navigate('/inward')}
              className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition border border-white/20"
            >
              Manage Inward Stock
            </button>
          </motion.div>

          {/* Today's Outward */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⬆️</span>
              <div>
                <h3 className="text-white text-xl font-bold">Today's Outward</h3>
                <span className="text-purple-300">{stats.outwardToday}</span>
              </div>
            </div>

            <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-500/30">
              <div className="text-blue-200 mb-2">Stock Dispatched</div>
              <div className="text-white text-2xl font-bold mb-1">{stats.outwardToday}</div>
              <div className="text-blue-300 text-sm">Total transactions today</div>
            </div>

            <button
              onClick={() => navigate('/outward')}
              className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition border border-white/20"
            >
              Manage Outward Stock
            </button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <h3 className="text-white text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={() => navigate(action.route)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 hover:border-white/30 transition group text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition shadow-lg`}>
                  {action.icon}
                </div>
                <h4 className="text-white font-bold mb-2">{action.name}</h4>
                <p className="text-purple-300 text-sm">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

