import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import products from "../data/products";
import "../index.css";

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
    if (qty < 1) {
      setCart(cart.filter((i) => i.id !== id));
    } else {
      setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      table: TABLE_ID,
      items: cart,
      note: note.trim(),
      time: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || {};
    if (!existingOrders[TABLE_ID]) {
      existingOrders[TABLE_ID] = [];
    }
    existingOrders[TABLE_ID].push(orderData);

    localStorage.setItem("orders", JSON.stringify(existingOrders));
    toast.success("Order placed!");
    setCart([]);
    setNote("");
  };

  const handleResetTable = () => {
    const input = prompt("Enter reset password:");
    if (input === "007") {
      localStorage.removeItem("assignedTable");
      navigate("/");
    } else {
      toast.error("Wrong password");
    }
  };

  const goToAdmin = () => {
    navigate("/admin-login");
  };

  const categories = ["Food", "Soup", "Drink", "Others"];

  return (
    <div className="user-panel-container">
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Table {TABLE_ID}
      </h1>

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="category-title">{cat}</h2>
          <div className="item-grid">
            {products
              .filter((item) => item.category === cat)
              .map((item) => (
                <button
                  key={item.id}
                  className="product-btn"
                  onClick={() => addToCart(item)}
                >
                  {item.name}
                </button>
              ))}
          </div>
        </div>
      ))}

      <div className="note-area">
        <textarea
          placeholder="Note (e.g., Take away)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.unit}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) =>
                      updateQty(item.id, parseInt(e.target.value))
                    }
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={placeOrder}
        className="place-order-btn"
        style={{ marginTop: "20px" }}
      >
        Place Order
      </button>

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={handleResetTable}>Reset Table</button>
        <button onClick={goToAdmin}>Admin</button>
      </div>
    </div>
  );
                }
