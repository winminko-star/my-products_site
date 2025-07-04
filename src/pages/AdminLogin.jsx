import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  useEffect(() => {
    // Already logged in admin, auto redirect
    if (localStorage.getItem("adminAccess") === "true") {
      navigate("/admin", { replace: true }); // ✅ Fix here
    }
  }, []);

  const handleLogin = () => {
    if (input === "504119004") {
      localStorage.setItem("adminAccess", "true");
      navigate("/admin", { replace: true }); // ✅ Fix here
    } else {
      toast.error("Wrong Admin Password");
    }
  };

  return (
    <div style={centerStyle}>
      <h1>Enter Admin Password</h1>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Admin password"
        style={inputStyle}
      />
      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
    </div>
  );
}

// Inline styles
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
