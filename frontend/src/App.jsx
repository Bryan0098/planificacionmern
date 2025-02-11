import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Header from "./components/Header";
import NuevoCliente from "./components/NuevoCliente";
import ListarClientes from "./components/ListarClientes";
import EditarCliente from "./components/EditarCliente";
import NuevoConstructora from "./components/NuevaConstructora"; // Este componente se usa para agregar nuevas constructoras.
import ListarConstructoras from "./components/ListarConstructoras"; // Este componente se usa para listar constructoras.
import EditarConstructora from "./components/EditarConstructora"; // Este componente es para editar constructoras.
import NuevaVivienda from "./components/NuevaViviendas"; // Componente para agregar nuevas viviendas
import ListarViviendas from "./components/ListarViviendas"; // Componente para listar viviendas
import EditarVivienda from "./components/EditarVivienda"; // Componente para editar viviendas
import NuevaActividad from "./components/NuevaActividad";  // Importa el componente para agregar actividades
import ListarActividades from "./components/ListarActividades";  // (Este componente debe listar actividades)
import EditarActividad from "./components/EditarActividad";  // (Este componente será para editar actividades)


function App() {
  return (
    <Router>
      {/* ✅ El Header aparece en todas las páginas */}
      <Header />

      {/* 📌 Rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Layout  />} />
        
        {/* Rutas para clientes */}
        <Route path="/clientes/nuevo" element={<NuevoCliente />} />
        <Route path="/clientes" element={<ListarClientes />} />
        <Route path="/clientes/editar/:id" element={<EditarCliente />} />
        <Route path="/constructoras/nueva" element={<NuevoConstructora />} />
        <Route path="/constructoras" element={<ListarConstructoras />} />
        <Route path="/constructoras/editar/:id" element={<EditarConstructora />} />
        <Route path="/viviendas/nueva" element={<NuevaVivienda />} />
        <Route path="/viviendas" element={<ListarViviendas />} />
        <Route path="/viviendas/editar/:id_vivienda" element={<EditarVivienda />} />
        <Route path="/actividades/nueva" element={<NuevaActividad />} />
        <Route path="/actividades" element={<ListarActividades />} />
        <Route path="/actividades/editar/:id_actividad" element={<EditarActividad />} />

      </Routes>
    </Router>
  );
}

export default App;