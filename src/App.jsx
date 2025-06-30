// ✅ src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import SummaryPage from './pages/SummaryPage';
import OrderList from './pages/OrderList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/user" element={<UserPanel />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
