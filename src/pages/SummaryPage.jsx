import React, { useEffect, useState } from "react";
import "../index.css";

export default function SummaryPage() {
  const [tableId, setTableId] = useState("1");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("assignedTable") || "1";
    setTableId(id);

    const orders =
      JSON.parse(localStorage.getItem(`orders_table_${id}`)) || [];
    setOrders(orders);
  }, []);

  return (
    <div className="summary-page">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Orders (Table {tableId})
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="summary-table-block">
            <p>
              <strong>Time:</strong>{" "}
              {new Date(order.timestamp).toLocaleString()}
            </p>
            {order.note && (
              <p>
                <strong>Note:</strong> {order.note}
              </p>
            )}
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Unit</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.unit}</td>
                    <td>{item.qty}</td>
                    <td>{(item.qty * item.price).toLocaleString()} Ks</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr style={{ margin: "20px 0" }} />
          </div>
        ))
      )}
    </div>
  );
                }
