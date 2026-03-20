import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import * as XLSX from 'xlsx';

import { MotionDiv, FloatBlob, AnimatedButton } from "./motion-utils";

const Inward = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [showExcelPreview, setShowExcelPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    productName: '',
    quantity: '',
    amount: '',
    status: 'pending',
    channel: 'manual',
    warehouseCode: ''
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/transactions?type=inward', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/transactions', {
        ...formData,
        type: 'inward'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowForm(false);
      setFormData({
        orderNumber: '',
        customerName: '',
        productName: '',
        quantity: '',
        amount: '',
        status: 'pending',
        channel: 'manual',
        warehouseCode: ''
      });
      fetchTransactions();
      alert('Inward entry created successfully!');
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Error creating entry');
    }
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const binaryString = evt.target.result;
          const workbook = XLSX.read(binaryString, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
          
          if (data.length === 0) {
            alert('Excel file is empty!');
            return;
          }
          
          setExcelData(data);
          setShowExcelPreview(true);
        } catch (error) {
          console.error('Error reading Excel:', error);
          alert('Error reading Excel file. Please check the format.');
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const importExcelData = async () => {
    if (excelData.length === 0) {
      alert('No data to import!');
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      
      // Transform Excel data to match our schema
      const transformedData = excelData.map((row, index) => ({
        type: 'inward',
        orderNumber: row['Order Number'] || row['OrderNumber'] || row['Order#'] || `SO-${Date.now()}-${index}`,
        customerName: row['Customer Name'] || row['Customer'] || row['CustomerName'] || 'Unknown',
        productName: row['Product Name'] || row['Product'] || row['ProductName'] || 'Unknown Product',
        quantity: parseInt(row['Quantity'] || row['Qty'] || 0),
        amount: parseFloat(row['Amount'] || row['Price'] || row['Total'] || 0),
        status: (row['Status'] || 'pending').toLowerCase(),
        channel: 'excel',
        warehouseCode: row['Warehouse Code'] || row['Warehouse'] || row['WH'] || ''
      }));

      // Send all data in bulk
      const promises = transformedData.map(data =>
        axios.post('http://localhost:5000/api/transactions', data, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );

      await Promise.all(promises);
      
      setExcelData([]);
      setShowExcelPreview(false);
      fetchTransactions();
      alert(`Successfully imported ${transformedData.length} entries!`);
    } catch (error) {
      console.error('Error importing Excel data:', error);
      alert('Error importing some entries. Please check console for details.');
    } finally {
      setUploading(false);
    }
  };

  const cancelExcelImport = () => {
    setExcelData([]);
    setShowExcelPreview(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      fulfilled: 'bg-green-500',
      partially_shipped: 'bg-yellow-500',
      shipped: 'bg-blue-500',
      pending: 'bg-gray-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-pink-600 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Inward Stock Management</h1>
        <p className="text-brown-200">Manage incoming inventory and stock received</p>
      </div>

      {/* Action Buttons */}
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition"
        >
          ⬇️ Add Inward Entry

        </button>

        
        
        <label className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition cursor-pointer">
          📄 Upload Excel
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
            className="hidden"
          />
        </label>

        <button
          onClick={() => {
            const link = document.createElement('a');
            link.href = 'data:text/plain;charset=utf-8,Order Number,Customer Name,Product Name,Quantity,Amount,Status,Warehouse Code\nSO-00001,John Doe,Product A,10,100.50,pending,WH-001\nSO-00002,Jane Smith,Product B,5,50.25,fulfilled,WH-002';
            link.download = 'inward_template.csv';
            link.click();
          }}
          className="px-6 py-3 bg-gradient-to-r from-brown-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition"
        >
          📥 Download Template
        </button>
      </div>

      {/* Excel Preview Modal */}
      {showExcelPreview && excelData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              📊 Excel Preview - {excelData.length} rows found
            </h2>
            <div className="flex gap-3">
              <button
                onClick={importExcelData}
                disabled={uploading}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? '⏳ Importing...' : `✅ Import All ${excelData.length} Entries`}
              </button>
              <button
                onClick={cancelExcelImport}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg font-semibold transition"
              >
                ❌ Cancel
              </button>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-4">
            <p className="text-yellow-200">
              <strong>⚠️ Important:</strong> Review the data below before importing. Make sure column names match: 
              <span className="font-mono text-sm"> Order Number, Customer Name, Product Name, Quantity, Amount, Status, Warehouse Code</span>
            </p>
          </div>

          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-white">
              <thead className="sticky top-0 bg-brown-900/80 backdrop-blur-sm">
                <tr className="border-b border-white/20">
                  {Object.keys(excelData[0] || {}).map((key) => (
                    <th key={key} className="text-left p-3 text-brown-200 font-semibold">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="p-3">{String(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Add Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4">New Inward Entry</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brown-200 mb-2">Order Number *</label>
              <input
                type="text"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="SO-00001"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Customer Name</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Customer name"
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Product name"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Quantity *</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Amount ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="pending" className="bg-brown-900">Pending</option>
                <option value="fulfilled" className="bg-brown-900">Fulfilled</option>
                <option value="partially_shipped" className="bg-brown-900">Partially Shipped</option>
              </select>
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Channel</label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="manual" className="bg-brown-900">Manual</option>
                <option value="ebay" className="bg-brown-900">eBay</option>
                <option value="shopify" className="bg-brown-900">Shopify</option>
                <option value="excel" className="bg-brown-900">Excel</option>
              </select>
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Warehouse Code</label>
              <input
                type="text"
                value={formData.warehouseCode}
                onChange={(e) => setFormData({ ...formData, warehouseCode: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="WH-001"
              />
            </div>

            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-2xl transition"
              >
                💾 Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Transactions Table */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
        <h2 className="text-2xl font-bold text-white mb-6">All Inward Entries</h2>
        
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brown-200 text-lg">No inward entries yet. Click "Add Inward Entry" or upload an Excel file to start.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3 text-brown-200">Date</th>
                  <th className="text-left p-3 text-brown-200">Order #</th>
                  <th className="text-left p-3 text-brown-200">Customer</th>
                  <th className="text-left p-3 text-brown-200">Product</th>
                  <th className="text-left p-3 text-brown-200">Quantity</th>
                  <th className="text-left p-3 text-brown-200">Amount</th>
                  <th className="text-left p-3 text-brown-200">Status</th>
                  <th className="text-left p-3 text-brown-200">Channel</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn._id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="p-3">{new Date(txn.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-blue-300 font-semibold">{txn.orderNumber}</td>
                    <td className="p-3">{txn.customerName || '-'}</td>
                    <td className="p-3">{txn.productName}</td>
                    <td className="p-3">{txn.quantity}</td>
                    <td className="p-3 font-semibold text-green-400">${txn.amount.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(txn.status)}`}>
                        {txn.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3">
                      {txn.channel === 'ebay' && <span className="px-3 py-1 bg-gray-600 rounded text-xs font-semibold">eBay</span>}
                      {txn.channel === 'shopify' && <span className="px-3 py-1 bg-green-600 rounded text-xs font-semibold">Shopify</span>}
                      {txn.channel === 'manual' && <span className="px-3 py-1 bg-blue-600 rounded text-xs font-semibold">Manual</span>}
                      {txn.channel === 'excel' && <span className="px-3 py-1 bg-brown-600 rounded text-xs font-semibold">Excel</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="text-brown-200 mb-2">Total Entries</div>
          <div className="text-4xl font-bold text-white">{transactions.length}</div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="text-brown-200 mb-2">Total Quantity</div>
          <div className="text-4xl font-bold text-white">
            {transactions.reduce((sum, t) => sum + parseInt(t.quantity || 0), 0)}
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
          <div className="text-brown-200 mb-2">Total Amount</div>
          <div className="text-4xl font-bold text-green-400">
            ${transactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0).toFixed(2)}
          </div>
        </div>
      </div>
      {/* ---- Scanning / Inward entry block (animated) ---- */}
{/* ---- Scanning / Inward entry block (framer-motion variant) ---- */}
<div className="mt-2">
  <div className="flex flex-col md:flex-row items-center gap-6">
    <div className="relative flex items-center justify-center">
      <div className="w-36 h-28 bg-white/6 rounded-2xl flex items-center justify-center shadow-inner">
        <div className="w-28 h-16 bg-gradient-to-r from-transparent to-white/5 rounded-md flex items-center justify-center">
          <div className="text-sm text-purple-100">Scanning...</div>
        </div>
      </div>

      {/* Animated beam using framer-motion */}
      <motion.div
        className="absolute -bottom-1 w-28 h-1 rounded-full"
        style={{ background: "linear-gradient(90deg, rgba(163,243,232,0.9), rgba(208,167,255,0.85))", opacity: 0.95 }}
        animate={{ x: [ -8, 8, -8 ] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <div className="flex-1">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h4 className="text-white font-semibold text-lg">Warehouse Scanning</h4>
          <p className="text-sm text-purple-200">Use the scanner to record inward entries in real-time. Scan barcode / QR and the system will auto-assign inventory.</p>
        </div>

        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.03 }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Open Scanner
          </motion.button>
        </div>
      </div>

      <div className="mt-4">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-cyan-300/30 to-pink-300/20 flex items-center justify-center text-white font-bold">🔍</div>
            <div className="flex-1">
              {typeof InwardEntryScanner !== "undefined" ? (
                <InwardEntryScanner />
              ) : (
                <div className="text-sm text-purple-100">Scanner placeholder — drop your <code>InwardEntryScanner</code> component here.</div>
              )}
            </div>
            <div>
              <motion.button whileHover={{ scale: 1.03 }} className="px-3 py-2 rounded-md bg-indigo-600 text-white" onClick={() => alert("Trigger scan (demo)")}>Scan Now</motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default Inward;
