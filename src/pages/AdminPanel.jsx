// src/pages/AdminPanel.jsx

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminPanel() {
  const [ordersByTable, setOrdersByTable] = useState({});

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "{}");
    setOrdersByTable(storedOrders);
  }, []);

  const clearTableOrders = (tableKey) => {
    const updated = { ...ordersByTable };
    delete updated[tableKey];
    setOrdersByTable(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    toast.success(`Cleared orders for ${tableKey}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      {Object.keys(ordersByTable).length === 0 ? (
        <p>No orders found.</p>
      ) : (
        Object.entries(ordersByTable).map(([tableKey, orderList], index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              marginBottom: 15,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <h3 className="font-bold mb-2">{tableKey.replace("table_", "Table ")}</h3>

            {orderList.map((order, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <ul>
                  {order.items.map((item, j) => (
                    <li key={j}>
                      {item.name} - {item.qty} × ${item.price} = ${item.qty * item.price}
                    </li>
                  ))}
                </ul>
                {order.note && (
                  <p style={{ fontStyle: "italic", color: "#555" }}>
                    Note: {order.note}
                  </p>
                )}
                <p>
                  <b>Total:</b> ${order.total.toFixed(2)}
                </p>
                <hr style={{ margin: "10px 0" }} />
              </div>
            ))}

            <button
              onClick={() => clearTableOrders(tableKey)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#e11d48",
                color: "white",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Clear Orders for {tableKey.replace("table_", "Table ")}
            </button>
          </div>
        ))
      )}
    </div>
  );
                 }
