import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { app } from "../firebase";

export default function AdminPanel() {
  const [ordersByTable, setOrdersByTable] = useState({});
  const [allowed, setAllowed] = useState(null);
  const navigate = useNavigate();
  const db = getDatabase(app);

  useEffect(() => {
    const access = localStorage.getItem("adminAccess") === "true";
    if (!access) {
      navigate("/admin-login", { replace: true });
    } else {
      setAllowed(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (!allowed) return;

    const listeners = [];

    for (let i = 1; i <= 30; i++) {
      const tableKey = `table_${i}`;
      const tableRef = ref(db, `orders/${tableKey}`);

      const listener = onValue(tableRef, (snapshot) => {
        setOrdersByTable((prev) => {
          const updated = { ...prev };
          updated[tableKey] = snapshot.exists()
            ? Object.values(snapshot.val())
            : [];
          return updated;
        });
      });

      listeners.push({ ref: tableRef, listener });
    }

    return () => {
      listeners.forEach(({ ref }) => off(ref));
    };
  }, [allowed]);

  const clearTableOrders = async (tableKey) => {
    const pwd = prompt("Enter password to clear:");
    if (pwd !== "007") {
      toast.error("Wrong password");
      return;
    }
    await remove(ref(db, `orders/${tableKey}`));
    toast.success(`Cleared orders for ${tableKey}`);
  };

  const editOrder = (tableKey, orderIndex) => {
    const pwd = prompt("Enter password to edit:");
    if (pwd !== "007") {
      toast.error("Wrong password");
      return;
    }
    const tableNum = tableKey.replace("table_", "");
    navigate(`/edit/${tableNum}/${orderIndex}`);
  };

  const handleBack = () => {
    navigate("/user");
  };

  const isReordered = (list) => list.length > 1;

  if (allowed === null) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <h2>Checking admin access...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

      <button
        onClick={handleBack}
        style={{
          padding: "6px 12px",
          backgroundColor: "#6b7280",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        ⬅ Back to User Panel
      </button>

      {Object.keys(ordersByTable).length === 0 ? (
        <p>No orders found.</p>
      ) : (
        Object.entries(ordersByTable).map(([tableKey, orders], index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              marginBottom: 15,
              padding: 10,
              borderRadius: 5,
              backgroundColor: isReordered(orders) ? "#ffe4e6" : "#f0fdf4",
            }}
          >
            <h3 className="font-bold mb-2">
              Table {tableKey.replace("table_", "")}{" "}
              {isReordered(orders) && (
                <span style={{ color: "#dc2626", marginLeft: "10px" }}>
                  🔁 Re-ordered x{orders.length}
                </span>
              )}
            </h3>

            {orders.map((order, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(order.timestamp).toLocaleString()}
                </p>
                <ul>
                  {order.items.map((item, j) => (
                    <li key={j}>
                      {item.name} - {item.qty} × {item.price.toLocaleString()} Ks ={" "}
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
                  onClick={() => editOrder(tableKey, i)}
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
              Clear Orders for {tableKey.replace("table_", "")}
            </button>
          </div>
        ))
      )}
    </div>
  );
            }
