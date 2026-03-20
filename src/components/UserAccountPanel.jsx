// src/components/UserAccountPanel.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/*
  UserAccountPanel
  - Place <UserAccountPanel /> in any route/page (for example in /account or /profile).
  - If you have a backend endpoint GET /api/me returning user info, it will be fetched automatically.
  - Otherwise the component shows sample data and editable demo flows.
*/

const SAMPLE_USER = {
  id: "user_001",
  fullName: "Bravebuddy azra",
  displayName: "Bravebuddy",
  email: "bravebuddy253@gmail.com",
  country: "India",
  state: "Chhattisgarh",
  timezone: "(GMT +05:30) India Standard Time (Asia/Kolkata)",
  gender: "I'd prefer not to say",
  avatarColor: "#146C94",
  emails: [
    { id: "e1", email: "bravebuddy253@gmail.com", primary: true, verified: true },
    { id: "e2", email: "brave.alt@example.com", primary: false, verified: false },
  ],
  phones: [
    { id: "p1", number: "+91 98765 43210", verified: true },
  ],
  sessions: [
    { id: "s1", agent: "Chrome · Windows", ip: "103.21.55.1", when: "2025-10-28 11:42" },
    { id: "s2", agent: "Safari · iPhone", ip: "103.21.56.2", when: "2025-10-25 07:21" },
  ],
  mfaEnabled: false,
};

const navItems = [
  { id: "personal", label: "Personal Information" },
  { id: "emails", label: "Email Addresses" },
  { id: "phones", label: "Mobile Numbers" },
  { id: "security", label: "Security & MFA" },
  { id: "sessions", label: "Sessions" },
  { id: "privacy", label: "Privacy" },
];

export default function UserAccountPanel({ fetchUrl = "/api/me" }) {
  const [user, setUser] = useState(SAMPLE_USER);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("personal");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(fetchUrl, { cache: "no-store" });
        if (!res.ok) throw new Error("no-data");
        const data = await res.json();
        if (!cancelled) {
          setUser(prev => ({ ...prev, ...data }));
        }
      } catch (e) {
        // keep sample data if fetch fails
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [fetchUrl]);

  function toggleEdit() {
    setEditing(v => !v);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    // Replace with your API call to save profile changes
    alert("Profile saved (demo). Replace handler with API call.");
    setEditing(false);
  }

  function handleMakePrimaryEmail(id) {
    setUser(prev => ({
      ...prev,
      emails: prev.emails.map(em => ({ ...em, primary: em.id === id })),
    }));
    // TODO: POST to /api/me/emails/makePrimary
  }

  function handleRemoveEmail(id) {
    setUser(prev => ({ ...prev, emails: prev.emails.filter(e => e.id !== id) }));
    // TODO: POST to /api/me/emails/remove
  }

  function handleSignOutSession(id) {
    setUser(prev => ({ ...prev, sessions: prev.sessions.filter(s => s.id !== id) }));
    // TODO: call server to revoke session
  }

  const avatarStyle = {
    background: `linear-gradient(135deg, ${user.avatarColor}, #3b82f6)`,
  };
  
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 p-6">
         <div className="max-w-7xl mx-auto mb-4">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
        >
          ← Back to Home
        </button>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* NAV */}
        <aside className="col-span-1 lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm font-semibold text-gray-600 mb-3">Profile</div>
            <nav className="flex flex-col gap-1">
              {navItems.map(n => (
                <button
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  className={`text-left px-3 py-2 rounded-md w-full ${active === n.id ? "bg-indigo-50 border-l-4 border-indigo-500" : "hover:bg-gray-50"}`}
                >
                  <div className="text-sm font-medium text-gray-700">{n.label}</div>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-4 space-y-3">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-600 mb-2">Account quick actions</div>
              <div className="flex flex-col gap-2">
                <button className="text-sm text-left px-3 py-2 rounded hover:bg-gray-50">Change password</button>
                <button className="text-sm text-left px-3 py-2 rounded hover:bg-gray-50">{user.mfaEnabled ? "Manage 2FA" : "Set up 2FA"}</button>
                <button className="text-sm text-left px-3 py-2 rounded hover:bg-gray-50">Download data</button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-sm font-semibold text-gray-600 mb-2">Security</div>
              <div className="text-xs text-gray-600">MFA: <strong className="ml-1">{user.mfaEnabled ? "Enabled" : "Disabled"}</strong></div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-1 lg:col-span-9 space-y-6">
          {/* Profile card */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={avatarStyle}>
                  {user.fullName ? user.fullName.split(" ").map(n => n[0]).slice(0,2).join("") : "U"}
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-800">{user.fullName}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={toggleEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Edit</button>
              </div>
            </div>

            {/* Key details two-col */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <div className="text-xs text-gray-500">Full Name</div>
                <div className="font-medium">{user.fullName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Display Name</div>
                <div className="font-medium">{user.displayName}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">Gender</div>
                <div className="font-medium">{user.gender}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Country/Region</div>
                <div className="font-medium">{user.country}</div>
              </div>

              <div>
                <div className="text-xs text-gray-500">State</div>
                <div className="font-medium">{user.state}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Language</div>
                <div className="font-medium">English</div>
              </div>

              <div className="md:col-span-2">
                <div className="text-xs text-gray-500">Time zone</div>
                <div className="font-medium">{user.timezone}</div>
              </div>
            </div>
          </motion.div>

          {/* Dynamic content depending on nav selection */}
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
            {active === "personal" && (
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                <p className="text-sm text-gray-600 mb-4">Manage your name, display name and other personal details.</p>

                {!editing ? (
                  <>
                    <div className="text-sm text-gray-700 mb-3">If you want to update your profile, click Edit.</div>
                  </>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Full name</label>
                      <input className="w-full border rounded px-3 py-2" defaultValue={user.fullName} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Display name</label>
                      <input className="w-full border rounded px-3 py-2" defaultValue={user.displayName} />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
                      <button type="button" onClick={()=>setEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
                    </div>
                  </form>
                )}
              </section>
            )}

            {active === "emails" && (
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">My Email Addresses</h3>
                <p className="text-sm text-gray-600 mb-4">View and manage the email addresses associated with your account.</p>

                <div className="grid gap-3">
                  {user.emails.map(e => (
                    <div key={e.id} className="flex items-center justify-between gap-3 p-3 rounded border border-gray-100">
                      <div>
                        <div className="font-medium">{e.email} {e.primary && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded ml-2">Primary</span>}</div>
                        <div className="text-xs text-gray-500">{e.verified ? "Verified" : "Not verified"}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!e.primary && <button onClick={()=>handleMakePrimaryEmail(e.id)} className="text-sm text-indigo-600 hover:underline">Make primary</button>}
                        <button onClick={()=>handleRemoveEmail(e.id)} className="text-sm text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <button onClick={()=>alert("Add email flow — replace with modal or form")} className="px-4 py-2 bg-indigo-600 text-white rounded">Add email address</button>
                  </div>
                </div>
              </section>
            )}

            {active === "phones" && (
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">Mobile Numbers</h3>
                <p className="text-sm text-gray-600 mb-4">Add or remove phone numbers used for MFA and account recovery.</p>

                <div className="grid gap-3">
                  {user.phones.map(p => (
                    <div key={p.id} className="flex items-center justify-between gap-3 p-3 rounded border border-gray-100">
                      <div>
                        <div className="font-medium">{p.number}</div>
                        <div className="text-xs text-gray-500">{p.verified ? "Verified" : "Not verified"}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={()=>alert("Verify flow")} className="text-sm text-indigo-600 hover:underline">Verify</button>
                        <button onClick={()=>alert("Remove flow")} className="text-sm text-red-600 hover:underline">Remove</button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <button onClick={()=>alert("Add phone flow")} className="px-4 py-2 bg-indigo-600 text-white rounded">Add phone number</button>
                  </div>
                </div>
              </section>
            )}

            {active === "security" && (
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">Security & Multi-Factor Authentication</h3>
                <div className="text-sm text-gray-600 mb-4">Protect your account with a second step for signing in.</div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-factor authentication</div>
                    <div className="text-xs text-gray-500">Add an extra layer of protection</div>
                  </div>
                  <div>
                    <button onClick={()=>alert("Toggle MFA — replace with real action")} className={`px-4 py-2 rounded ${user.mfaEnabled ? "bg-green-600 text-white" : "bg-gray-100"}`}>
                      {user.mfaEnabled ? "Manage" : "Enable"}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {active === "sessions" && (
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">Active Sessions</h3>
                <p className="text-sm text-gray-600 mb-4">Sign out sessions on other devices.</p>

                <div className="space-y-3">
                  {user.sessions.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 border rounded border-gray-100">
                      <div>
                        <div className="font-medium">{s.agent}</div>
                        <div className="text-xs text-gray-500">{s.ip} • {s.when}</div>
                      </div>
                      <div>
                        <button onClick={()=>handleSignOutSession(s.id)} className="text-sm text-red-600 hover:underline">Sign out</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {active === "privacy" && (
              <section className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-3">Privacy</h3>
                <p className="text-sm text-gray-600 mb-4">Manage data and privacy preferences for your account.</p>

                <div className="grid gap-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="rounded" /> <span className="text-sm">Share anonymized usage data</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked={false} className="rounded" /> <span className="text-sm">Allow marketing emails</span>
                  </label>
                </div>
              </section>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
