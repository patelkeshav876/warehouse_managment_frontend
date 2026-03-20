import { NavLink } from "react-router-dom";

export const Sidebar = () => (
  <aside className="h-screen w-64 bg-[#232949] text-white flex flex-col border-r border-gray-200">
    <div className="h-20 flex items-center justify-center font-bold text-xl">Inventory</div>
    <nav className="flex-1 flex flex-col gap-1">
      <SidebarLink icon="🏠" label="Home" path="/" />
      <SidebarLink icon="📦" label="Items" path="/items" />
      <SidebarLink icon="🏬" label="Inventory" path="/inventory" />
      <SidebarLink icon="💰" label="Sales" path="/sales" />
      <SidebarLink icon="🪙" label="Purchases" path="/purchases" />
      <SidebarLink icon="📊" label="Reports" path="/reports" />
      <SidebarLink icon="📄" label="Documents" path="/documents" />
      <NavLink
        to="/vendors"
        className={({ isActive }) =>
          isActive
            ? 'bg-blue-600 text-white px-4 py-2 rounded block font-semibold'
            : 'text-gray-700 hover:bg-blue-50 px-4 py-2 rounded block'}
      >
        🧑‍💼 Vendors
      </NavLink>
      {/* Add more NavLinks here for other pages as needed */}
    </nav>
  </aside>
);

// SidebarLink can be updated for navigation:
const SidebarLink = ({ icon, label, path }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-3 px-6 py-3 w-full bg-blue-500 text-white rounded-r-md font-bold"
        : "flex items-center gap-3 px-6 py-3 w-full hover:bg-[#2e3657] transition text-lg font-medium rounded-r-md"
    }
    end
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
