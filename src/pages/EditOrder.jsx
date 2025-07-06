import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { get, set, ref } from "firebase/database";
import { db } from "../firebase"; // ✅ Correct db import

export default function EditOrder() {
  const { tableId, orderIndex } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const snapshot = await get(ref(db, `orders/table_${tableId}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const keys = Object.keys(data);
          const values = Object.values(data);
          const key = keys[orderIndex];
          const targetOrder = values[orderIndex];

          if (!targetOrder) {
            toast.error("Order not found");
            navigate("/admin");
            return;
          }

          setOrder({ ...targetOrder, firebaseKey: key });
          setNote(targetOrder.note || "");
          setItems(targetOrder.items || []);
        } else {
          toast.error("No orders found");
          navigate("/admin");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load order");
      }
    };

    fetchOrder();
  }, [tableId, orderIndex, navigate]);

  const updateQty = (i, delta) => {
    const updated = [...items];
    updated[i].qty += delta;
    if (updated[i].qty <= 0) {
      updated.splice(i, 1);
    }
    setItems(updated);
  };

  const handleSave = async () => {
    const updatedOrder = {
      ...order,
      note: note.trim(),
      items: items,
      timestamp: new Date().toISOString(),
    };

    try {
      await set(ref(db, `orders/table_${tableId}/${order.firebaseKey}`), updatedOrder);
      toast.success("Order updated!");
      navigate("/admin");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update order");
    }
  };

  if (!order) return null;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Order #{parseInt(orderIndex) + 1} (Table {tableId})</h2>

      <div style={{ marginBottom: 10 }}>
        <label><strong>Note:</strong></label><br />
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <h3>Items:</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            {item.name} - {item.qty} × {item.price.toLocaleString()} Ks ={" "}
            {(item.qty * item.price).toLocaleString()} Ks{" "}
            <button onClick={() => updateQty(i, 1)}>➕</button>{" "}
            <button onClick={() => updateQty(i, -1)}>➖</button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSave}
        style={{
          padding: "8px 16px",
          backgroundColor: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: 4,
          marginTop: 20,
          cursor: "pointer",
        }}
      >
        💾 Save Order
      </button>
    </div>
  );
        }
