import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const TablePicker = () => {
  const navigate = useNavigate();

  // ✅ Already assigned table? Prevent coming back
  useEffect(() => {
    const assigned = localStorage.getItem("assignedTable");
    if (assigned) {
      navigate("/user");
    }
  }, []);

  const handleSelect = (tableNumber) => {
    localStorage.setItem("assignedTable", tableNumber);
    navigate("/user");
  };

  const handleAdmin = () => {
    const pwd = prompt("Enter Admin Password");
    if (pwd === "504119004") {
      navigate("/admin-login");
    } else {
      alert("Incorrect password");
    }
  };

  const tableButtons = [];
  for (let i = 1; i <= 30; i++) {
    tableButtons.push(
      <button
        key={i}
        className="table-btn"
        onClick={() => handleSelect(i)}
      >
        Table {i}
      </button>
    );
  }

  return (
    <div className="table-picker-container">
      <h1 className="title">Select Your Table</h1>
      <div className="table-grid">{tableButtons}</div>
      <button className="admin-btn" onClick={handleAdmin}>
        Admin
      </button>
    </div>
  );
};

export default TablePicker;
