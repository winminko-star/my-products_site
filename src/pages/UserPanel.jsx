import React, { useState, useEffect } from "react"; import { useNavigate } from "react-router-dom"; import toast from "react-hot-toast"; import { getDatabase, ref, push } from "firebase/database"; import products from "../data/products"; import "../index.css"; import "../firebase";

export default function UserPanel() { const navigate = useNavigate(); const [tableId, setTableId] = useState("1"); const [cart, setCart] = useState([]); const [note, setNote] = useState("");

const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

useEffect(() => { const id = localStorage.getItem("assignedTable"); if (!id) { navigate("/pick-table", { replace: true }); } else { setTableId(id); }

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

const addToCart = (item) => { const exists = cart.find((i) => i.id === item.id); if (exists) { setCart(cart.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))); } else { setCart([...cart, { ...item, qty: 1 }]); } };

const updateQty = (id, qty) => { if (qty < 1) { setCart(cart.filter((i) => i.id !== id)); } else { setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i))); } };

const removeFromCart = (id) => { setCart(cart.filter((item) => item.id !== id)); };

const placeOrder = async () => { if (cart.length === 0) { toast.error("Cart is empty"); return; }

const db = getDatabase();
const orderRef = ref(db, `orders/table_${tableId}`);

const newOrder = {
  table: tableId,
  items: cart,
  note: note.trim(),
  timestamp: new Date().toISOString(),
};

try {
  await push(orderRef, newOrder);
  toast.success("Order placed!");
  setCart([]);
  setNote("");
  navigate("/summary");
} catch (error) {
  toast.error("Failed to place order");
  console.error("Firebase Error:", error);
}

};

const handleResetTable = () => { const input = prompt("Enter reset password:"); if (input === "007") { localStorage.removeItem("assignedTable"); navigate("/pick-table", { replace: true }); } else { toast.error("Wrong password"); } };

const goToAdmin = () => { navigate("/admin-login"); };

const categories = ["Food", "Soup", "Drink", "Others"];

return ( <div className="user-panel-container"> {/* ✅ 3D Box Scrolling Banner */} <div className="marquee-banner-box"> <div className="marquee-banner"> <p>အခုလိုလာရောက်အားပေးခြင်းကိုအထူးကျေးဇူးတင်ပါသည်။ 7.7.2027 တွင် အထူးပရိုမိုးရှင်းပွဲရှိပါသည်။</p> </div> <img src="/images/teddy_bear.png" alt="Teddy" className="teddy-bear" /> </div>

{/* ✅ Logo Header with Rainbow Text */}
  <div className="rainbow-header">
    <img src="/logo.png" alt="Logo" style={{ width: "41px", height: "41px", borderRadius: "50%" }} />
    <h1>Win Min Thuzar – Table {tableId}</h1>
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
              <img
                src={item.image || "/default.png"}
                alt={item.name}
                style={{ width: "40px", height: "40px", borderRadius: "50%", marginBottom: "6px" }}
              />
              <span>{item.name}</span>
              <span style={{ fontSize: "14px", color: "#888" }}>{item.price.toLocaleString()} Ks</span>
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
              />
            </td>
            <td>{(item.qty * item.price).toLocaleString()} Ks</td>
            <td>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ background: "transparent", border: "none", color: "red", fontSize: "16px", cursor: "pointer" }}
                title="Remove"
              >
                ❌
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ textAlign: "right", marginTop: "10px", fontWeight: "bold", fontSize: "18px" }}>
      Total: {totalAmount.toLocaleString()} Ks
    </div>
  </div>

  <button onClick={placeOrder} className="place-order-btn" style={{ marginTop: "20px" }}>
    Place Order
  </button>

  <div style={{ marginTop: "10px", textAlign: "center" }}>
    <button
      onClick={() => navigate("/summary")}
      style={{ backgroundColor: "#4caf50", color: "white", padding: "8px 16px", border: "none", borderRadius: "8px", cursor: "pointer" }}
    >
      📄 View My Orders
    </button>
  </div>

  <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "10px" }}>
    <button onClick={handleResetTable}>Reset Table</button>
    <button onClick={goToAdmin}>Admin</button>
  </div>
</div>

); }

  
