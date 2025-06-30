// ✅ src/App.jsx
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
        <h1 className="text-2xl font-bold mb-4">Enter App Password</h1>
        <input
          type="password"
          className="border px-3 py-2 rounded mb-2 w-64 text-center"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter password"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={checkPassword}
        >
          Unlock
        </button>
        <Toaster />
      </div>
    );
  }

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
