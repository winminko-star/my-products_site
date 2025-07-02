// src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import SummaryPage from "./pages/SummaryPage";
import OrderList from "./pages/OrderList";
import TablePicker from "./pages/TablePicker";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [appAccess, setAppAccess] = useState(false);
  const [adminAccess, setAdminAccess] = useState(false);
  const [appInput, setAppInput] = useState("");
  const [adminInput, setAdminInput] = useState("");

  // ✅ Reload Protection using localStorage
  useEffect(() => {
    const storedAppAccess = localStorage.getItem("appAccess");
    if (storedAppAccess === "true") {
      setAppAccess(true);
    }

    const storedAdminAccess = localStorage.getItem("adminAccess");
    if (storedAdminAccess === "true") {
      setAdminAccess(true);
    }
  }, []);

  // ✅ App Password Check
  const checkAppPassword = () => {
    if (appInput === "852022") {
      localStorage.setItem("appAccess", "true");
      setAppAccess(true);
    } else {
      toast.error("Wrong App Password");
    }
  };

  // ✅ Admin Password Check
  const checkAdminPassword = () => {
    if (adminInput === "504119004") {
      localStorage.setItem("adminAccess", "true");
      setAdminAccess(true);
    } else {
      toast.error("Wrong Admin Password");
    }
  };

  // ✅ Step 1: App Password UI
  if (!appAccess) {
    return (
      <div style={centerStyle}>
        <h1>Enter App Password</h1>
        <input
          type="password"
          value={appInput}
          onChange={(e) => setAppInput(e.target.value)}
          placeholder="Enter password"
          style={inputStyle}
        />
        <button onClick={checkAppPassword} style={buttonStyle}>
          Enter
        </button>
        <Toaster />
      </div>
    );
  }

  // ✅ Main App with Routes
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<UserPanel />} />
        <Route path="/pick-table" element={<TablePicker />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route
          path="/admin"
          element={
            adminAccess ? (
              <AdminPanel />
            ) : (
              <div style={centerStyle}>
                <h1>Enter Admin Password</h1>
                <input
                  type="password"
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  placeholder="Admin password"
                  style={inputStyle}
                />
                <button onClick={checkAdminPassword} style={buttonStyle}>
                  Login
                </button>
              </div>
            )
          }
        />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

// ✅ Inline Styles
const centerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
};

const buttonStyle = {
  padding: "8px 16px",
};
