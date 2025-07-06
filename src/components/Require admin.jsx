// src/components/RequireAdmin.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const isAllowed = localStorage.getItem("adminAccess") === "true";
  return isAllowed ? children : <Navigate to="/admin-login" replace />;
}
