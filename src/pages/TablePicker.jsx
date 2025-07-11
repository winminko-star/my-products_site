// Updated TablePicker.jsx import React from "react"; import { useNavigate } from "react-router-dom"; import "../index.css";

export default function TablePicker() { const navigate = useNavigate();

const pickTable = (id) => { localStorage.setItem("assignedTable", id); navigate("/user"); };

return ( <div className="table-picker-container animated-background"> <h1 className="rainbow-title">🪑 Table ရွေးပါ</h1> <div className="table-grid"> {Array.from({ length: 30 }, (_, i) => ( <button key={i + 1} className="fancy-btn" onClick={() => pickTable((i + 1).toString())} > Table {i + 1} </button> ))} </div> </div> ); }

