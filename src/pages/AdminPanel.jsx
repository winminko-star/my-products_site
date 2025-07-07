import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadOrders = () => {
    const newOrders = {};
    for (let i = 1; i <= 30; i++) {
      const tableOrders = JSON.parse(localStorage.getItem(`orders_table_${i}`));
      if (tableOrders && tableOrders.length > 0) {
        newOrders[i] = tableOrders;
      }
    }
    setOrders(newOrders);
    setLastUpdated(new Date()); // update time
  };

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>

      <p style={{ fontStyle: "italic", color: "#555" }}>
        Last updated: {formatTime(lastUpdated)}
      </p>

      {/* Order display section */}
      {Object.keys(orders).length === 0 ? (
        <p>No orders available</p>
      ) : (
        Object.entries(orders).map(([tableId, tableOrders]) => (
          <div key={tableId} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
            <h3>Table {tableId}</h3>
            <ul>
              {tableOrders.map((order, index) => (
                <li key={index}>
                  {order.items.map(item => (
                    <div key={item.id}>
                      {item.name} x {item.qty}
                    </div>
                  ))}
                  {order.note && <p><strong>Note:</strong> {order.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
  }
