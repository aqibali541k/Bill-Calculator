// src/App.jsx
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BillPage from "./pages/BillPage";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BillPage />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
