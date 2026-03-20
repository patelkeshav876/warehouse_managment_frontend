// src/pages/VendorsNew.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VendorsNew() {
  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Implement save functionality to backend API
    alert("Vendor saved!");
    navigate("/vendors"); // Navigate back to vendors list after saving
  };

  return (
    <div className="min-h-screen bg-[#fdf6f4]"> {/* gentle warm page background like your screenshot */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Set up your organization profile</h1>
          <div className="mt-2 w-24 h-1 bg-amber-400 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Main content / form (keeps your original form intact) */}
          <main className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">New Vendor</h2>

              {/* Your original form preserved (only spacing/wrapping changed) */}
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">Vendor Name</label>
                    <input type="text" required className="w-full border rounded px-3 py-2 bg-white" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">Organisation name</label>
                    <input type="text" required className="w-full border rounded px-3 py-2 bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">Email</label>
                    <input type="email" required className="w-full border rounded px-3 py-2 bg-white" />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">Phone</label>
                    <input type="tel" required className="w-full border rounded px-3 py-2 bg-white" />
                  </div>
                </div>

                {/* optional extra fields row (keeps your comment 'Add more fields as needed') */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">Country</label>
                    <select className="w-full border rounded px-3 py-2 bg-white">
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">State</label>
                    <input type="text" className="w-full border rounded px-3 py-2 bg-white" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-600">Postal Code</label>
                    <input type="text" className="w-full border rounded px-3 py-2 bg-white" />
                  </div>
                </div>

                <div className="pt-2 flex gap-4">
                  <button type="submit" className="bg-amber-500 text-white px-5 py-2 rounded font-semibold hover:bg-amber-600 transition">
                    Save
                  </button>
                  <button onClick={() => navigate("/vendors")} type="button" className="border border-gray-300 px-5 py-2 rounded hover:bg-gray-50 transition">
                    Cancel
                  </button>
                </div>
              </form>
            </section>

            {/* Below the form: regional settings preview area (mimics your screenshot layout) */}
            <section className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm tracking-widest text-gray-500 mb-4">REGIONAL SETTINGS</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 block mb-2">Currency</label>
                  <div className="w-full border rounded px-3 py-2 bg-gray-50">INR - Indian Rupee</div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 block mb-2">Language</label>
                  <div className="w-full border rounded px-3 py-2 bg-gray-50">English</div>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 block mb-2">Time Zone</label>
                  <div className="w-full border rounded px-3 py-2 bg-gray-50">(GMT 5:30) India Standard Time (Asia/Calcutta)</div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-1">Note:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>You can update these preferences from Settings anytime.</li>
                  <li>The language you select on this page will be the default language for the following features even if you change the language later.</li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div />
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-red-500 text-white rounded">Get Started</button>
                  <button className="px-4 py-2 border border-gray-300 rounded">Go Back</button>
                </div>
              </div>
            </section>
          </main>

          {/* RIGHT: Sidebar with panels (marketplaces, features, shipping partners) */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-amber-400">
              <h4 className="text-sm font-semibold text-amber-700 mb-2">Your Go-To</h4>
              <p className="text-sm text-gray-600 mb-4">Marketplaces All in One Place!</p>
              <div className="flex flex-wrap gap-3">
                {/* Replace these img srcs with your logos as needed */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="amazon" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Etsy_logo.svg" alt="etsy" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Ebay_logo.svg" alt="ebay" className="h-8" />
                <img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="shopify" className="h-8" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-amber-400">
              <h4 className="text-sm font-semibold text-amber-700 mb-2">Simplify Order Fulfilment</h4>
              <p className="text-sm text-gray-600 mb-4">Reliable Shipping Partners!</p>
              <div className="grid grid-cols-2 gap-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/DHL_Express_logo.svg" alt="dhl" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/UPS_Logo_Shield_2017.svg" alt="ups" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/USPS_logo.svg" alt="usps" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/ShipRocket_logo.svg" alt="shiprocket" className="h-8" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-amber-400">
              <h4 className="text-sm font-semibold text-amber-700 mb-3">Key Features</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Serial and Batch Tracking</li>
                <li>• Warehouse Management</li>
                <li>• Stock Counting</li>
                <li>• Bin Location</li>
                <li>• Barcode Generation</li>
                <li>• Item Groups & Composite Items</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm text-center text-xs text-gray-500">
              <div>Welcome <span className="font-semibold">Bravebuddy</span></div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
