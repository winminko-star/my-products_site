import React, { useEffect } from "react"; import { useNavigate } from "react-router-dom"; import "../index.css";

const TablePicker = () => { const navigate = useNavigate();

useEffect(() => { const assigned = localStorage.getItem("assignedTable"); if (assigned) { navigate("/user", { replace: true }); } }, []);

const handleTableSelect = (tableId) => { localStorage.setItem("assignedTable", tableId); setTimeout(() => { navigate("/user", { replace: true }); }, 100); };

const handleAdmin = () => { const pwd = prompt("Enter Admin Password"); if (pwd === "504119004") { navigate("/admin-login"); } else { alert("Incorrect password"); } };

const tableButtons = []; for (let i = 1; i <= 30; i++) { tableButtons.push( <button key={i} className="fancy-btn" onClick={() => handleTableSelect(i)} > Table {i} </button> ); }

return ( <div className="table-picker-container animated-background"> <h1 className="rainbow-title">🪑 Table ရွေးပါ</h1> <div className="table-grid">{tableButtons}</div> <button className="fancy-btn" onClick={handleAdmin}> Admin </button> </div> ); };

export default TablePicker;

