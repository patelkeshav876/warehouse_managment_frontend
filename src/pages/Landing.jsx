import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* Motion helpers (non-invasive) --
   If you prefer nothing changed, remove the two imports below and the useEffect() call.
*/
import { MotionDiv, Stagger, FloatBlob, AnimatedButton, injectWarmPalette } from "./motion-utils";
import "../warm-palette.css";

const Landing = () => {
  const navigate = useNavigate();

  // keep palette injection non-destructive; safe to remove if undesired
  useEffect(() => { injectWarmPalette(); }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212529] via-[#343a40] to-[#343a40]  flex flex-col">
      {/* Top Nav */}
      <nav className="flex justify-between items-center p-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#b077fd] to-[#f390cf] rounded-xl flex items-center justify-center shadow-lg">
            <span role="img" aria-label="logo" className="text-2xl">📦</span>
          </div>
          <span className="font-bold text-2xl text-white">WMS Central</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-white/80 hover:text-white transition px-5 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-gradient-to-r from-[#c66efd] to-[#ff7edb] text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition"
          >
            Get Started →
          </button>

          <button
            onClick={() => navigate("/account")}
            className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            My Account
          </button>
        </div>
      </nav>

      {/* Hero + Card */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between px-14 py-10 gap-10">
        {/* Left - Text */}
        <div className="max-w-lg">
          <h1 className="text-white font-black text-5xl md:text-6xl mb-6 leading-snug">
            Smart <span className="text-pink-300">Warehouse</span><br />Management
          </h1>
          <p className="text-purple-100 text-lg mb-8">
            Streamline your warehouse operations with our comprehensive management system.
            Track inventory, manage orders, and optimize your supply chain with real-time insights.
          </p>
          <div className="flex gap-4 mb-8">
            <button
              className="bg-gradient-to-r from-[#d16ba5] to-[#86a8e7] py-4 px-8 rounded-lg text-lg font-bold text-white shadow-lg hover:scale-105 transition"
              onClick={() => navigate("/register")}
            >
              Start Free Trial →
            </button>
            <button
              className="bg-[#ffffff15] border border-white/30 backdrop-blur-lg py-4 px-8 rounded-lg text-lg font-semibold text-white hover:bg-white/10 transition"
              onClick={() => navigate("/register")}
            >
              Watch Demo
            </button>
          </div>
          <div className="flex gap-6 text-xs text-purple-100">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-extrabold">●</span>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-extrabold">●</span>
              14-day free trial
            </div>
          </div>
        </div>

        {/* Right - Glass Card */}
        <div className="relative w-full  max-w-xl  flex-col gap-10 ">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl z-0 "></div>
          <div className="relative z-10 rounded-2xl bg-white/10 backdrop-blur-2xl p-8 border border-white/20 shadow-xl ">
            <div className="flex items-center justify-between mb-3 ">
              <h3 className="text-xl font-bold text-white">Dashboard Overview</h3>
              <div className="flex items-center gap-4">
                <span className="bg-yellow-400 w-3 h-3 rounded-full"></span>
                <span className="text-sm text-purple-100">Live Updates</span>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6 mb-5">
              <div className="bg-white/10 rounded-xl p-7 flex flex-col items-center">
                <span className="text-2xl text-white font-bold">99.9%</span>
                <span className="text-purple-100 text-sm">Uptime</span>
              </div>
              <div className="bg-white/10 rounded-xl p-7 flex flex-col items-center">
                <span className="text-2xl text-white font-bold">50+</span>
                <span className="text-purple-100 text-sm">Warehouses</span>
              </div>
              <div className="bg-white/10 rounded-xl p-7 flex flex-col items-center">
                <span className="text-2xl text-white font-bold">10M+</span>
                <span className="text-purple-100 text-sm">Items Tracked</span>
              </div>
              <div className="bg-white/10 rounded-xl p-7 flex flex-col items-center">
                <span className="text-2xl text-white font-bold">24/7</span>
                <span className="text-purple-100 text-sm">Support</span>
              </div>
            </div>

            <div>
              
              <br></br>
              <p></p> 
             
              <br></br>
              <p></p>
              
              <br></br>
              
              
            </div>
            {/* Bars */}
            <div className="mb-7" >
              <div className="flex justify-between items-center">
                <span className="text-purple-100">Inward Stock</span>
                <span className="text-cyan-300 font-bold">+15%</span>
              </div>
              <div className="w-full bg-purple-300/20 rounded-full h-2.5 mt-1 overflow-hidden">
                <div className="bg-cyan-300 h-2.5 rounded-full w-[80%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-purple-100">Outward Stock</span>
                <span className="text-pink-300 font-bold">+8%</span>
              </div>
              <div className="w-full bg-pink-300/20 rounded-full h-2.5 mt-1 overflow-hidden">
                <div className="bg-pink-300 h-2.5 rounded-full w-[40%]"></div>
              </div>
            </div>
            {/* Accuracy pill */}
            <div className="absolute -bottom-8 left-5 px-4 py-2 bg-gradient-to-r from-[#a3f9e8] to-[#d0a7ff] rounded-2xl shadow-lg text-slate-700 text-sm font-semibold flex items-center gap-1">
              <span>98.5%</span>
              <span className="text-xs font-normal">Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle - Features */}
      <div className="bg-gradient-to-br from-transparent via-purple-800/30 to-transparent py-20">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl text-white font-bold mb-2">Powerful Features</h2>
          <div className="text-purple-100 mb-12 text-lg text-center">
            Everything you need to manage your warehouse operations efficiently and effectively.
          </div>
          <div className="w-full grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Smart Inventory Tracking",
                desc: "Real-time tracking of inward and outward stock movements with barcode integration",
                icon: "🚚"
              },
              {
                title: "Order Management",
                desc: "Complete order lifecycle management from creation to delivery",
                icon: "📋"
              },
              {
                title: "Analytics Dashboard",
                desc: "Comprehensive reports and insights for better decision making",
                icon: "📊"
              },
              {
                title: "Multi-location Support",
                desc: "Manage inventory across multiple warehouse locations and zones",
                icon: "📦"
              },
            ].map((f, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 flex flex-col items-center shadow-md">
                <div className="w-12 h-12 mb-4 text-xl flex items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-700">
                  {f.icon}
                </div>
                <div className="text-xl font-bold mb-1 text-white text-center">{f.title}</div>
                <div className="text-purple-100 text-center">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-8 py-20 bg-gradient-to-b from-purple-900 via-purple-800/70 to-transparent text-center">
        <div className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your <span className="text-pink-200">Warehouse Operations?</span>
        </div>
        <div className="text-lg text-purple-100 mb-8">
          Join thousands of companies that trust WMS Central to manage their inventory and optimize their supply chain.
        </div>
        <button
          className="px-12 py-4 text-lg rounded-xl font-bold bg-gradient-to-r from-pink-500 to-purple-400 text-white shadow-lg transition hover:scale-105"
          onClick={() => navigate("/register")}
        >
          Start Your Free Trial Today →
        </button>
        <div className="text-purple-300 mt-12 text-sm">
          © 2024 WMS Central. All rights reserved.
        </div>
      </div>

      {/* Adding new code from here */}
      <div className="bg-transparent py-8">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <span className="uppercase tracking-widest text-purple-200 mb-3 text-xs">Trusted by leading brands<br></br></span>
          <div>
            space
          </div>
          <div>
            space
          </div>
            <div className="flex gap-8 flex-wrap justify-center">
              {/* Replace these SVGs with your client logos as needed */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Client" className="h-60 w-100 opacity-90" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Client" className="h-60 w-50 opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Client" className="h-80 w-40 opacity-60" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="Client" className="h-80 w-40 opacity-60" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" alt="Client" className="h-80 w-40 opacity-60" />
            </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-transparent via-purple-800/30 to-transparent py-16">
        <div className="max-w-4xl mx-auto text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-purple-200 mb-8">Start tracking. Connect orders. Transform operations. It's that simple.</p>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch text-white">
          {[
            {title:"Sign Up", desc:"Create your free account and set up your warehouse profile.", icon:"📝"},
            {title:"Connect Channels", desc:"Integrate with Shopify, Amazon, eBay, or upload Excel.", icon:"🔌"},
            {title:"Track Inventory", desc:"Monitor inward/outward stock, get real-time alerts.", icon:"📦"},
            {title:"Analyze & Report", desc:"View dashboards. Download reports. Make business decisions.", icon:"📊"}
          ].map((s,i)=>(

            <div className="flex-1 bg-white/10 rounded-2xl p-6 text-center backdrop-blur-lg border border-white/10 shadow-md flex flex-col items-center" key={i}>
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="font-bold text-lg mb-2">{s.title}</div>
              <div className="text-purple-100">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-transparent via-purple-800/40 to-transparent py-16">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col items-center">
              <div className="text-3xl mb-2">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-purple-100 mb-2">"WMS Central took our fulfillment speed to a new level!"</p>
              <span className="text-white font-bold">Priya S</span>
              <span className="text-purple-300 text-xs">Operations Manager</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col items-center">
              <div className="text-3xl mb-2">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-purple-100 mb-2">"Best dashboard for tracking. Love the Excel import!"</p>
              <span className="text-white font-bold">Rahul T</span>
              <span className="text-purple-300 text-xs">Warehouse Lead</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-xl border border-white/10 shadow-lg flex flex-col items-center">
              <div className="text-3xl mb-2">⭐️⭐️⭐️⭐️⭐️</div>
              <p className="text-purple-100 mb-2">"Reports section helps us a lot in forecasting."</p>
              <span className="text-white font-bold">Elena G</span>
              <span className="text-purple-300 text-xs">Logistics, KR Ltd</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- New Professional Customer Interaction Section (added, non-destructive) */}
      <div className="bg-transparent py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Want a personalised demo?</h3>
              <p className="text-purple-200 mb-6">Schedule a 20-minute walkthrough with one of our product specialists. We'll tailor the demo to your workflows and answer pricing and integration questions.</p>
              <div className="flex gap-4">
                <AnimatedButton onClick={() => navigate("/register")} className="px-6 py-3 rounded-lg font-bold" style={{ background: "linear-gradient(90deg,var(--warm-500),var(--warm-600))", color: "#fff" }}>
                  Request Demo
                </AnimatedButton>
                <button onClick={() => navigate("/contact")} className="px-6 py-3 rounded-lg border border-white/20 text-white">Contact Sales</button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-purple-200">
                <div>
                  <div className="font-bold text-white">Quick Setup</div>
                  <div>Onboard in under 48 hours</div>
                </div>
                <div>
                  <div className="font-bold text-white">Secure</div>
                  <div>Enterprise-grade data security</div>
                </div>
                <div>
                  <div className="font-bold text-white">Integrations</div>
                  <div>Shopify, Amazon, Excel & more</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <form className="space-y-3">
                <input className="w-full px-4 py-3 bg-slate-900 rounded-md" placeholder="Your name" />
                <input className="w-full px-4 py-3 bg-slate-900 rounded-md" placeholder="Company email" />
                <input className="w-full px-4 py-3 bg-slate-900 rounded-md" placeholder="Company name" />
                <div className="flex gap-3">
                  <button type="submit" className="px-4 py-3 bg-indigo-600 rounded-md">Request Demo</button>
                  <button type="button" className="px-4 py-3 border border-white/20 rounded-md">Schedule 1:1</button>
                </div>
                <div className="text-xs text-purple-300 mt-2">We’ll never share your details. By submitting you agree to our privacy policy.</div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-transparent py-8 mt-4">
        <div className="max-w-600xl mx-auto flex flex-col items-center">
          <h3 className="uppercase tracking-widest text-purple-200 mb-5 text-xs font-semibold">Works With</h3>
          <div className="flex gap-8 flex-wrap justify-center">
            <img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" className="h-80 w-40 opacity-70" alt="Shopify"/>
            <img src="https://cdn.worldvectorlogo.com/logos/woocommerce.svg" className="h-80 w-40 opacity-70" alt="Woocommerce"/>
            <img src="https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg" className="h-80 w-40 opacity-70" alt="Amazon"/>
            <img src="https://cdn.worldvectorlogo.com/logos/ebay-13.svg" className="h-80 w-40 opacity-70" alt="Ebay"/>
            <img src="https://cdn.worldvectorlogo.com/logos/excel-4.svg" className="h-80 w-40 opacity-70" alt="Excel"/>
          </div>
        </div>


  <MotionDiv className="max-w-6xl mx-auto py-12">
  <div className="grid md:grid-cols-2 gap-8 items-center">
    <div>
      <h3 className="text-3xl font-bold text-white mb-3">Real-time Insights</h3>
      <p className="text-purple-200 mb-6">Live dashboards, anomaly detection, and alerts so you never run out of stock unexpectedly.</p>
      <div className="flex gap-6">
        <div className="text-center">
          <div className="text-4xl font-extrabold text-white">99.9%</div>
          <div className="text-sm text-purple-200">System Uptime</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-extrabold text-white">10M+</div>
          <div className="text-sm text-purple-200">Items Tracked</div>
        </div>
      </div>
    </div>
    <div className="w-full bg-white/5 rounded-2xl p-6">
      {/* Replace with a small inline SVG or screenshot of your dashboard */}
      <div className="h-56 bg-gradient-to-tr from-[#2b2b3a] to-[#1f1f2a] rounded-lg flex items-center justify-center text-sm text-purple-200">Dashboard preview (replace)</div>
    </div>
  </div>
</MotionDiv>
<MotionDiv className="py-8">
  <div className="max-w-6xl mx-auto flex gap-8 items-center justify-center flex-wrap">
    <FloatBlob className="w-28 h-28 rounded-xl" style={{background:'var(--grad-a)', opacity:0.08}} />
    {/* logos */}
    <img src="..." alt="logo" className="h-12 opacity-80" />
    <img src="..." alt="logo" className="h-12 opacity-80" />
    <img src="..." alt="logo" className="h-12 opacity-80" />
  </div>
</MotionDiv>
  <MotionDiv className="bg-white/5 rounded-2xl p-8 max-w-4xl mx-auto my-12">
  <h4 className="font-bold text-white">Get product updates</h4>
  <p className="text-purple-200 mb-4">Monthly product tips and new feature previews.</p>
  <div className="flex gap-3">
    <input className="flex-1 px-4 py-3 bg-slate-900 rounded-md" placeholder="Email address" />
    <AnimatedButton className="px-5 py-3 rounded-md" style={{background:'var(--grad-a)', color:'#fff'}}>Subscribe</AnimatedButton>
  </div>
</MotionDiv>

 
  <div className="w-full bg-white border-t border-gray-200 mt-16">
  <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row md:justify-between gap-10">
    {/* Footer grid */}
    <div className="w-full flex flex-wrap gap-8">
      <div className="min-w-[120px]">
        <h3 className="font-bold mb-2">Shop</h3>
        <ul className="space-y-1 text-sm text-black/90">
          <li>vendors</li>
          <li>Inventory</li>
          <li>Orders</li>
          <li>Purchases</li>
          <li>Clients</li>
        </ul>
      </div>
      <div className="min-w-[180px]">
        <h3 className="font-bold mb-2">Corporate Info</h3>
        <ul className="space-y-1 text-sm text-black/90">
          <li>CAREER AT WMS</li>
          <li>ABOUT WMS GROUP</li>
          <li>SUSTAINABILITY WMS GROUP</li>
          <li>PRESS</li>
          <li>INVESTOR RELATIONS</li>
          <li>CORPORATE GOVERNANCE</li>
        </ul>
      </div>
      <div className="min-w-[170px]">
        <h3 className="font-bold mb-2">Help</h3>
        <ul className="space-y-1 text-sm text-black/90">
          <li>CUSTOMER SERVICE</li>
          <li>MY WMS</li>
          <li>FIND A STORE</li>
          <li>LEGAL & PRIVACY</li>
          <li>CONTACT</li>
          <li>SECURE SHOPPING</li>
          <li>COOKIE NOTICE</li>
          <li>COOKIE SETTINGS</li>
        </ul>
      </div>
      <div className="flex-1">
        <div className="mb-3 text-sm">Sign up now and be the first to know about exclusive offers, latest fashion news & style tips!</div>
        <a href="#" className="text-black underline text-sm font-semibold hover:text-blue-700">READ MORE</a>
      </div>
    </div>
  </div>
  <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between text-xs text-black/70 pb-6">
    <div className="flex items-center gap-2 mb-2">
      <span className="font-extrabold text-2xl tracking-tight">WMS</span>
      <span className="ml-4 font-semibold">INDIA (Rs.)</span>
      <a href="#" className="ml-2 underline hover:text-blue-700">CHANGE REGION</a>
    </div>
    <div className="flex items-center gap-4 mb-2">
      {/* Replace below with your own social logo SVGs if you wish */}
      <a href="#" aria-label="Instagram"><svg className="h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.163c3.204,0,3.584,0.012,4.85,0.07c1.206,0.057,2.037,0.248,2.51,0.415c0.64,0.223,1.096,0.51,1.575,0.989 c0.479,0.479,0.766,0.935,0.989,1.575c0.167,0.473,0.358,1.304,0.415,2.51c0.058,1.266,0.07,1.646,0.07,4.85 s-0.012,3.584-0.07,4.85c-0.057,1.206-0.248,2.037-0.415,2.51c-0.223,0.64-0.51,1.096-0.989,1.575s-0.935,0.766-1.575,0.989 c-0.473,0.167-1.304,0.358-2.51,0.415c-1.266,0.058-1.646,0.07-4.85,0.07s-3.584-0.012-4.85-0.07c-1.206-0.057-2.037-0.248-2.51-0.415 c-0.64-0.223-1.096-0.51-1.575-0.989s-0.766-0.935-0.989-1.575c-0.167-0.473-0.358-1.304-0.415-2.51 c-0.058-1.266-0.07-1.646-0.07-4.85s0.012-3.584,0.07-4.85c0.057-1.206,0.248-2.037,0.415-2.51 c0.223-0.64,0.51-1.096,0.989-1.575s0.935-0.766,1.575-0.989c0.473-0.167,1.304-0.358,2.51-0.415C8.416,2.175,8.796,2.163,12,2.163 M12,0 C8.741,0,8.332,0.015,7.053,0.073c-1.276,0.059-2.577,0.272-3.637,0.583C2.003,1.008,1.023,1.664,0.297,2.39 c-0.727,0.727-1.383,1.707-1.734,3.119C-1.342,6.423-1.435,7.314-1.494,9.053C-1.551,10.333-1.564,10.741-1.564,12 s0.013,1.667,0.07,2.947c0.059,1.739,0.152,2.63,0.211,3.871c0.351,1.411,1.007,2.392,1.734,3.119 c0.726,0.726,1.707,1.383,3.119,1.734c1.141,0.269,2.432,0.492,3.871,0.551C8.332,23.984,8.741,24,12,24s3.668-0.016,4.947-0.073 c1.438-0.059,2.729-0.282,3.871-0.551c1.412-0.351,2.393-1.008,3.119-1.734c0.727-0.727,1.383-1.707,1.734-3.119 c0.059-1.241,0.152-2.132,0.211-3.871c0.057-1.28,0.07-1.688,0.07-2.947s-0.013-1.667-0.07-2.947 c-0.059-1.739-0.152-2.63-0.211-3.871c-0.351-1.412-1.007-2.392-1.734-3.119c-0.726-0.726-1.707-1.383-3.119-1.734 c-1.141-0.269-2.432-0.492-3.871-0.551C15.668,0.016,15.259,0,12,0L12,0z"/><path d="M12,5.838c-3.403,0-6.162,2.759-6.162,6.162S8.597,18.162,12,18.162S18.162,15.403,18.162,12 S15.403,5.838,12,5.838z M12,16.162c-2.298,0-4.162-1.863-4.162-4.162S9.702,7.838,12,7.838s4.162,1.863,4.162,4.162 S14.298,16.162,12,16.162z"/><circle cx="18.406" cy="5.594" r="1.44"/></svg></a>
      {/* Add more icons as needed */}
    </div>
  </div>
  <div className="w-full text-center text-xs text-black/40 pb-8 px-2">
    The content of this site is copyright-protected and is the property of WMS.
  </div>
</div>

        </div>
      </div>
  );
};

export default Landing;
