
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function KitchenLogin() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const checkPassword = () => {
    if (input === "kitchen2025") {
      localStorage.setItem("kitchenAccess", "true");
      navigate("/kitchen-panel");
    } else {
      toast.error("Wrong password");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #8e2de2, #4a00e0)",
      color: "white"
    }}>
      <h1 style={{ marginBottom: 20 }}>Kitchen Panel Login</h1>
      <input
        type="password"
        placeholder="Enter kitchen password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: 10, borderRadius: 8, border: "none", marginBottom: 10 }}
      />
      <button
        onClick={checkPassword}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          border: "none",
          backgroundColor: "#4caf50",
          color: "white",
          fontWeight: "bold"
        }}
      >
        Login
      </button>
    </div>
  );
        }
