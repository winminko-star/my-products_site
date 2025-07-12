import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function TablePicker() {
  const navigate = useNavigate();

  useEffect(() => {
    const assigned = localStorage.getItem("assignedTable");
    if (assigned) {
      navigate("/user", { replace: true });
    }
  }, [navigate]);

  const handleTableSelect = (tableId) => {
    localStorage.setItem("assignedTable", tableId);
    setTimeout(() => {
      navigate("/user", { replace: true });
    }, 100);
  };

  const handleAdmin = () => {
    const pwd = prompt("Enter Admin Password");
    if (pwd === "504119004") {
      navigate("/admin-login");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="table-picker-container animated-background">
      <h1 className="rainbow-title">🪑 Table ရွေးပါ</h1>

      <div className="table-grid">
        {Array.from({ length: 30 }, (_, i) => (
          <button
            key={i + 1}
            className="fancy-btn"
            onClick={() => handleTableSelect((i + 1).toString())}
          >
            Table {i + 1}
          </button>
        ))}
      </div>

      <button
        className="fancy-btn"
        style={{ marginTop: "30px", backgroundColor: "#222" }}
        onClick={handleAdmin}
      >
        Admin
      </button>
    </div>
  );
      }
