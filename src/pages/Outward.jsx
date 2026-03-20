import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from '../api';

const Outward = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    productName: '',
    quantity: '',
    amount: '',
    status: 'pending',
    channel: 'manual',
    warehouseCode: '',
    trackingNumber: '',
    courierService: '',
    invoice: false,
    packed: false,
    shipped: false
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/transactions?type=outward', {
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
      await axios.post('/api/transactions', {
        ...formData,
        type: 'outward'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setShowForm(false);
      resetForm();
      fetchTransactions();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      orderNumber: '',
      customerName: '',
      productName: '',
      quantity: '',
      amount: '',
      status: 'pending',
      channel: 'manual',
      warehouseCode: '',
      trackingNumber: '',
      courierService: '',
      invoice: false,
      packed: false,
      shipped: false
    });
  };

  const updateStatus = async (id, updates) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/transactions/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const generateInvoice = (transaction) => {
    setSelectedTransaction(transaction);
    setShowBilling(true);
  };

  const printInvoice = () => {
    window.print();
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
      {/* Billing Modal */}
      {showBilling && selectedTransaction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
          >
            {/* Invoice Header */}
            <div className="border-b-2 border-brown-200 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-brown-900 mb-2">INVOICE</h1>
                  <div className="text-sm text-gray-600">
                    <p>Invoice #: INV-{selectedTransaction.orderNumber}</p>
                    <p>Date: {new Date(selectedTransaction.createdAt).toLocaleDateString()}</p>
                    <p>Status: <span className="font-semibold text-brown-700">{selectedTransaction.status.toUpperCase()}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-20 h-20 bg-gradient-to-br from-brown-600 to-pink-600 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-white font-bold text-2xl">W</span>
                  </div>
                  <p className="font-bold text-brown-900">WMS Central</p>
                  <p className="text-sm text-gray-600">Warehouse Management</p>
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-6">
              <h3 className="font-bold text-brown-900 mb-2">BILL TO:</h3>
              <p className="text-gray-800 font-semibold">{selectedTransaction.customerName}</p>
              <p className="text-gray-600 text-sm">Order: {selectedTransaction.orderNumber}</p>
              {selectedTransaction.trackingNumber && (
                <p className="text-gray-600 text-sm">Tracking: {selectedTransaction.trackingNumber}</p>
              )}
            </div>

            {/* Items Table */}
            <table className="w-full mb-6">
              <thead>
                <tr className="border-b-2 border-brown-200">
                  <th className="text-left py-3 text-brown-900">Product</th>
                  <th className="text-right py-3 text-brown-900">Quantity</th>
                  <th className="text-right py-3 text-brown-900">Unit Price</th>
                  <th className="text-right py-3 text-brown-900">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-gray-800">{selectedTransaction.productName}</td>
                  <td className="text-right py-3 text-gray-800">{selectedTransaction.quantity}</td>
                  <td className="text-right py-3 text-gray-800">
                    ${(selectedTransaction.amount / selectedTransaction.quantity).toFixed(2)}
                  </td>
                  <td className="text-right py-3 text-gray-800 font-semibold">
                    ${selectedTransaction.amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-6">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-800 font-semibold">${selectedTransaction.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax (0%):</span>
                  <span className="text-gray-800 font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-brown-600">
                  <span className="text-brown-900 font-bold text-lg">TOTAL:</span>
                  <span className="text-brown-900 font-bold text-lg">${selectedTransaction.amount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            {selectedTransaction.trackingNumber && (
              <div className="bg-brown-50 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-brown-900 mb-2">Shipping Details</h4>
                <p className="text-sm text-gray-700">Tracking Number: <span className="font-semibold">{selectedTransaction.trackingNumber}</span></p>
                {selectedTransaction.courierService && (
                  <p className="text-sm text-gray-700">Courier: <span className="font-semibold">{selectedTransaction.courierService}</span></p>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-4 mb-6">
              <p>Thank you for your business!</p>
              <p>For any queries, contact: support@wmscentral.com</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={printInvoice}
                className="flex-1 py-3 bg-gradient-to-r from-brown-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                🖨️ Print Invoice
              </button>
              <button
                onClick={() => setShowBilling(false)}
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Outward Stock Management</h1>
        <p className="text-brown-200">Handle outgoing shipments, billing, and tracking</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-2xl hover:scale-105 transition"
        >
          ⬆️ Add Outward Entry
        </button>
      </div>

      {/* Add Entry Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4">New Outward Entry</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-brown-200 mb-2">Order Number *</label>
              <input
                type="text"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="SO-00001"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Customer Name *</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="Customer name"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Product Name *</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
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
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
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
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="pending" className="bg-brown-900">Pending</option>
                <option value="shipped" className="bg-brown-900">Shipped</option>
                <option value="partially_shipped" className="bg-brown-900">Partially Shipped</option>
                <option value="fulfilled" className="bg-brown-900">Fulfilled</option>
              </select>
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Tracking Number</label>
              <input
                type="text"
                value={formData.trackingNumber}
                onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="TRK-123456"
              />
            </div>

            <div>
              <label className="block text-brown-200 mb-2">Courier Service</label>
              <input
                type="text"
                value={formData.courierService}
                onChange={(e) => setFormData({ ...formData, courierService: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                placeholder="FedEx, DHL, etc."
              />
            </div>

            <div className="col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.invoice}
                  onChange={(e) => setFormData({ ...formData, invoice: e.target.checked })}
                  className="w-5 h-5"
                />
                Invoice Generated
              </label>
              
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.packed}
                  onChange={(e) => setFormData({ ...formData, packed: e.target.checked })}
                  className="w-5 h-5"
                />
                Packed
              </label>
              
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.shipped}
                  onChange={(e) => setFormData({ ...formData, shipped: e.target.checked })}
                  className="w-5 h-5"
                />
                Shipped
              </label>
            </div>

            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-2xl transition"
              >
                Save Entry
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
        <h2 className="text-2xl font-bold text-white mb-6">All Outward Entries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-3 text-brown-200">Date</th>
                <th className="text-left p-3 text-brown-200">Order #</th>
                <th className="text-left p-3 text-brown-200">Customer</th>
                <th className="text-left p-3 text-brown-200">Product</th>
                <th className="text-left p-3 text-brown-200">Qty</th>
                <th className="text-left p-3 text-brown-200">Amount</th>
                <th className="text-left p-3 text-brown-200">Status</th>
                <th className="text-left p-3 text-brown-200">Tracking</th>
                <th className="text-left p-3 text-brown-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id} className="border-b border-white/10 hover:bg-white/5">
                  <td className="p-3">{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-blue-300">{txn.orderNumber}</td>
                  <td className="p-3">{txn.customerName}</td>
                  <td className="p-3">{txn.productName}</td>
                  <td className="p-3">{txn.quantity}</td>
                  <td className="p-3 font-semibold">${txn.amount.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(txn.status)}`}>
                      {txn.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{txn.trackingNumber || '-'}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => generateInvoice(txn)}
                        className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded text-xs font-semibold transition"
                      >
                        📄 Invoice
                      </button>
                      <button
                        onClick={() => updateStatus(txn._id, { shipped: true, status: 'shipped' })}
                        className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded text-xs font-semibold transition"
                      >
                        ✓ Ship
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Outward;
