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
    setLastUpdated(new Date());
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => {
      loadOrders();
    }, 60000); // refresh every 1 minute
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (tableId, index) => {
    navigate(`/edit/${tableId}/${index}`);
  };

  const handleDelete = (tableId, index) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    const tableKey = `orders_table_${tableId}`;
    const tableOrders = JSON.parse(localStorage.getItem(tableKey)) || [];
    tableOrders.splice(index, 1);
    localStorage.setItem(tableKey, JSON.stringify(tableOrders));
    toast.success("Order deleted");
    loadOrders();
  };

  const formatTime = (date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel</h1>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Last updated: {formatTime(lastUpdated)}
      </p>

      {Object.entries(orders).length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        Object.entries(orders).map(([tableId, tableOrders]) => (
          <div key={tableId} style={{ marginBottom: "20px" }}>
            <h2>Table {tableId}</h2>
            {tableOrders.map((order, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} x {item.qty}
                    </li>
                  ))}
                </ul>
                {order.note && (
                  <p>
                    <strong>Note:</strong> {order.note}
                  </p>
                )}
                <button
                  onClick={() => handleEdit(tableId, index)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(tableId, index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
      }
