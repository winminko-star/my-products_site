// src/pages/UserPanel.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products"; // မင်းမှာရှိတဲ့ products.js မှာထုတ်ထားတဲ့အရာ

export default function UserPanel() {
  const navigate = useNavigate();
  const tableId = localStorage.getItem("assignedTable");
  const [showReset, setShowReset] = useState(false);
  const [resetInput, setResetInput] = useState("");
  const [cart, setCart] = useState([]);

  // ✅ Table မရှိရင် pick-table သို့ ပြန်ပို့
  useEffect(() => {
    if (!tableId) {
      navigate("/pick-table");
    }
  }, [tableId]);

  // ✅ Reset logic
  const handleReset = () => {
    if (resetInput === "007") {
      localStorage.removeItem("assignedTable");
      navigate("/pick-table");
    } else {
      alert("Wrong password!");
    }
  };
  const [flashItemId, setFlashItemId] = useState(null); // ထပ်ထည့်
  // ✅ Add to Cart
  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  // ✅ Add flash highlight effect
  setFlashItemId(item.id);
  setTimeout(() => setFlashItemId(null), 500); // 0.5 sec only
};
  // ✅ Update Quantity
  const updateQty = (id, qty) => {
    if (qty < 1) {
      setCart(cart.filter((i) => i.id !== id));
    } else {
      setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  // ✅ Place Order
  const placeOrder = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    const tableKey = `table_${tableId}`;
    const newOrder = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      timestamp: Date.now(),
    };
    const updatedTableOrders = [...(orders[tableKey] || []), newOrder];
    orders[tableKey] = updatedTableOrders;
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);
    navigate("/summary");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Table {tableId} - Order</h1>

      {/* ✅ Reset Table Button */}
      {!showReset ? (
        <button
          onClick={() => setShowReset(true)}
          className="mb-4 px-3 py-2 bg-red-500 text-white rounded"
        >
          Reset Table
        </button>
      ) : (
        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter reset password"
            value={resetInput}
            onChange={(e) => setResetInput(e.target.value)}
            className="p-2 border mr-2"
          />
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Confirm Reset
          </button>
        </div>
      )}

      {/* ✅ Product Menu */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {products.map((item) => (
          <button
            key={item.id}
            onClick={() => addToCart(item)}
            className="p-2 border rounded"
          >
            {item.name} - ${item.price}
          </button>
        ))}
      </div>

      {/* ✅ Cart Display */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Your Order:</h2>
        {cart.length === 0 ? (
          <p>No items added.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-1">
                {item.name} x
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(item.id, parseInt(e.target.value))
                  }
                  className="w-12 text-center mx-1 border"
                />
                = ${item.price * item.qty}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Place Order Button */}
      {cart.length > 0 && (
        <button
          onClick={placeOrder}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Place Order
        </button>
      )}
    </div>
  );
                                           }
