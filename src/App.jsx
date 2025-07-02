// src/App.jsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import SummaryPage from "./pages/SummaryPage";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [access, setAccess] = useState(false);
  const [input, setInput] = useState("");

  // ✅ access ကို localStorage မှာ သိမ်းထား => refresh လုပ်လည်း access မပျက်
  useEffect(() => {
    const storedAccess = localStorage.getItem("access");
    if (storedAccess === "true") {
      setAccess(true);
    }
  }, []);

  const checkPassword = () => {
    if (input === "852022") {
      setAccess(true);
      localStorage.setItem("access", "true"); // ✅ added this line
    } else {
      toast.error("Wrong password");
    }
  };

  if (!access) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Enter App Password</h1>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button
          onClick={checkPassword}
          style={{ padding: "10px 20px", marginTop: "10px" }}
        >
          Enter
        </button>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPanel />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}
