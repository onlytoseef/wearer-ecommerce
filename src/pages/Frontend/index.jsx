import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import About from "./About";
import Terms from "./terms";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<h2>Not Found</h2>} />
    </Routes>
  );
}
