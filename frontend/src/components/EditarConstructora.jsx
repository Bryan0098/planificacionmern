import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerConstructoraPorId, actualizarConstructora } from "../services/constructoraService";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const EditarConstructora = () => {
  const { id } = useParams();  // Obtiene el ID de la URL
  const navigate = useNavigate(); // Para redirigir después de la edición
  const [constructora, setConstructora] = useState({
    nombre: "",
    ubicacion: "",
  });

  useEffect(() => {
    const fetchConstructora = async () => {
      try {
        const data = await obtenerConstructoraPorId(id);
        setConstructora(data);
      } catch (error) {
        iziToast.error({
          title: "Error",
          message: "No se pudo obtener la constructora.",
          position: "topRight",
        });
      }
    };

    fetchConstructora();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConstructora((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await actualizarConstructora(id, constructora);
      iziToast.success({
        title: "Éxito",
        message: response.message || "Constructora actualizada con éxito.",
        position: "topRight",
      });
      navigate("/constructoras");  // Redirige a la lista de constructoras
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "Hubo un problema al actualizar la constructora.",
        position: "topRight",
      });
    }
  };

  return (
    <div className="main-wrap">
      <div className="page-section">
        <h2>Editar Constructora</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={constructora.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ubicacion" className="form-label">Ubicación</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={constructora.ubicacion}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2">
            Actualizar Constructora
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarConstructora;
