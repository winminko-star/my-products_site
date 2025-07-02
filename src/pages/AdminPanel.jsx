import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  const clearOrders = (table) => {
    const updated = orders.filter((order) => order.table !== table);
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success("Cleared");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>
      {orders.map((order, i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h4>Table {order.table}</h4>
          {order.note && <p><b>Note:</b> {order.note}</p>}
          <ul>
            {order.items.map((item, j) => (
              <li key={j}>
                {item.name} - {item.quantity} × ${item.price}
              </li>
            ))}
          </ul>
          <button
            onClick={() => clearOrders(order.table)}
            style={{ padding: "5px 10px", marginTop: "10px" }}
          >
            Clear Table
          </button>
        </div>
      ))}
    </div>
  );
          }
