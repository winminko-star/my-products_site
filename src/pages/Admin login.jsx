// ✅ src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ADMIN_PASSWORD = "504119004";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const handleLogin = () => {
    if (input === ADMIN_PASSWORD) {
      navigate("/admin/panel");
    } else {
      toast.error("Incorrect password");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 text-center">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <input
        type="password"
        placeholder="Enter password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border px-3 py-2 w-full mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}
