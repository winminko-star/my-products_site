import React, { useEffect, useState } from "react"; import { useNavigate } from "react-router-dom"; import "../index.css";

export default function KitchenPanel() { const navigate = useNavigate(); const [orders, setOrders] = useState({});

useEffect(() => { loadOrders(); const interval = setInterval(loadOrders, 30000); return () => clearInterval(interval); }, []);

const loadOrders = () => { const data = {}; for (let i = 1; i <= 30; i++) { const raw = localStorage.getItem(`orders_table_${i}`); if (raw) { data[i] = JSON.parse(raw); } } setOrders(data); };

return ( <div className="kitchen-container"> <h1 className="rainbow-title">🍽️ Kitchen Panel</h1> <div className="table-grid"> {Array.from({ length: 30 }, (_, i) => { const tableId = i + 1; const ordersForTable = orders[tableId] || []; return ( <div key={tableId} className="table-box"> <div>Table {tableId}</div> {ordersForTable.length > 0 && ( <span className="order-count">{ordersForTable.length}</span> )} {ordersForTable.map((order, index) => ( <div key={index} className="order-box"> <div style={{ fontSize: "14px", marginBottom: "4px" }}> 🧾 {order.timestamp?.split("T")[0]} <br /> 🕒 {order.timestamp?.split("T")[1]?.slice(0, 5)} </div> {order.note && ( <div style={{ fontStyle: "italic", color: "#fff" }}>📝 {order.note}</div> )} <ul> {order.items.map((item, idx) => ( <li key={idx}> {item.qty} x {item.name} ({item.unit}) </li> ))} </ul> </div> ))} </div> ); })} </div> </div> ); }

                                                                                                                                                                                                                                                                                                                                                                                                                                            
