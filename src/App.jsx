// src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import SummaryPage from "./pages/SummaryPage";
import OrderList from "./pages/OrderList";
import TablePicker from "./pages/TablePicker";
import { Toaster, toast } from "react-hot-toast";
import AccessDenied from "./pages/AccessDenied";

export default function App() {
  const [appAccess, setAppAccess] = useState(false);
  const [appInput, setAppInput] = useState("");

  // ✅ App access check from localStorage
  useEffect(() => {
    const storedAppAccess = localStorage.getItem("appAccess");
    if (storedAppAccess === "true") {
      setAppAccess(true);
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

  // ✅ Step 1: App Password Screen
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

  // ✅ Step 2: Main App Routes
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/" element={<TablePicker />} />                      
        <Route path="/user" element={<UserPanel />} />
        <Route path="/pick-table" element={<TablePicker />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            localStorage.getItem("adminAccess") === "true" ? (
              <AdminPanel />
            ) : (
              <div style={centerStyle}>
                <h1>Access Denied</h1>
                <p>You must login from /admin-login</p>
              </div>
            )
          }
        />
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
  textAlign: "center",
};

const inputStyle = {
  padding: "8px",
};

const buttonStyle = {
  padding: "8px 16px",
};
