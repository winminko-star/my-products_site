import React from "react";

export default function AccessDenied() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Access Denied</h1>
      <p>You must login from <code>/admin-login</code></p>
    </div>
  );
}
