import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 60000); // Refresh every 1 minute

    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const allOrders = {};
    for (let i = 1; i <= 30; i++) {
      const key = `orders_table_${i}`;
      const data = JSON.parse(localStorage.getItem(key));
      if (data && data.length > 0) {
        allOrders[i] = data;
      }
    }
    setOrders(allOrders);
    setLastUpdated(new Date());
  };

  const handleEdit = (tableId, index) => {
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
                          {item.name} x {item.qty}
                        </li>
                      ))}
                    </ul>
                    {order.note && (
                      <p style={{ fontStyle: "italic" }}>
                        <strong>Note:</strong> {order.note}
                      </p>
                    )}
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
