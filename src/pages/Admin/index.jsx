import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import TrackOrder from "./TrackOrder";
import AddProduct from "./AddProduct";

export default function Index() {
  return (
    <Routes>
      <Route path="/admin" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/orders" element={<TrackOrder />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
  );
}
