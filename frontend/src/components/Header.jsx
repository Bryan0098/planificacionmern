import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* 🔹 Botón hamburguesa para pantallas pequeñas */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <i className="fa fa-bars"></i>
      </button>

      {/* 🔹 Sidebar que aparece y desaparece */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="header-close text-right pr-4 pt-4">
          <i className="fa fa-times text-xl cursor-pointer" onClick={toggleSidebar}></i>
        </div>

        <div className="header-warp text-center">
          <Link to="/" className="site-logo inline-block mb-4">
            <img src="/assets/img/logo.jpg" alt="Logo" width="200px" height="210px" className="mx-auto w-28" />
          </Link>

          <ul className="main-menu space-y-4 text-lg font-medium">
            <li><Link to="/clientes" onClick={toggleSidebar}>Clientes</Link></li>
            <li><Link to="/constructoras" onClick={toggleSidebar}>Constructoras</Link></li>
            <li><Link to="/viviendas" onClick={toggleSidebar}>Viviendas</Link></li>
            <li><Link to="/actividades" onClick={toggleSidebar}>Actividades</Link></li>
          </ul>

          <div className="social-links mt-5">
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-facebook"></i></a>
          </div>

          <div className="copyright text-center mt-6 text-sm text-gray-500">
            <h6>DESARROLLADO POR GUAYTA BRYAN</h6>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
