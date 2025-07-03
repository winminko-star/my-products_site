// src/pages/EditOrder.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditOrder() {
  const { tableId, orderIndex } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem(`orders_table_${tableId}`)) || [];
    const targetOrder = orders[orderIndex];
    if (!targetOrder) {
      toast.error("Order not found");
      navigate("/admin");
      return;
    }
    setOrder(targetOrder);
    setNote(targetOrder.note || "");
    setItems(targetOrder.items || []);
  }, [tableId, orderIndex, navigate]);

  const updateQty = (i, delta) => {
    const updated = [...items];
    updated[i].qty += delta;
    if (updated[i].qty <= 0) {
      updated.splice(i, 1);
    }
    setItems(updated);
  };

  const handleSave = () => {
    const updatedOrder = {
      ...order,
      note: note.trim(),
      items: items,
      timestamp: new Date().toISOString(),
    };

    const allOrders = JSON.parse(localStorage.getItem(`orders_table_${tableId}`)) || [];
    allOrders[orderIndex] = updatedOrder;
    localStorage.setItem(`orders_table_${tableId}`, JSON.stringify(allOrders));
    toast.success("Order updated!");
    navigate("/admin");
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
      {item.name} - {item.qty} × {item.price.toLocaleString()} Ks = {(item.qty * item.price).toLocaleString()} Ks
      <button onClick={() => updateQty(i, 1)}>➕</button>
      <button onClick={() => updateQty(i, -1)}>➖</button>
    </li>
  ))}
</ul>
