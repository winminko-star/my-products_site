// ✅ src/pages/AdminLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkPassword = () => {
    if (password === "504119004") {
      toast.success("Login successful");
      localStorage.setItem("access", "true"); // ✅ browser storage ထဲသိမ်း
      navigate("/admin-panel");
    } else {
      toast.error("Wrong password");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Admin Password"
        style={{ padding: 10, fontSize: 16 }}
      />
      <button
        onClick={checkPassword}
        style={{ padding: "10px 20px", marginTop: 10 }}
      >
        Login
      </button>
    </div>
  );
}
