import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Vanta effect for background
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          color: 0xc084fc,
          backgroundColor: 0x18143a,
          points: 11.0,
          maxDistance: 25.0,
          spacing: 15.0,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // Handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate('/dashboard');
      // navigate('/organization-setup'); 
      //navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={vantaRef} className="min-h-screen flex items-center justify-center bg-[#18143a] relative px-4">
      <div className="w-full max-w-xl grid md:grid-cols-2 gap-0 items-center relative z-10">
        {/* Left Side */}
        <div className="hidden md:flex flex-col items-left">
          <div className="ml-6">
            <div className="font-bold text-3xl text-white mb-3 mt-10">Welcome Back!</div>
            <div className="text-brown-200 text-lg mb-4">
              Experience seamless warehouse management
            </div>
          </div>
        </div>
        {/* Right - Glass Form */}
        <div className="flex items-center justify-center min-h-[80vh] relative">
          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-white/10 border border-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl flex flex-col w-[320px] min-h-[420px]"
          >
            <div className="flex items-center mb-8 gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-brown-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">WMS Central</h2>
                <p className="text-brown-200 text-xs">Warehouse Management</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 text-center">Welcome Back</h3>
            <p className="text-brown-200 text-center mb-8 text-sm">
              Login to continue managing your warehouse
            </p>
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
            )}
            <label className="block text-brown-200 mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 mb-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="email@example.com"
              required
            />
            <label className="block text-brown-200 mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 mb-6 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-brown-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-lg rounded-xl bg-gradient-to-r from-pink-500 to-brown-500 text-white font-bold shadow-md hover:scale-105 hover:shadow-pink-400/50 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="text-center mt-6">
              <span className="text-brown-200">Don't have an account?{" "}</span>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-pink-400 hover:text-pink-300 font-semibold"
              >
                Register
              </button>
            </div>
          </form>
          <button
            onClick={() => navigate("/")}
            className="absolute -top-8 left-0 text-white/80 text-sm flex items-center gap-2 hover:text-white transition-all duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
