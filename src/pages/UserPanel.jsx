import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import products from "../data/products";
import "../index.css";

export default function UserPanel() {
  const navigate = useNavigate();
  const [tableId, setTableId] = useState("1");
  const [cart, setCart] = useState([]);
  const [note, setNote] = useState("");

  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  useEffect(() => {
    const id = localStorage.getItem("assignedTable");
    if (!id) {
      navigate("/pick-table", { replace: true });
    } else {
      setTableId(id);
    }

    const handleBack = (e) => {
      e.preventDefault();
      toast("Back is blocked. Please use Reset Table.");
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate]);

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)));
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

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const newOrder = {
      table: tableId,
      items: cart,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem(`orders_table_${tableId}`)) || [];

    existingOrders.push(newOrder);
    localStorage.setItem(`orders_table_${tableId}`, JSON.stringify(existingOrders));

    toast.success("Order placed!");
    setCart([]);
    setNote("");
    navigate("/summary");
  };

  const handleResetTable = () => {
    const input = prompt("Enter reset password:");
    if (input === "007") {
      localStorage.removeItem("assignedTable");
      navigate("/pick-table", { replace: true });
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
      {/* ✅ Marquee Scrolling Banner */}
      <div className="marquee-banner">
        <p>✨ Welcome to Win Min Thuzar Restaurant! ✨</p>
      </div>

      {/* ✅ Logo Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          margin: "20px 0",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "41px", height: "41px", borderRadius: "50%" }}
        />
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#d32f2f",
            margin: 0,
          }}
        >
          Win Min Thuzar – Table {tableId}
        </h1>
      </div>

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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                >
                  <span>{item.name}</span>
                  <span style={{ fontSize: "14px", color: "#888" }}>
                    {item.price.toLocaleString()} Ks
                  </span>
                </button>
              ))}
          </div>
        </div>
      ))}

      <div className="note-area">
        <textarea
          placeholder="Note (e.g., Take away)"
