// src/App.jsx

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import SummaryPage from "./pages/SummaryPage";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [access, setAccess] = useState(false);
  const [input, setInput] = useState("");

  const checkPassword = () => {
    if (input === "852022") {
      setAccess(true);
    } else {
      toast.error("Wrong password");
    }
  };

  if (!access) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1>Enter App Password</h1>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          style={{ padding: "8px", margin: "10px", width: "200px", textAlign: "center" }}
        />
        <button onClick={checkPassword} style={{ padding: "8px 16px", backgroundColor: "#2563eb", color: "white", borderRadius: "4px" }}>
          Unlock
        </button>
        <Toaster />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6", color: "#1f2937" }}>
      <Router>
        <Routes>
          <Route path="/" element={<UserPanel />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
        </Routes>
      </Router>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}
