import React from "react";
import { Route, Routes } from "react-router-dom";
import Frontend from "./Frontend";
import Auth from "./Auth";
import Header from "../components/header";
import Footer from "../components/footer";

function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/*" element={<Frontend />} />
          <Route path="/auth/*" element={<Auth />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default Index;
