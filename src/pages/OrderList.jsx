// src/pages/OrderList.jsx

import React from "react";

const OrderList = ({ orders }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((orderGroup, index) => (
            <div key={index} className="border rounded p-4 shadow">
              <p className="font-semibold mb-2">
                Table {orderGroup.table} ({orderGroup.note || "No note"})
              </p>
              <ul className="list-disc list-inside">
                {orderGroup.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-medium">
                Total: ${orderGroup.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
