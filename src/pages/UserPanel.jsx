import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import products from "../data/products";

const TABLE_ID = localStorage.getItem("assignedTable") || "1";

export default function UserPanel() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(
        cart.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const submitOrder = () => {
    if (cart.length === 0) return toast.error("Cart is empty!");

    const orderData = {
      table: TABLE_ID,
      note,
      items: cart,
      total,
      created: Date.now(), // Use timestamp
    };

    const existing = JSON.parse(localStorage.getItem("orders")) || {};
    const orders = existing[`table_${TABLE_ID}`] || [];

    orders.push(orderData);
    existing[`table_${TABLE_ID}`] = orders;

    localStorage.setItem("orders", JSON.stringify(existing));
    localStorage.setItem("lastOrderNote", note);

    setCart([]);
    setNote("");
    navigate("/summary");
  };

  useEffect(() => {
    const stored = localStorage.getItem("lastOrderNote");
    if (stored) setNote(stored);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Table {TABLE_ID} - Order</h1>

      <div className="mb-3">
        <label className="block text-sm">Note (e.g., takeaway):</label>
        <input
          className="border px-2 py-1 w-full"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {products.map((item) => (
          <div
            key={item.id}
            className="border p-3 rounded shadow flex justify-between"
          >
            <div>
              <div className="font-semibold text-lg">{item.name}</div>
              <div className="text-sm">${item.price}</div>
            </div>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => addToCart(item)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      <h2 className="mt-5 font-bold">Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mt-2">
          <div>{item.name}</div>
          <input
            type="number"
            value={item.qty}
            onChange={(e) =>
              updateQty(item.id, parseInt(e.target.value) || 1)
            }
            className="w-16 text-right border px-1"
          />
          <div>${(item.qty * item.price).toFixed(2)}</div>
        </div>
      ))}

      <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>

      <button
        onClick={submitOrder}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Order Now
      </button>
    </div>
  );
      }
