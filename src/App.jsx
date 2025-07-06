import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import SummaryPage from "./pages/SummaryPage";
import OrderList from "./pages/OrderList";
import TablePicker from "./pages/TablePicker";
import AccessDenied from "./pages/AccessDenied";
import EditOrder from "./pages/EditOrder";
import RequireAdmin from "./components/RequireAdmin"; // ✅ added
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [appAccess, setAppAccess] = useState(false);
  const [appInput, setAppInput] = useState("");

  useEffect(() => {
    const storedAppAccess = localStorage.getItem("appAccess");
    if (storedAppAccess === "true") {
      setAppAccess(true);
    }
  }, []);

  const checkAppPassword = () => {
    if (appInput === "WI489661@") {
      localStorage.setItem("appAccess", "true");
      setAppAccess(true);
    } else {
      toast.error("Wrong App Password");
    }
  };

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

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/pick-table" replace />} />
        <Route path="/pick-table" element={<TablePicker />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/edit/:tableId/:orderIndex" element={<EditOrder />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* ✅ Protect Admin Panel */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          }
        />
      </Routes>
    </>
  );
}

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
