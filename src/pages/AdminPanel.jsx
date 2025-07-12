import React, { useEffect, useState } from "react"; import { useNavigate } from "react-router-dom"; import toast from "react-hot-toast"; import "../index.css";

export default function AdminPanel() { const navigate = useNavigate(); const [orders, setOrders] = useState({}); const [editing, setEditing] = useState(false); const [refreshInterval, setRefreshInterval] = useState(null); const [checkedOutTables, setCheckedOutTables] = useState([]);

useEffect(() => { loadOrders(); const interval = setInterval(() => { if (!editing) { loadOrders(); } }, 30000); setRefreshInterval(interval); return () => clearInterval(interval); }, []);

const loadOrders = () => { const data = {}; const checkedOut = []; for (let i = 1; i <= 30; i++) { const raw = localStorage.getItem(orders_table_${i}); if (raw) { data[i] = JSON.parse(raw); } const done = localStorage.getItem(checkout_done_table_${i}) === "true"; if (done) { checkedOut.push(i); } } setOrders(data); setCheckedOutTables(checkedOut); };

const getTableColor = (tableId) => { const checkedOut = localStorage.getItem(checkout_done_table_${tableId}) === "true"; const orderCount = orders[tableId]?.length || 0; if (checkedOut) return "yellow"; if (orderCount >= 2) return "green"; if (orderCount === 1) return "red"; return "blue"; };

const handleEdit = (tableId, index) => { setEditing(true); clearInterval(refreshInterval); navigate(/edit/${tableId}/${index}); };

const handleDelete = (tableId, index) => { const confirm = window.confirm("Are you sure you want to delete this order?"); if (confirm) { const updated = [...orders[tableId]]; updated.splice(index, 1); localStorage.setItem(orders_table_${tableId}, JSON.stringify(updated)); loadOrders(); } };

const handleClear = (tableId) => { const confirm = window.confirm("Clear all orders for this table?"); if (confirm) { localStorage.removeItem(orders_table_${tableId}); localStorage.removeItem(checkout_done_table_${tableId}); loadOrders(); } };

return ( <div className="admin-container"> <h1 className="rainbow-title">Admin Panel</h1>

{checkedOutTables.length > 0 && (
    <div style={{
      overflowX: "auto",
      display: "flex",
      gap: "10px",
      margin: "10px 0",
      padding: "10px",
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      {checkedOutTables.map((tableId) => (
        <div key={tableId} style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px 16px",
          borderRadius: "20px",
          fontWeight: "bold",
          fontSize: "14px",
          whiteSpace: "nowrap",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
        }}>
          ✔ Table {tableId}
        </div>
      ))}
    </div>
  )}

  <button className="refresh-btn" onClick={loadOrders}>🔄 Refresh</button>

  <div className="admin-table-grid">
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
            <div
              key={index}
              style={{
                background: "white",
                color: "#000",
                margin: "10px 0",
                padding: "12px",
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                width: "100%"
              }}
            >
              <div style={{ fontSize: "14px", marginBottom: "6px" }}>
                🗓️ {order.timestamp?.split("T")[0]} 🕒 {order.timestamp?.split("T")[1]?.slice(0, 5)}
              </div>

              {order.note && (
                <div style={{ fontStyle: "italic", color: "#444" }}>
                  📜 {order.note}
                </div>
              )}

              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.qty} x {item.name} ({item.unit}) – {(item.qty * item.price).toLocaleString()} Ks
                  </li>
                ))}
              </ul>

              <div style={{ textAlign: "right", marginTop: "8px", fontWeight: "bold", color: "#000" }}>
                Total: {order.items.reduce((sum, item) => sum + item.qty * item.price, 0).toLocaleString()} Ks
              </div>

              <div style={{ marginTop: "8px", display: "flex", gap: "10px" }}>
                <button className="order-btn" onClick={() => handleEdit(tableId, index)}>
                  ✏️ Edit
                </button>
                <button className="order-btn delete" onClick={() => handleDelete(tableId, index)}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
          {ordersForTable.length > 0 && (
            <button className="order-btn delete" onClick={() => handleClear(tableId)}>
              Clear All
            </button>
          )}
        </div>
      );
    })}
  </div>
</div>

); }

