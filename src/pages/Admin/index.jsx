import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Orders from "./Orders";
import AddProduct from "./AddProduct";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="orders" element={<Orders />} />
      <Route path="addProduct" element={<AddProduct />} />
    </Routes>
  );
}
