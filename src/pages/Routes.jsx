import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Admin from "./Admin";
import AdminPrivateRoute from "./Admin/AdminPrivateRoute";
import AdminLogin from "./Admin/AdminLogin";
import Header from "../components/header";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import NotFound from "./Frontend/NotFound";

function Index() {
  const location = useLocation();
  const user = useSelector((state) => state.adminAuth.user); // Check user presence for authentication
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/admin/login"
            element={user ? <Navigate to="/admin" replace /> : <AdminLogin />}
          />

          <Route path="/*" element={<Frontend />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/auth/*" element={<Auth />} />

          <Route
            path="/admin/*"
            element={<AdminPrivateRoute Component={Admin} />}
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default Index;
