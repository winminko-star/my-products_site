import React from "react";
import { useNavigate } from "react-router-dom"; // <<== import လုပ်ဖို့ မမေ့
export default function SummaryPage() {
  const navigate = useNavigate();
  const table = localStorage.getItem("assignedTable") || "1";
  const orders = JSON.parse(localStorage.getItem("orders")) || {};
  const latestOrderList = orders[`table_${table}`] || [];
  const latestOrder = latestOrderList[latestOrderList.length - 1];

  if (!latestOrder) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold text-red-600 mb-4">No Order Found!</h1>
        <p className="mb-4">You haven't placed any order yet.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">🎉 Thank you!</h1>
      <p className="mb-2">Your order has been submitted successfully.</p>

      {latestOrder.note && (
        <p className="italic text-sm text-gray-600">Note: {latestOrder.note}</p>
      )}

      <div className="mt-4 text-left max-w-md mx-auto">
        <h2 className="font-semibold mb-2">Order Summary:</h2>
        <ul className="text-sm">
          {latestOrder.items.map((item, i) => (
            <li key={i}>
              {item.name} x {item.qty} = ${item.price * item.qty}
            </li>
          ))}
        </ul>
        <div className="font-bold mt-2">
          Total: ${latestOrder.total.toFixed(2)}
        </div>
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Menu
      </button>
    </div>
  );
}
