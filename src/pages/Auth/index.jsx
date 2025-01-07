import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./register";

export default function Index() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<h2>Not Found</h2>} />
    </Routes>
  );
}
