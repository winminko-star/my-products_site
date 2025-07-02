import React, { useEffect, useState } from "react";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  // ✅ Order data ကို localStorage မှာ သိမ်းထားတဲ့အတိုင်း ပြန်ဖတ်
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Orders</h2>
      {orders.map((order, i) => (
        <div key={i} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h4>Table {order.table}</h4>
          {order.note && <p><b>Note:</b> {order.note}</p>}
          <ul>
            {order.items.map((item, j) => (
              <li key={j}>
                {item.name} - {item.quantity} × ${item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
