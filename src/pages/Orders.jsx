import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const TABS = [
  { label: "Payments", id: "payments" },
  { label: "Vendors & Purchases", id: "vendors" },
  { label: "Sales & Orders", id: "sales" }
];

export default function Orders() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Order Center</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 font-semibold rounded-t-md transition ${
                activeTab === tab.id
                  ? "bg-white border border-b-0 border-gray-200 shadow text-blue-700"
                  : "text-gray-500 hover:text-blue-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow p-8 border border-gray-100 min-h-[350px]">
          {activeTab === "payments" && <PaymentsSection />}
          {activeTab === "vendors" && <VendorsSection />}
          {activeTab === "sales" && <SalesSection />}
        </div>
      </div>
    </div>
  );
}

// ========== Payments Tab ==========
function PaymentsSection() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        Introducing <span className="text-blue-700">WMS Payments</span>
      </h2>

      <div className="flex flex-wrap gap-8 mb-8">
        {/* Platform Fee Card */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 shadow-sm w-full md:w-80">
          <h3 className="font-semibold mb-4 text-blue-900">Platform Fee</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-blue-700">
              <span>UPI</span>
              <span className="font-bold">0.5%</span>
            </div>
            <div className="flex justify-between">
              <span>Cards</span>
              <span>2.75%</span>
            </div>
            <div className="flex justify-between">
              <span>Net Banking</span>
              <span>2%</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-4">
            * 18% GST applicable as per regulations.
          </div>
        </div>
        {/* Info Cards */}
        <div className="flex-1 grid gap-4">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
            <div className="flex items-center gap-3 text-blue-500 mb-1"><span className="text-2xl">🔗</span><b>Unified payments solution</b></div>
            <div className="text-gray-600">Collect payments, get detailed reports and automate reconciliation from one panel.</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
            <div className="flex items-center gap-3 text-blue-500 mb-1"><span className="text-2xl">🔒</span><b>Secure & Seamless</b></div>
            <div className="text-gray-600">Supports UPI, cards (incl. corporate), net banking – secure, real-time, and trusted.</div>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <div className="flex gap-6">
        <button 
        onClick={() => navigate('/vendors/new')}
        className="bg-blue-600 text-white px-7 py-2 rounded-xl font-semibold hover:bg-blue-700">Set Up Now</button>
        <button className="bg-white border border-gray-200 px-7 py-2 rounded-xl font-semibold text-blue-700 hover:bg-blue-50">Contact Us</button>
      </div>
    </div>
  );
}

// ========== Vendors & Purchases Tab ==========
function VendorsSection() {
  const navigate = useNavigate();
  return (
    <div>
      
      <h2 className="text-lg font-bold mb-4">Vendors & Purchases</h2>
      <div className="mb-8 text-gray-700">
        Manage all supplier information and track every purchase, payment, credit, and expensing event.
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Vendor Management */}
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-2 text-blue-800 flex items-center gap-2"><span>🧑‍💼</span>Vendors</h4>
          <p className="mb-3 text-gray-700">Create, manage and update your vendors and their payment terms in one place.</p>
          <button 
          onClick={() => navigate("/vendors/new")}
          className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100">VendorsNew</button>
        </div>
        {/* Purchases */}
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-2 text-green-700 flex items-center gap-2"><span>🛒</span>Purchases</h4>
          <p className="mb-3 text-gray-700">Add purchase orders, bills, credits, and receive supplies. Visualize your spending.</p>
          <button className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-green-100">+ New Purchase</button>
        </div>
      </div>
      <div className="mt-7 text-center text-xs text-gray-500">
        You can also import vendor/purchase data from Excel/CSV files.
      </div>
    </div>
  );
}

// ========== Sales & Orders Tab ==========
function SalesSection() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Sales & Orders</h2>
      <div className="mb-8 text-gray-700">
        Track all sales orders, fulfillment, invoices, and sales returns in one workflow.
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Orders */}
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-2 text-orange-700 flex items-center gap-2"><span>📦</span>Orders</h4>
          <p className="mb-3 text-gray-700">Record, manage, and fulfill all your customer orders efficiently, instantly searchable and filterable.</p>
          <button className="bg-orange-50 text-orange-700 px-4 py-2 rounded-lg font-semibold hover:bg-orange-100">+ New Order</button>
        </div>
        {/* Sales */}
        <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-2 text-pink-700 flex items-center gap-2"><span>💸</span>Sales</h4>
          <p className="mb-3 text-gray-700">Issue invoices, register payments, handle sales returns – with real-time updates across your system.</p>
          <button className="bg-pink-50 text-pink-700 px-4 py-2 rounded-lg font-semibold hover:bg-pink-100">+ New Sale</button>
        </div>
      </div>
      <div className="mt-7 text-center text-xs text-gray-500">
        Export sales/order data as PDF or Excel for your records.
      </div>
    </div>
  );
}
