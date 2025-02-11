import React, { useEffect, useState } from "react";
import { obtenerViviendaPorId, actualizarVivienda } from "../services/viviendaService";
import { useNavigate, useParams } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const EditarVivienda = () => {
    const { id } = useParams();  // Usamos el _id generado por MongoDB
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipo, setTipo] = useState("");
    const [estado, setEstado] = useState("");
    const [fotoActual, setFotoActual] = useState(null); 
    const [loading, setLoading] = useState(true);  // Estado para controlar la carga

    useEffect(() => {
        const fetchVivienda = async () => {
            try {
                console.log(`🔍 Solicitando vivienda con ID: ${id}`);
                const data = await obtenerViviendaPorId(id);
                
                if (data) {
                    console.log("🏠 Datos de la vivienda obtenidos:", data);
                    setNombre(data.nombre);
                    setDireccion(data.direccion);
                    setTipo(data.tipo);
                    setEstado(data.estado);
                    setFotoActual(data.foto);
                } else {
                    console.warn("⚠️ No se encontraron datos para esta vivienda.");
                }
            } catch (error) {
                console.error("🚨 Error al obtener vivienda:", error);
                iziToast.error({
                    title: "Error",
                    message: "No se pudieron cargar los datos de la vivienda.",
                    position: "topRight"
                });
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchVivienda();  // Solo ejecuta si hay un ID válido
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("direccion", direccion);
        formData.append("tipo", tipo);
        formData.append("estado", estado);

        try {
            const response = await actualizarVivienda(id, formData);
            iziToast.success({
                title: "Éxito",
                message: response.message || "Vivienda actualizada con éxito",
                position: "topRight"
            });
            navigate("/viviendas");
        } catch (error) {
            console.error("🚨 Error al actualizar la vivienda:", error);
            iziToast.error({
                title: "Error",
                message: error.response?.data?.error || "Hubo un error al actualizar la vivienda.",
                position: "topRight"
            });
        }
    };

    // Si los datos aún están cargando, mostramos un spinner
    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando datos de la vivienda...</p>
            </div>
        );
    }

    return (
        <div className="main-wrap">
            <h2 className="text-center mb-4">Editar Vivienda</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label fw-bold">Nombre:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Dirección:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Tipo:</label>
                    <select
                        className="form-control"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="Casa">Casa</option>
                        <option value="Departamento">Departamento</option>
                        <option value="Dúplex">Dúplex</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Estado:</label>
                    <select
                        className="form-control"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un estado</option>
                        <option value="En construcción">En construcción</option>
                        <option value="Terminada">Terminada</option>
                        <option value="Vendida">Vendida</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label fw-bold">Foto:</label>
                    {fotoActual && (
                        <div className="mb-2">
                            <img src={`http://localhost:5000/uploads/${fotoActual}`} alt="Foto de la vivienda" width="150" />
                        </div>
                    )}
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFotoActual(e.target.files[0])}
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Actualizar Vivienda</button>
            </form>
        </div>
    );
};

export default EditarVivienda;
