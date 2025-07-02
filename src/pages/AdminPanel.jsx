import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [ordersByTable, setOrdersByTable] = useState({});

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("orders")) || {};
    const processed = {};

    Object.entries(raw).forEach(([tableId, orders]) => {
      processed[tableId] = [...orders].sort(
        (a, b) => (b.created || 0) - (a.created || 0)
      );
    });

    setOrdersByTable(processed);
  }, []);

  const clearOrder = (table, index) => {
    try {
      const all = JSON.parse(localStorage.getItem("orders")) || {};
      const updated = [...(all[table] || [])];
      updated.splice(index, 1);

      all[table] = updated;
      localStorage.setItem("orders", JSON.stringify(all));

      setOrdersByTable((prev) => ({
        ...prev,
        [table]: updated,
      }));

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
            <div key={idx} className="border p-3 mb-3 rounded shadow">
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
                onClick={() => clearOrder(table, idx)}
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
