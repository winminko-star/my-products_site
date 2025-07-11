
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
  const [showThankYou, setShowThankYou] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("assignedTable");
    if (!id) {
      navigate("/pick-table", { replace: true });
    } else {
      setTableId(id);
      const done = localStorage.getItem(`checkout_done_table_${id}`) === "true";
      setCheckedOut(done);
    }

    const handleBack = (e) => {
      e.preventDefault();
      toast("Back is blocked. Please use Reset Table.");
      window.history.pushState(null, "", window.location.pathname);
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [navigate]);

  const addToCart = (item) => {
    if (checkedOut) return;
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(cart.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    if (checkedOut) return;
    if (qty < 1) {
      setCart(cart.filter((i) => i.id !== id));
    } else {
      setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  };

  const removeFromCart = (id) => {
    if (checkedOut) return;
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const placeOrder = () => {
    if (checkedOut) return;
    if (cart.length === 0) {
      toast.error("Order ထဲမှာ ဘာမှ မရှိသေးပါ");
      return;
    }

    const newOrder = {
      table: tableId,
      items: cart,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem(`orders_table_${tableId}`)) || [];
    existing.push(newOrder);
    localStorage.setItem(`orders_table_${tableId}`, JSON.stringify(existing));
    toast.success("Order မှာပြီးပါပြီ");
    setCart([]);
    setNote("");
    navigate("/summary");
  };

  const handleCheckout = () => {
    localStorage.setItem(`checkout_done_table_${tableId}`, "true");
    setCheckedOut(true);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  const handleResetTable = () => {
    const input = prompt("လျှို့ဝှက်နံပါတ် ရိုက်ထည့်ပါ:");
    if (input === "007") {
      localStorage.removeItem("assignedTable");
      localStorage.removeItem(`checkout_done_table_${tableId}`);
      navigate("/pick-table", { replace: true });
    } else {
      toast.error("Password မှားနေပါတယ်");
    }
  };

  const categories = ["Food", "Soup", "Drink", "Others"];

  return (
    <div className="animated-background">
      <div className="user-panel-inner">
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          TABLE <span className="rainbow-circle">{tableId}</span>
        </h1>

        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="category-title">{cat}</h2>
            <div className="item-grid">
              {products
                .filter((item) => item.category === cat)
                .map((item) => (
                  <button key={item.id} className="product-btn" onClick={() => addToCart(item)} disabled={checkedOut}>
                    <img
                      src={item.image || "/default.png"}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "6px",
                      }}
                    />
                    <span style={{ fontWeight: "bold", textAlign: "center" }}>{item.name}</span>
                    <span style={{ fontSize: "14px", color: "#eee", textAlign: "center" }}>
                      {item.price.toLocaleString()} Ks
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}

        <div className="note-area">
          <textarea
            placeholder="မှတ်ချက် (ဥပမာ - ဆောင်သွားမယ်)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={checkedOut}
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={item.image || "/default.png"}
                      alt={item.name}
                      style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                    />
                    {item.name}
                  </td>
                  <td>{item.unit}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      style={{ width: "50px" }}
                      disabled={checkedOut}
                    />
                  </td>
                  <td>{(item.qty * item.price).toLocaleString()} Ks</td>
                  <td>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "red",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      title="Remove"
                      disabled={checkedOut}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "right", marginTop: "10px", fontWeight: "bold", fontSize: "18px" }}>
            စုစုပေါင်း: {totalAmount.toLocaleString()} Ks
          </div>
        </div>

        <div className="custom-button-layout">
          <div className="row-two">
            <button className="fancy-btn" onClick={placeOrder}>Orderမှာမည်။</button>
            <button className="fancy-btn" onClick={handleCheckout}>ငွေရှင်းမည်။</button>
          </div>
          <div className="row-one">
            <button className="fancy-btn" onClick={() => navigate("/summary")}>Orderစာရင်းကြည့်မည်။</button>
          </div>
          <div className="row-one">
            <button className="fancy-btn" onClick={handleResetTable}>Tableပြောင်းမည်။</button>
          </div>
        </div>
      </div>
    </div>
  );
    }
        
