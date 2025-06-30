// ✅ src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPanel from "./pages/UserPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import SummaryPage from "./pages/SummaryPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
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
