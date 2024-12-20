import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Header from "../components/header";
import Footer from "../components/footer";
import Admin from "./Admin";

function Index() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render Header and Footer */}
      {!isAdminRoute && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/*" element={<Frontend />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default Index;
