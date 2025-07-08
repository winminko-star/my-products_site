
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [checkedOutTables, setCheckedOutTables] = useState([]);

  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => {
      if (!localStorage.getItem("editLock")) {
        loadOrders();
      }
    }, 30000); // ✅ Changed to 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const allOrders = {};
    const checked = [];

    for (let i = 1; i <= 30; i++) {
      const key = `orders_table_${i}`;
      const data = JSON.parse(localStorage.getItem(key));
      if (data && data.length > 0) {
        allOrders[i] = data;
      }
      if (localStorage.getItem(`checkout_done_table_${i}`) === "true") {
        checked.push(i);
      }
    }

    setOrders(allOrders);
    setCheckedOutTables(checked);
    setLastUpdated(new Date());
  };

  const handleEdit = (tableId, index) => {
    localStorage.setItem("editLock", "true");
    navigate(`/edit/${tableId}/${index}`);
  };

  const handleDelete = (tableId, index) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    const key = `orders_table_${tableId}`;
    const current = JSON.parse(localStorage.getItem(key)) || [];
    current.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(current));
    toast.success("Order deleted");
    loadOrders();
  };

  const handleClearCheckout = (tableId) => {
    localStorage.removeItem(`checkout_done_table_${tableId}`);
    toast.success(`Checkout cleared for Table ${tableId}`);
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
    <div className="admin-container">
      <h1 className="rainbow-title">Admin Panel</h1>
      <p className="updated-text">Last updated: {formatTime(lastUpdated)}</p>

      {/* ✅ Checkout Tables Scroll */}
      {checkedOutTables.length > 0 && (
        <div style={{ overflowX: "auto", whiteSpace: "nowrap", marginBottom: "20px" }}>
          {checkedOutTables.map((id) => (
            <span
              key={id}
              style={{
                display: "inline-block",
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 16px",
                borderRadius: "12px",
                marginRight: "10px",
                fontWeight: "bold",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                cursor: "pointer"
              }}
              title="Click to clear"
              onClick={() => handleClearCheckout(id)}
            >
              ✔ Table {id}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/pick-table")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#2196f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        ← Go to Table Picker
      </button>

      <div className="table-grid">
        {[...Array(30)].map((_, i) => {
          const tableId = i + 1;
          const orderList = orders[tableId] || [];
          let colorClass = "table-box";
          if (orderList.length === 1) colorClass += " red";
          else if (orderList.length >= 2) colorClass += " green";
          else colorClass += " blue";

          return (
            <div key={tableId} className={colorClass}>
              <strong>Table {tableId}</strong>
              {orderList.length > 0 && (
                <span className="order-count">{orderList.length}</span>
              )}
              {orderList.length > 0 &&
                orderList.map((order, index) => (
                  <div key={index} className="order-box">
                    <ul>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} ({item.unit}) x {item.qty} = {(item.qty * item.price).toLocaleString()} Ks
                        </li>
                      ))}
                    </ul>
                    {order.note && (
                      <p style={{ fontStyle: "italic" }}>
                        <strong>Note:</strong> {order.note}
                      </p>
                    )}
                    <p><strong>Total:</strong> {order.items.reduce((sum, i) => sum + i.qty * i.price, 0).toLocaleString()} Ks</p>
                    <button
                      className="order-btn"
                      onClick={() => handleEdit(tableId, index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="order-btn delete"
                      onClick={() => handleDelete(tableId, index)}
                    >
                      ❌ Delete
                    </button>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
    }
              
