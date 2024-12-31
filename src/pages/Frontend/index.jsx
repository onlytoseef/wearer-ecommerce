import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import About from "./About";
import Terms from "./terms";
import Categories from "./Categories";
import NotFound from "./NotFound";
import ComingSoon from "./ComingSoon";
import ProductsPage from "./ProductPage";
import ProductDetailsPage from "./ProductDetailPage";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/category" element={<Categories />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />

      {/* Updated route */}
      <Route path="/upcoming" element={<ComingSoon />} />
      <Route path="/productPage" element={<ProductsPage />} />
    </Routes>
  );
}
