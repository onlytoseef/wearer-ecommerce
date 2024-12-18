import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import About from "./About";
import Terms from "./terms";
import Categories from "./Categories";
import NotFound from "./NotFound";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/category" element={<Categories />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
