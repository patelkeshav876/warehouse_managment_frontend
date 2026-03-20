import React from 'react'; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';
import Nav from '../components/Nav';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    recentActivity: [],
    lowStock: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const menuItems = [
    { title: 'Products', icon: '📦', route: '/products', color: 'from-blue-500 to-cyan-500' },
    { title: 'Orders', icon: '📋', route: '/orders', color: 'from-brown-500 to-pink-500' },
    { title: 'Inward', icon: '📥', route: '/inward', color: 'from-green-500 to-emerald-500' },
    { title: 'Outward', icon: '📤', route: '/outward', color: 'from-orange-500 to-red-500' },
    { title: 'Packaging', icon: '📦', route: '/packaging', color: 'from-yellow-500 to-orange-500' },
    { title: 'Users', icon: '👥', route: '/users', color: 'from-indigo-500 to-brown-500' },
    { title: 'Reports', icon: '📊', route: '/reports', color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-pink-600">
      <Nav />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 text-brown-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></span>
              Live Updates
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-brown-200 mb-2">Total Products</div>
            <div className="text-4xl font-bold text-white">{stats.totalProducts}</div>
            <div className="text-green-400 text-sm mt-2">+12% this month</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-brown-200 mb-2">Active Orders</div>
            <div className="text-4xl font-bold text-white">{stats.totalOrders}</div>
            <div className="text-green-400 text-sm mt-2">+8% this week</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-brown-200 mb-2">Total Users</div>
            <div className="text-4xl font-bold text-white">{stats.totalUsers}</div>
            <div className="text-brown-300 text-sm mt-2">5 active now</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-brown-200 mb-2">System Uptime</div>
            <div className="text-4xl font-bold text-white">99.9%</div>
            <div className="text-green-400 text-sm mt-2">All systems operational</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-6 mb-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.route)}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/20 cursor-pointer transition group"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition`}>
                {item.icon}
              </div>
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Stock Movement</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-white mb-2">
                  <span>Inward Stock</span>
                  <span className="text-green-400">+15%</span>
                </div>
                <div className="h-4 bg-brown-900/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white mb-2">
                  <span>Outward Stock</span>
                  <span className="text-brown-300">+8%</span>
                </div>
                <div className="h-4 bg-brown-900/50 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-pink-400 to-brown-500 rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-white mb-2">
                  <span>In Transit</span>
                  <span className="text-yellow-400">45 items</span>
                </div>
                <div className="h-4 bg-brown-900/50 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New order received', time: '2 mins ago', color: 'green' },
                { action: 'Product stock updated', time: '15 mins ago', color: 'blue' },
                { action: 'User registered', time: '1 hour ago', color: 'brown' },
                { action: 'Report generated', time: '2 hours ago', color: 'pink' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className={`w-3 h-3 rounded-full bg-${activity.color}-400`}></div>
                  <div className="flex-1">
                    <div className="text-white">{activity.action}</div>
                    <div className="text-brown-300 text-sm">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
