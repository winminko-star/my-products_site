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
      const tableRef = ref(database, `orders/${tableId}`);

      onValue(tableRef, (snapshot) => {
        const data = snapshot.val() || {};
        const orders = Object.entries(data).map(([id, order]) => ({
          id,
          ...order,
        }));

        allOrders[tableId] = orders.sort(
          (a, b) => (b.created?.seconds || 0) - (a.created?.seconds || 0)
        );

        // Deep clone to trigger state update
        setOrdersByTable({ ...allOrders });
      });
    }
  }, []);

  const clearOrder = async (table, orderId) => {
    try {
      const orderRef = ref(database, `orders/${table}/${orderId}`);
      await remove(orderRef);
      toast.success("Order cleared");
    } catch (err) {
      toast.error("Failed to clear");
    }
  };

  const drawWinner = () => {
    const all = Object.values(ordersByTable).flat();
    if (all.length === 0) return toast.error("No orders to draw");
    const lucky = all[Math.floor(Math.random() * all.length)];
    toast.success(`🎉 Lucky Draw Winner: Table ${lucky.table}`);
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
              {order.note && (
                <div className="text-sm italic text-gray-600 mb-1">
                  Note: {order.note}
                </div>
              )}
              <ul className="text-sm">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.qty} = ${item.price * item.qty}
                  </li>
                ))}
              </ul>
              <div className="font-semibold mt-2">Total: ${order.total}</div>
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
