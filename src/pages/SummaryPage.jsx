// Updated SummaryPage.jsx import React, { useEffect, useState } from "react"; import { useNavigate } from "react-router-dom"; import "../index.css";

export default function SummaryPage() { const navigate = useNavigate(); const [tableId, setTableId] = useState(null); const [orders, setOrders] = useState([]);

useEffect(() => { const id = localStorage.getItem("assignedTable"); if (!id) { navigate("/pick-table"); } else { setTableId(id); const saved = JSON.parse(localStorage.getItem(orders_table_${id})) || []; setOrders(saved); } }, [navigate]);

return ( <div className="summary-page"> <h1 className="rainbow-title">📄 သင့် Order စာရင်း</h1> {orders.map((order, index) => ( <div className="summary-table-block" key={index}> <h3>Order #{index + 1} - {new Date(order.timestamp).toLocaleString()}</h3> {order.note && <p><strong>Note:</strong> {order.note}</p>} <table className="summary-table"> <thead> <tr><th>Item</th><th>Qty</th><th>Price</th></tr> </thead> <tbody> {order.items.map((item, i) => ( <tr key={i}> <td>{item.name}</td> <td>{item.qty}</td> <td>{(item.qty * item.price).toLocaleString()} Ks</td> </tr> ))} </tbody> </table> </div> ))} </div> ); }

