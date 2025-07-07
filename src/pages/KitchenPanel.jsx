import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function KitchenPanel() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("kitchenAccess");
    if (access !== "true") {
      navigate("/kitchen-login");
    }

    loadOrders();
    const interval = setInterval(() => {
      loadOrders();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [navigate]);

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
      <h1 className="rainbow-title">Kitchen Panel</h1>
      <p className="updated-text">Auto updated: {formatTime(lastUpdated)}</p>
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
                    <p><strong>Total:</strong> {order.items.reduce((sum, i) => sum + i.qty * i.price, 0).toLocaleString()} Ks</p>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
        }
                                                                   
