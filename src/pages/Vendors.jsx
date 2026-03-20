import React, { useState } from "react";
import TopBar from "../components/TopBar.jsx";
import { useNavigate } from "react-router-dom";

const SAMPLE_VENDORS = [
  { name: "Acme Supplies Ltd.", email: "sales@acmesupplies.com", phone: "+91-9000000000", status: "Active", purchases: 12 },
  { name: "Jain Paper House", email: "info@jainpaper.com", phone: "+91-9888888888", status: "Active", purchases: 4 },
  // Add more sample or fetched vendors here
];

export default function Vendors() {
    const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState(SAMPLE_VENDORS);

  // In your real app, search/filter on server side
  const filtered = vendors.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    
    <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div>
      <TopBar title="Vendors" onNew={() => navigate('/vendors/new')} />
      {/* rest of your Vendors page */}
    </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Vendors</h1>
          <div className="flex gap-3">
            <input
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm focus:ring-1 focus:ring-blue-200"
              placeholder="Search vendors..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">Create New Vendor</button>
            <button
  onClick={() => navigate("/vendors/new")}
  className="px-5 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
>
  Create New Vendor
</button>

          </div>
        </div>
        <div className="flex items-center mb-4 gap-4">
          <button className="text-blue-700 text-sm hover:underline">Click here to import vendors from file</button>
          <span className="text-gray-400 text-sm">or using</span>
          <span className="flex gap-2">
            <img src="https://cdn.worldvectorlogo.com/logos/google-icon.svg" alt="Google" className="h-5" />
            <img src="https://cdn.worldvectorlogo.com/logos/microsoft.svg" alt="Microsoft" className="h-5" />
          </span>
        </div>
        {
          filtered.length === 0 ? (
            <div className="bg-white text-center rounded-xl shadow border border-gray-100 p-16 mt-8">
              <div className="text-3xl mb-3">😶</div>
              <div className="font-semibold text-gray-600">No Vendors Found</div>
              <div className="text-gray-400 mb-4">Create your first vendor to start managing purchases.</div>
              <button className="px-8 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">+ New Vendor</button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow border border-gray-100 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 text-left">
                    <th className="p-3 font-semibold">Vendor Name</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Phone</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Purchases</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={i} className="border-t border-gray-100 hover:bg-blue-50">
                      <td className="px-3 py-2">{v.name}</td>
                      <td className="px-3 py-2">{v.email}</td>
                      <td className="px-3 py-2">{v.phone}</td>
                      <td className="px-3 py-2">{v.status}</td>
                      <td className="px-3 py-2">{v.purchases}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
      </div>
    </div>
  );
}
