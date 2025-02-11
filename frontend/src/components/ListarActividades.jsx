import React, { useEffect, useState } from "react";
import { obtenerActividades, eliminarActividad } from "../services/actividadService";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-buttons-dt";
import "jszip";
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import "datatables.net-buttons/js/buttons.html5.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ListarActividades = () => {
    const [actividades, setActividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActividades = async () => {
            try {
                const data = await obtenerActividades();
                setActividades(data);
            } catch (error) {
                console.error("🚨 Error al obtener actividades:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActividades();
    }, []);

    useEffect(() => {
        if (!loading && actividades.length > 0) {
            if (!$.fn.DataTable.isDataTable("#tbl_actividades")) {
                $("#tbl_actividades").DataTable({
                    dom: "Bfrtip",
                    buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
                    language: {
                        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
                    },
                    responsive: true,
                });
            }
        }
    }, [loading, actividades]);

    const handleEliminar = (id) => {
        iziToast.question({
            timeout: 20000,
            close: false,
            overlay: true,
            displayMode: "once",
            title: "Confirmación",
            message: "¿Estás seguro de eliminar esta actividad?",
            position: "center",
            buttons: [
                [
                    "<button><b>SÍ</b></button>",
                    async function (instance, toast) {
                        try {
                            await eliminarActividad(id);
                            iziToast.success({
                                title: "Éxito",
                                message: "Actividad eliminada con éxito.",
                                position: "topRight",
                            });

                            setActividades((prevActividades) =>
                                prevActividades.filter((actividad) => actividad._id !== id)
                            );
                        } catch (error) {
                            iziToast.error({
                                title: "Error",
                                message: "No se pudo eliminar la actividad.",
                                position: "topRight",
                            });
                        }
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    },
                    true,
                ],
                [
                    "<button>NO</button>",
                    function (instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast, "button");
                    },
                ],
            ],
        });
    };

    const handleEditar = (id) => {
        navigate(`/actividades/editar/${id}`);
    };

    const handleAgregarActividad = () => {
        navigate("/actividades/nueva");
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando actividades...</p>
            </div>
        );
    }

    return (
        <div className="layout">
            <div className="content">
                <div className="container-fluid p-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h2 className="text-center mb-0">Listado de Actividades</h2>
                                        <button
                                            className="btn btn-success"
                                            onClick={handleAgregarActividad}
                                        >
                                            ➕ Agregar Actividad
                                        </button>
                                    </div>
                                    {actividades.length === 0 ? (
                                        <div className="alert alert-warning text-center">
                                            No hay actividades disponibles.
                                        </div>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped table-bordered" id="tbl_actividades">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Descripción</th>
                                                        <th>Fecha Inicio</th>
                                                        <th>Fecha Fin</th>
                                                        <th>Vivienda</th>
                                                        <th>Constructora</th>
                                                        <th>Fecha de Creación</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {actividades.map((actividad) => (
                                                        <tr key={actividad._id}>
                                                            <td>{actividad.id_actividad}</td>
                                                            <td>{actividad.descripcion}</td>
                                                            <td>{new Date(actividad.fecha_inicio).toLocaleDateString()}</td>
                                                            <td>{new Date(actividad.fecha_fin).toLocaleDateString()}</td>
                                                            <td>{actividad.id_vivienda?.nombre || "Sin vivienda"}</td>
                                                            <td>{actividad.id_constructora?.nombre || "Sin constructora"}</td>
                                                            <td>{new Date(actividad.fechaCreacion).toLocaleDateString()}</td>
                                                            <td>
                                                                <div className="d-flex justify-content-center gap-2">
                                                                    <button
                                                                        className="btn btn-sm btn-primary"
                                                                        onClick={() => handleEditar(actividad._id)}
                                                                    >
                                                                        ✏️
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-sm btn-danger"
                                                                        onClick={() => handleEliminar(actividad._id)}
                                                                    >
                                                                        🗑️
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .layout {
                    display: flex;
                    min-height: 100vh;
                }
                .content {
                    flex: 1;
                    padding: 20px;
                    margin-left: 250px; /* Espacio para el menú */
                }

                @media (max-width: 768px) {
                    .content {
                        margin-left: 0;
                        padding: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ListarActividades;
