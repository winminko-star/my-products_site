import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const [tableId, setTableId] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("assignedTable");
    if (!id) {
      navigate("/pick-table");
    } else {
      setTableId(id);
      const stored = JSON.parse(localStorage.getItem(`orders_table_${id}`)) || [];
      setOrders(stored);
    }
  }, [navigate]);

  return (
    <div className="user-panel-container animated-background">
      <div className="user-panel-inner">
        <h2 className="category-title">Summary for Table {tableId}</h2>

        {orders.map((order, index) => (
          <div key={index} className="order-box">
            <p><strong>Order {index + 1} (Note: {order.note || "None"})</strong></p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x {item.qty} = {(item.price * item.qty).toLocaleString()} Ks
                </li>
              ))}
            </ul>
            <p>
              Total:{" "}
              {order.items.reduce((sum, i) => sum + i.qty * i.price, 0).toLocaleString()} Ks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
            }
