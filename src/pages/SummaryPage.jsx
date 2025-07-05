import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import app from "../firebase";
import "../index.css";

export default function SummaryPage() {
  const [tableId, setTableId] = useState("1");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("assignedTable") || "1";
    setTableId(id);

    const fetchOrders = async () => {
      try {
        const db = getDatabase(app);
        const snap = await get(ref(db, `orders/table_${id}`));
        if (snap.exists()) {
          const raw = snap.val();
          const allOrders = Object.values(raw); // Convert object to array
          setOrders(allOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="summary-page">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Orders (Table {tableId})
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="summary-table-block">
            <p>
              <strong>Time:</strong>{" "}
              {new Date(order.timestamp).toLocaleString()}
            </p>
            {order.note && (
              <p>
                <strong>Note:</strong> {order.note}
              </p>
            )}
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Unit</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <img
                        src={item.image || "/default.png"}
                        alt={item.name}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                        }}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td>{item.unit}</td>
                    <td>{item.qty}</td>
                    <td>{(item.qty * item.price).toLocaleString()} Ks</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr style={{ margin: "20px 0" }} />
          </div>
        ))
      )}

      {/* ✅ Back to Table Button */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <button
          onClick={() => navigate("/user")}
          style={{
            backgroundColor: "#6a0dad",
            color: "white",
            padding: "10px 20px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          ⬅ Back to Table
        </button>
      </div>
    </div>
  );
            }
