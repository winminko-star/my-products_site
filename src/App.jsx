import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import SummaryPage from "./pages/SummaryPage";
import OrderList from "./pages/OrderList";
import TablePicker from "./pages/TablePicker";
import EditOrder from "./pages/EditOrder";
import AccessDenied from "./pages/AccessDenied";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [adminAccess, setAdminAccess] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem("adminAccess") === "true";
    setAdminAccess(access);
  }, []);

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<TablePicker />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/edit/:tableId/:orderIndex" element={<EditOrder />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            adminAccess ? <AdminPanel /> : <Navigate to="/admin-login" replace />
          }
        />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
          }
