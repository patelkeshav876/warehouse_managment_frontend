import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Inward from './pages/Inward';
import Outward from './pages/Outward';
import Orders from './pages/Orders';
import Packaging from './pages/Packaging';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import Vendors from './pages/Vendors';
import VendorsNew from "./pages/VendorsNew";
import OrganizationSetup from './pages/OrganizationSetup';
import ThemeEditor from './components/ThemeEditor';
import UserAccountPanel from "./components/UserAccountPanel";
import WelcomeDashboard from "./pages/WelcomeDashboard";



export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
       
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inward" element={<Inward />} />
        <Route path="/outward" element={<Outward />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendors/new" element={<VendorsNew />} />
        <Route path="/packaging" element={<Packaging />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<Users />} />
        
        <Route path="/items" element={<Items />} />
        <Route path="/account" element={<UserAccountPanel />} />
        
        <Route path="/organization-setup" element={<OrganizationSetup />} />
        
      </Routes>
      <ThemeEditor />
    </div>
  );
}
