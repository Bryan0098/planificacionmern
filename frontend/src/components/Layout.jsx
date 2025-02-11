import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Aquí se renderiza el contenido dinámico */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
