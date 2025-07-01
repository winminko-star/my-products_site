// src/Router.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/UserPanel';
import Admin from './pages/AdminLogin';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
