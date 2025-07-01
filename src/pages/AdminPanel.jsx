// ✅ src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [ordersByTable, setOrdersByTable] = useState({});

  useEffect(() => {
    const allOrders = {};

    for (let i = 1; i <= 30; i++) {
      const tableId = `table_${i}`;
      const orderRef = ref(database, `tables/${tableId}/order`);

      onValue(orderRef, (snapshot) => {
        const data = snapshot.val() || {};
        const orders = Object.entries(data).map(([id, order]) => ({
          id,
          items: order,
        }));

        allOrders[tableId] = orders;
        setOrdersByTable({ ...allOrders });
      });
    }
  }, []);

  const clearOrder = async (table, orderId) => {
    try {
      const orderRef = ref(database, `tables/${table}/order/${orderId}`);
      await remove(orderRef);
      toast.success("Order cleared");
    } catch (err) {
      toast.error("Failed to clear");
    }
  };

  const drawWinner = () => {
    const all = Object.entries(ordersByTable)
      .flatMap(([table, orders]) => orders.map((o) => ({ ...o, table })));

    if (all.length === 0) return toast.error("No orders to draw");

    const lucky = all[Math.floor(Math.random() * all.length)];
    toast.success(`🎉 Lucky Draw Winner: ${lucky.table.toUpperCase()}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      <button
        onClick={drawWinner}
        className="mb-4 px-4 py-2 bg-purple-500 text-white rounded"
      >
        🎁 Lucky Draw
      </button>

      {Object.entries(ordersByTable).map(([table, orders]) => (
        <div key={table} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{table.toUpperCase()}</h2>

          {orders.map((order, idx) => (
            <div key={order.id} className="border p-3 mb-3 rounded shadow">
              <div className="font-bold mb-1">#{idx + 1}</div>

              <ul className="text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.quantity} = ${item.quantity * item.price}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => clearOrder(table, order.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
