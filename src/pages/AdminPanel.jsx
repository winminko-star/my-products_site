// src/pages/AdminPanel.jsx

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [ordersByTable, setOrdersByTable] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () => {
    const all = {};
    for (let i = 1; i <= 30; i++) {
      const key = `orders_table_${i}`;
      const data = JSON.parse(localStorage.getItem(key)) || [];
      if (data.length > 0) {
        all[i] = data;
      }
    }
    setOrdersByTable(all);
  };

  const clearTableOrders = (tableNum) => {
    localStorage.removeItem(`orders_table_${tableNum}`);
    toast.success(`Cleared orders for Table ${tableNum}`);
    loadAllOrders(); // Refresh UI
  };

  const editOrder = (tableNum, orderIndex) => {
    navigate(`/edit/${tableNum}/${orderIndex}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {Object.keys(ordersByTable).length === 0 ? (
        <p>No orders found.</p>
      ) : (
        Object.entries(ordersByTable).map(([tableNum, orderList], index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              marginBottom: 15,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <h3 className="font-bold mb-2">Table {tableNum}</h3>

            {orderList.map((order, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(order.timestamp).toLocaleString()}
                </p>
                <ul>
                  {order.items.map((item, j) => (
                    <li key={j}>
                      {item.name} - {item.qty} × {item.price.toLocaleString()} Ks
{(item.qty * item.price).toLocaleString()} Ks
                    </li>
                  ))}
                </ul>
                {order.note && (
                  <p style={{ fontStyle: "italic", color: "#555" }}>
                    Note: {order.note}
                  </p>
                )}
                <button
                  onClick={() => editOrder(tableNum, i)}
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    marginTop: 6,
                    cursor: "pointer",
                  }}
                >
                  ✏ Edit Order #{i + 1}
                </button>
                <hr style={{ margin: "10px 0" }} />
              </div>
            ))}

            <button
              onClick={() => clearTableOrders(tableNum)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#e11d48",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Clear Orders for Table {tableNum}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
