// ✅ src/pages/SummaryPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const navigate = useNavigate();
  const note = localStorage.getItem("lastOrderNote") || "";

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-2">🎉 Thank you!</h1>
      <p className="mb-2">Your order has been submitted successfully.</p>
      {note && <p className="italic text-sm text-gray-600">Note: {note}</p>}
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Menu
      </button>
    </div>
  );
}
