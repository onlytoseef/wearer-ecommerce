import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Categories from "./Categories";
import NotFound from "./NotFound";
import ComingSoon from "./ComingSoon";
import ProductDetailsPage from "./ProductDetailPage";
import CartPage from "./CartPage";
import JazzCashForm from "./JazzCashForm";
import TransactionResult from "./TransactionResult";
import Contact from "./Contact";
import ScrollToTop from "../../components/ScrollToTop";
import TrackOrder from "./TrackOrder";
import OrderSuccess from "./OrderSuccess";
import UserDetails from "./UserDetails";
import TrackSuits from "./TrackSuits";
import Hoodies from "./Hoodies";
import { HelmetProvider } from "react-helmet-async";

export default function Index() {
  return (
    <>
      <HelmetProvider>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route
            path="/order-success/:orderNumber"
            element={<OrderSuccess />}
          />

          <Route path="/track-order" element={<TrackOrder />} />
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
          <Route path="/track-suits" element={<TrackSuits />} />
          <Route path="/hoodies" element={<Hoodies />} />
        </Routes>
      </HelmetProvider>
    </>
  );
}
