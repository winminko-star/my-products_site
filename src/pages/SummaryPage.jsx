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
        <button
  onClick={() => navigate("/user")}
  style={{
    marginTop: "20px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #ff6ec4, #7873f5)",
    border: "none",
    borderRadius: "30px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  }}
  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
>
  🔙 Back to Order Page
</button>
      </div>
    </div>
  );
            }
