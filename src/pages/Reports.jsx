import React from 'react';  
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const handleCSVUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const jsonData = results.data;
      // Now call your report builder
      buildDashboardFromCSV(jsonData);
    }
  });
};



const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Assume first sheet contains all data
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Update your state variables (simulate API data)
    setDashboardStats(customDashboardStatsFromExcel(jsonData));
    setTimeSeriesData(customTimeSeriesFromExcel(jsonData));
    setProductStats(customProductStatsFromExcel(jsonData));
    setLoading(false);
  };
  reader.readAsArrayBuffer(file);
};

const buildDashboardFromCSV = (orders) => {
  // Today's stats (for demo, using all rows as "today")
  const todayInward = orders.reduce((acc, row) => acc + Number(row.Quantity), 0);
  const todayAmount = orders.reduce((acc, row) => acc + Number(row.Amount), 0);

  // Breakdown by status
  const statusMap = {};
  for (let order of orders) {
    statusMap[order.Status] = (statusMap[order.Status] || 0) + 1;
  }
  const statusBreakdown = Object.entries(statusMap).map(([status, count]) => ({
    _id: status,
    count,
  }));

  // Breakdown by warehouse
  const warehouseMap = {};
  for (let order of orders) {
    warehouseMap[order['Warehouse Code']] = (warehouseMap[order['Warehouse Code']] || 0) + 1;
  }
  const channelBreakdown = Object.entries(warehouseMap).map(([ch, count]) => ({
    _id: ch,
    count
  }));

  // Example dashboard object (customize as needed)
  setDashboardStats({
    todayInward: { count: orders.length, amount: todayAmount },
    todayOutward: { count: 0, amount: 0 }, // Not present in your CSV, can add logic if needed
    totalInward: { total: orders.length, amount: todayAmount },
    totalOutward: { total: 0, amount: 0 }, // Same as above
    statusBreakdown,
    channelBreakdown
  });

  // Product Stats
  const productMap = {};
  for (let order of orders) {
    const product = order['Product Name'];
    if (!productMap[product]) {
      productMap[product] = {
        _id: product,
        totalInward: 0,
        totalOutward: 0,
        currentStock: 0,
        revenue: 0,
        transactions: 0
      };
    }
    productMap[product].totalInward += Number(order.Quantity);
    productMap[product].revenue += Number(order.Amount);
    productMap[product].transactions += 1;
    // Fill totalOutward/currentStock logic if your CSV provides outwards/stock
  }
  setProductStats(Object.values(productMap));

  // Time Series 
  const timeSeriesData = orders.map(order => ({
    _id: { date: "2025-11-09", type: "inward" }, // Replace with real date field if you have one
    totalAmount: Number(order.Amount)
  }));
  setTimeSeriesData(timeSeriesData);
  setLoading(false);
};


const Reports = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [period, setPeriod] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, [period]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [dashboardRes, timeSeriesRes, productRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics/dashboard', { headers }),
        axios.get(`http://localhost:5000/api/analytics/timeseries?period=${period}`, { headers }),
        axios.get('http://localhost:5000/api/analytics/products', { headers })
      ]);

      setDashboardStats(dashboardRes.data);
      setTimeSeriesData(timeSeriesRes.data);
      setProductStats(productRes.data);
    } catch (error) {
       setLoading(false);
       setShowExcelUpload(true); // Show file upload UI
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const getTimeSeriesChartData = () => {
    const dates = [...new Set(timeSeriesData.map(d => d._id.date))].sort();
    const inwardData = dates.map(date => {
      const item = timeSeriesData.find(d => d._id.date === date && d._id.type === 'inward');
      return item ? item.totalAmount : 0;
    });
    const outwardData = dates.map(date => {
      const item = timeSeriesData.find(d => d._id.date === date && d._id.type === 'outward');
      return item ? item.totalAmount : 0;
    });

    return {
      labels: dates.map(d => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
      datasets: [
        {
          label: 'Inward Revenue',
          data: inwardData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Outward Revenue',
          data: outwardData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  const getProductBarChartData = () => {
    const topProducts = productStats.slice(0, 10);
    return {
      labels: topProducts.map(p => p._id),
      datasets: [
        {
          label: 'Inward',
          data: topProducts.map(p => p.totalInward),
          backgroundColor: 'rgba(16, 185, 129, 0.8)'
        },
        {
          label: 'Outward',
          data: topProducts.map(p => p.totalOutward),
          backgroundColor: 'rgba(59, 130, 246, 0.8)'
        },
        {
          label: 'Current Stock',
          data: topProducts.map(p => p.currentStock),
          backgroundColor: 'rgba(168, 85, 247, 0.8)'
        }
      ]
    };
  };
   /*yha pr add kiya h*/
  const ReportsPage = () => (

    
  <div className="flex">
    
    <Sidebar />
    <div className="flex-1 bg-gray-50 min-h-screen">
      <TopBar title="Reports" />
      <main className="max-w-6xl mx-auto px-12 py-10">
        <h1 className="text-2xl font-bold mb-6 mt-4 text-gray-800">Reports Center</h1>
        <input className="w-full mb-4 p-2 border border-gray-200 rounded-xl bg-gray-100" placeholder="Search reports" />
        <div className="flex gap-6">
          {/* Left categories */}
          <div className="w-64 bg-white rounded-xl shadow p-5 border border-gray-100">
            <h2 className="font-semibold mb-4 text-gray-700">Report Category</h2>
            <SidebarLink icon="📈" label="Sales" />
            <SidebarLink icon="🔖" label="Inventory" />
            {/* ...other categories */}
          </div>
          {/* Main Report Table */}
          <div className="flex-1 bg-white rounded-xl shadow p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg">All Reports</h3>
              <button className="bg-blue-600 p-2 rounded-lg text-white font-semibold text-sm hover:bg-blue-700">Create New Report</button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b text-gray-500 text-left">
                  <th className="py-2">Report Name</th>
                  <th className="py-2">Last Visited</th>
                  <th className="py-2">Created By</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2 text-blue-600 font-medium cursor-pointer">Sales by Customer</td>
                  <td className="py-2">-</td>
                  <td className="py-2">System Generated</td>
                </tr>
                {/* ...repeat for all reports */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
)


  useEffect(() => {
  // Dummy data for dashboard
  const dummyDashboardStats = {
    todayInward: { count: 10, amount: 2500 },
    todayOutward: { count: 8, amount: 1800 },
    totalInward: { total: 200, amount: 50000 },
    totalOutward: { total: 180, amount: 45000 },
    statusBreakdown: [
      { _id: "completed", count: 120 },
      { _id: "pending", count: 40 },
      { _id: "cancelled", count: 15 }
    ],
    channelBreakdown: [
      { _id: "online", count: 90 },
      { _id: "retail", count: 50 },
      { _id: "wholesale", count: 35 }
    ]
  };

  // Dummy time series data
  const dummyTimeSeriesData = [
    { _id: { date: "2025-11-01", type: "inward" }, totalAmount: 5000 },
    { _id: { date: "2025-11-01", type: "outward" }, totalAmount: 3000 },
    { _id: { date: "2025-11-02", type: "inward" }, totalAmount: 4500 },
    { _id: { date: "2025-11-02", type: "outward" }, totalAmount: 3500 },
    { _id: { date: "2025-11-03", type: "inward" }, totalAmount: 5200 },
    { _id: { date: "2025-11-03", type: "outward" }, totalAmount: 4000 }
  ];

  // Dummy product stats
  const dummyProductStats = [
    {
      _id: "RAW MATERIALS",
      totalInward: 80,
      totalOutward: 60,
      currentStock: 20,
      revenue: 14000,
      transactions: 10
    },
    {
      _id: "AMAZON",
      totalInward: 60,
      totalOutward: 40,
      currentStock: 20,
      revenue: 11000,
      transactions: 8
    },
    {
      _id: "FLIPKART",
      totalInward: 50,
      totalOutward: 30,
      currentStock: 20,
      revenue: 9000,
      transactions: 6
    }
  ];

  // Set dummy data to state for immediate render
  setDashboardStats(dummyDashboardStats);
  setTimeSeriesData(dummyTimeSeriesData);
  setProductStats(dummyProductStats);
  setLoading(false);
}, []); // Empty dependencies to run once on mount

  const getStatusDoughnutData = () => {
    if (!dashboardStats) return { labels: [], datasets: [] };
    
    return {
      labels: dashboardStats.statusBreakdown.map(s => s._id.replace('_', ' ').toUpperCase()),
      datasets: [{
        data: dashboardStats.statusBreakdown.map(s => s.count),
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(107, 114, 128, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 0
      }]
    };
  };

  const getChannelDoughnutData = () => {
    if (!dashboardStats) return { labels: [], datasets: [] };
    
    return {
      labels: dashboardStats.channelBreakdown.map(c => c._id.toUpperCase()),
      datasets: [{
        data: dashboardStats.channelBreakdown.map(c => c.count),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderWidth: 0
      }]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgb(216, 180, 254)',
          font: { size: 12 }
        }
      }
    },
    scales: {
      y: {
        ticks: { color: 'rgb(216, 180, 254)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      },
      x: {
        ticks: { color: 'rgb(216, 180, 254)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgb(216, 180, 254)',
          font: { size: 12 },
          padding: 15
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-600 p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-purple-200">Comprehensive insights and data visualization</p>
        </div>
        
        <div className="flex gap-4">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white font-semibold"
          >
            <option value="7" className="bg-purple-900">Last 7 Days</option>
            <option value="30" className="bg-purple-900">Last 30 Days</option>
            <option value="90" className="bg-purple-900">Last 90 Days</option>
          </select>
          
          <button
            onClick={fetchAllData}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-2xl transition"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: "Today's Sales", 
            value: dashboardStats?.todayInward?.count || 0,
            amount: `$${dashboardStats?.todayInward?.amount?.toFixed(2) || '0.00'}`,
            icon: '📊',
            color: 'from-yellow-500 to-orange-500'
          },
          { 
            label: "Today's Purchase", 
            value: dashboardStats?.todayOutward?.count || 0,
            amount: `$${dashboardStats?.todayOutward?.amount?.toFixed(2) || '0.00'}`,
            icon: '🛒',
            color: 'from-green-500 to-emerald-600'
          },
          { 
            label: "Total Inward", 
            value: dashboardStats?.totalInward?.total || 0,
            amount: `$${dashboardStats?.totalInward?.amount?.toFixed(2) || '0.00'}`,
            icon: '⬇️',
            color: 'from-blue-500 to-cyan-600'
          },
          { 
            label: "Total Outward", 
            value: dashboardStats?.totalOutward?.total || 0,
            amount: `$${dashboardStats?.totalOutward?.amount?.toFixed(2) || '0.00'}`,
            icon: '⬆️',
            color: 'from-red-500 to-pink-600'
          }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-3xl mb-4`}>
              {stat.icon}
            </div>
            <div className="text-white text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-purple-200 mb-2">{stat.label}</div>
            <div className="text-green-400 font-semibold">{stat.amount}</div>
          </motion.div>
        ))}
      </div>

      {/* Stock Report Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Stock Report - Revenue Trend</h2>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
            Regenerate
          </button>
        </div>
        <div style={{ height: '400px' }}>
          <Line data={getTimeSeriesChartData()} options={chartOptions} />
        </div>
      </motion.div>

      {/* Product Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Product-wise Stock Analysis</h2>
        <div style={{ height: '400px' }}>
          <Bar data={getProductBarChartData()} options={chartOptions} />
        </div>
      </motion.div>

      {/* Doughnut Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Status Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">Order Status Distribution</h3>
          <div style={{ height: '300px' }}>
            <Doughnut data={getStatusDoughnutData()} options={doughnutOptions} />
          </div>
        </motion.div>

        {/* Channel Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6">Sales Channel Distribution</h3>
          <div style={{ height: '300px' }}>
            <Doughnut data={getChannelDoughnutData()} options={doughnutOptions} />
          </div>
        </motion.div>
      </div>

      {/* Product Table Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Detailed Product Report</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
              🔄 Refresh
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
              📊 Sort
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
              📤 Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-3 text-purple-200">Product Name</th>
                <th className="text-left p-3 text-purple-200">Total Inward</th>
                <th className="text-left p-3 text-purple-200">Total Outward</th>
                <th className="text-left p-3 text-purple-200">Current Stock</th>
                <th className="text-left p-3 text-purple-200">Revenue</th>
                <th className="text-left p-3 text-purple-200">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {productStats.map((product, idx) => (
                <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-3 font-semibold">{product._id}</td>
                  <td className="p-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      {product.totalInward}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {product.totalOutward}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      product.currentStock > 50 ? 'bg-green-500/20 text-green-300' :
                      product.currentStock > 20 ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {product.currentStock}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-green-400">${product.revenue.toFixed(2)}</td>
                  <td className="p-3">{product.transactions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Monthly Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Monthly Sales Trend</h2>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition">
            Regenerate
          </button>
        </div>
        <div style={{ height: '300px' }}>
          <Line 
            data={{
              ...getTimeSeriesChartData(),
              datasets: getTimeSeriesChartData().datasets.map(ds => ({
                ...ds,
                fill: true
              }))
            }} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                filler: {
                  propagate: true
                }
              }
            }} 
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
