import React, { useState } from "react";

const initialState = {
  organizationName: "",
  industry: "",
  location: "",
  state: "",
  address: "",
  currency: "INR - Indian Rupee",
  language: "English",
  timeZone: "(GMT 5:30) India Standard Time (Asia/Calcutta)",
  inventoryStartDate: "",
  fiscalYear: "April - March"
};

const industryOptions = ["Engineering", "Retail", "Pharma", "Food", "Manufacturing"];
const stateOptions = ["Maharashtra", "Gujarat", "Delhi", "Karnataka", "Tamil Nadu"];

export default function OrganizationSetup() {
  const [form, setForm] = useState(initialState);

  // Handle form state changes
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Dummy submit for demo - link with API as needed
  const onSubmit = e => {
    e.preventDefault();
    // Send form to backend here...
    alert("Profile saved!");
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex justify-center items-center py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row p-0 overflow-hidden border border-gray-200">
        {/* Main Form */}
        <form className="flex-1 p-10" onSubmit={onSubmit}>
          <h1 className="text-center font-bold text-2xl mb-4 text-gray-800">Set up your organization profile</h1>
          <hr className="mb-8 border-gray-200" />
          <h2 className="uppercase text-xs tracking-widest font-bold text-gray-400 mb-3">Organizational Details</h2>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name<span className="text-red-500">*</span></label>
              <input name="organizationName" required value={form.organizationName} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select name="industry" value={form.industry} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50">
                  <option value="">Select</option>
                  {industryOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select name="location" value={form.location} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50">
                  <option value="">Select Country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  {/* Add more as needed */}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">State/Union Territory</label>
                <select name="state" value={form.state} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50">
                  <option value="">Select State</option>
                  {stateOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
            <div>
              <button type="button" className="text-blue-700 hover:underline text-sm mt-1">+ Add Organization Address</button>
              {/* For demo: no address input, but you can add a textarea */}
            </div>
          </div>

          <h2 className="uppercase text-xs tracking-widest font-bold text-gray-400 mb-3">Regional Settings</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select name="currency" value={form.currency} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50">
                  <option>INR - Indian Rupee</option>
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select name="language" value={form.language} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                <input name="timeZone" value={form.timeZone} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Inventory Start Date</label>
                <input name="inventoryStartDate" type="date" value={form.inventoryStartDate} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Fiscal Year</label>
                <select name="fiscalYear" value={form.fiscalYear} onChange={onChange} className="w-full px-3 py-2 rounded-md border border-gray-300 bg-gray-50">
                  <option>April - March</option>
                  <option>Jan - Dec</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex mt-10 gap-4">
            <button type="submit" className="bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-700 transition">Get Started</button>
            <button type="button" className="bg-white border border-gray-300 px-8 py-3 rounded-lg text-gray-800 font-semibold hover:bg-gray-100">Go Back</button>
          </div>
          <div className="mt-7 text-xs text-gray-400">
            <p>
              The language you select here will be the default for emails, templates, and payment modes. 
              You can update preferences from Settings anytime.
            </p>
          </div>
        </form>
        {/* Right Sidebar */}
        <aside className="bg-[#fdf8f2] px-8 py-10 w-80 flex flex-col gap-8 border-l border-gray-200">
          <section>
            <h3 className="text-sm font-semibold text-yellow-900 mb-1">Key Features of WMS Central!</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✔️ Serial and Batch Tracking</li>
              <li>✔️ Warehouse Management</li>
              <li>✔️ Stock Counting</li>
              <li>✔️ Bin Location</li>
              <li>✔️ Barcode Generation</li>
              <li>✔️ Item Groups & Composite Items</li>
              <li>✔️ Units of Measurement</li>
              <li>✔️ Picklists</li>
            </ul>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-yellow-700 mb-2">Marketplaces All In One Place!</h3>
            <div className="flex gap-2 flex-wrap">
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" />
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Etsy_logo.png" alt="Etsy" />
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Ebay_logo.svg" alt="Ebay" />
              {/* Add Shopify, WooCommerce logos etc */}
            </div>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-yellow-700 mb-2">Reliable Shipping Partners!</h3>
            <div className="flex gap-2 flex-wrap">
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/7/70/AfterShip_Logo.svg" alt="Aftership" />
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/USPS-Logo.svg" alt="USPS" />
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/DHL_Logo.svg" alt="DHL" />
              <img className="h-7" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Ups-logo.svg" alt="UPS" />
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

