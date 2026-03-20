import React from "react";
import { useNavigate } from "react-router-dom";

const dashboardCards = [
  {
    label: "Add Items",
    description: "Create, manage and categorize your warehouse inventory items.",
    icon: "📦",
    link: "/items"
  },
  {
    label: "View Reports",
    description: "Generate insightful sales, inventory, and account reports.",
    icon: "📊",
    link: "/reports"
  },
  {
    label: "Customers",
    description: "Manage all your customer profiles, orders, and addresses.",
    icon: "👥",
    link: "/customers"
  },
  {
    label: "Vendors",
    description: "Search, add, or update your supplier/vendor information.",
    icon: "🧑‍💼",
    link: "/vendors"
  },
  {
    label: "Purchases",
    description: "Track all purchase orders, bills, and expenses.",
    icon: "🧾",
    link: "/purchases"
  },
  {
    label: "Settings",
    description: "Configure your company settings, tax, users, and integrations.",
    icon: "⚙️",
    link: "/settings"
  }
];

export default function WelcomeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f6f3] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to WMS Central!</h1>
        <p className="text-center text-gray-500 mb-8 text-lg">
          Get started by choosing what you want to do:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {dashboardCards.map(card => (
            <div
              key={card.label}
              onClick={() => navigate(card.link)}
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col items-center p-8 border border-gray-100 group"
            >
              <span className="text-5xl mb-4">{card.icon}</span>
              <div className="font-bold text-lg group-hover:text-blue-700">{card.label}</div>
              <div className="text-gray-500 mt-2 text-center">{card.description}</div>
              <button className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">Go</button>
            </div>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <img src="/illustration_dashboard1.svg" alt="" className="rounded-lg shadow-lg hidden md:block" />
          <img src="/illustration_dashboard2.svg" alt="" className="rounded-lg shadow-lg hidden md:block" />
          {/* Use your own illustration or informative image */}
        </div>
      </div>
    </div>
  );
}
