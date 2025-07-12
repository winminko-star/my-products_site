import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const [editing, setEditing] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => {
      if (!editing) {
        loadOrders();
      }
    }, 30000); // every 30 seconds

    setRefreshInterval(interval);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const data = {};
    for (let i = 1; i <= 30; i++) {
      const raw = localStorage.getItem(`orders_table_${i}`);
      if (raw) {
        data[i] = JSON.parse(raw);
      }
    }
    setOrders(data);
  };

  const getTableColor = (tableId) => {
    const checkedOut = localStorage.getItem(`checkout_done_table_${tableId}`) === "true";
    const orderCount = orders[tableId]?.length || 0;
    if (checkedOut) return "yellow";
    if (orderCount >= 2) return "green";
    if (orderCount === 1) return "red";
    return "blue";
  };

  const handleEdit = (tableId, index) => {
    setEditing(true);
    clearInterval(refreshInterval); // pause refresh
    navigate(`/edit/${tableId}/${index}`);
  };

  const handleDelete = (tableId, index) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (confirm) {
      const updated = [...orders[tableId]];
      updated.splice(index, 1);
      localStorage.setItem(`orders_table_${tableId}`, JSON.stringify(updated));
      loadOrders();
    }
  };

  const handleClear = (tableId) => {
    const confirm = window.confirm("Clear all orders for this table?");
    if (confirm) {
      localStorage.removeItem(`orders_table_${tableId}`);
      localStorage.removeItem(`checkout_done_table_${tableId}`);
      loadOrders();
    }
  };

  return (
    <div className="admin-container">
      <h1 className="rainbow-title">Admin Panel</h1>
      <button className="refresh-btn" onClick={loadOrders}>🔄 Refresh</button>

      <div className="table-grid">
        {Array.from({ length: 30 }, (_, i) => {
          const tableId = i + 1;
          const color = getTableColor(tableId);
          const ordersForTable = orders[tableId] || [];
          return (
            <div key={tableId} className={`table-box ${color}`}>
              Table {tableId}
              {ordersForTable.length > 0 && (
                <span className="order-count">{ordersForTable.length}</span>
              )}
              {ordersForTable.map((order, index) => (
                <div key={index} className="order-box">
                  <div>{order.timestamp?.split("T")[0]}</div>
                  <div>🧾 {order.items.length} item(s)</div>
                  <button className="order-btn" onClick={() => handleEdit(tableId, index)}>Edit</button>
                  <button className="order-btn delete" onClick={() => handleDelete(tableId, index)}>Delete</button>
                </div>
              ))}
              {ordersForTable.length > 0 && (
                <button className="order-btn delete" onClick={() => handleClear(tableId)}>Clear All</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
      }
