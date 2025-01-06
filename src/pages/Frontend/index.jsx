import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import About from "./About";
import Categories from "./Categories";
import NotFound from "./NotFound";
import ComingSoon from "./ComingSoon";
import ProductsPage from "./ProductPage";
import ProductDetailsPage from "./ProductDetailPage";
import CartPage from "./CartPage";
import JazzCashForm from "./JazzCashForm";
import TransactionResult from "./TransactionResult";
import Contact from "./Contact";

export default function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/category" element={<Categories />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route path="/jazz-form" element={<JazzCashForm />} />
      <Route path="/transaction-result" element={<TransactionResult />} />
      {/* Updated route */}
      <Route path="/upcoming" element={<ComingSoon />} />
      <Route path="/productPage" element={<ProductsPage />} />
    </Routes>
  );
}
