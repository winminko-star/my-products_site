// src/pages/TablePicker.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function TablePicker() {
  const navigate = useNavigate();

  const chooseTable = (tableNumber) => {
    localStorage.setItem("assignedTable", tableNumber);
    navigate("/"); // Go to main menu
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1 className="text-xl font-bold mb-4">Please select your table</h1>
      <div className="flex flex-wrap justify-center gap-2">
        {[...Array(30)].map((_, i) => (
          <button
            key={i}
            onClick={() => chooseTable(i + 1)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-400"
          >
            Table {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
    }
