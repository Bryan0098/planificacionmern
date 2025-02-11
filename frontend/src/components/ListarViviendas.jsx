import React, { useEffect, useState } from "react";
import { obtenerViviendas, eliminarVivienda } from "../services/viviendaService";
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

const ListarViviendas = () => {
  const [viviendas, setViviendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViviendas = async () => {
      try {
        const data = await obtenerViviendas();
        setViviendas(data);
      } catch (error) {
        console.error("🚨 Error al obtener viviendas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchViviendas();
  }, []);

  useEffect(() => {
    if (!loading && viviendas.length > 0) {
      if (!$.fn.DataTable.isDataTable("#tbl_viviendas")) {
        $("#tbl_viviendas").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
          responsive: true, // Hacer la tabla responsiva
        });
      }
    }
  }, [loading, viviendas]);

  const handleEliminar = (id) => {
    if (!id || id.length !== 24) {
      iziToast.error({
        title: "Error",
        message: "ID de vivienda no válido.",
        position: "topRight",
      });
      return;
    }

    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      title: "Confirmación",
      message: "¿Estás seguro de eliminar esta vivienda?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarVivienda(id);
              iziToast.success({
                title: "Éxito",
                message: "Vivienda eliminada con éxito.",
                position: "topRight",
              });

              setViviendas((prevViviendas) =>
                prevViviendas.filter((vivienda) => vivienda._id !== id)
              );
            } catch (error) {
              iziToast.error({
                title: "Error",
                message: "No se pudo eliminar la vivienda.",
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
    navigate(`/viviendas/editar/${id}`);
  };

  const handleAgregarVivienda = () => {
    navigate("/viviendas/nueva");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando viviendas...</p>
      </div>
    );
  }

  return (
    <div className="main-wrap">
      <div className="page-section contact-page">
        <div className="contact-wrap">
          <div className="row">
            <div className="col-xl-12 mx-auto p-0">
              <div className="contact-text">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="text-center mb-0">LISTADO DE VIVIENDAS</h2>
                  <button
                    className="btn btn-success"
                    onClick={handleAgregarVivienda}
                  >
                    ➕ Agregar Vivienda
                  </button>
                </div>
                {viviendas.length === 0 ? (
                  <div className="alert alert-warning text-center">
                    No hay viviendas disponibles.
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover align-middle text-center"
                      id="tbl_viviendas"
                      style={{ fontSize: "1rem", width: "100%", margin: "0 auto" }}
                    >
                      <thead className="table-light">
                        <tr>
                          <th>Nombre</th>
                          <th>Dirección</th>
                          <th>Tipo</th>
                          <th>Estado</th>
                          <th>Constructora</th>
                          <th>Cliente</th>
                          <th>Foto</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viviendas.map((vivienda) => (
                          <tr key={vivienda._id}>
                            <td>{vivienda.nombre}</td>
                            <td>{vivienda.direccion}</td>
                            <td>{vivienda.tipo}</td>
                            <td>{vivienda.estado}</td>
                            <td>{vivienda.id_constructora ? vivienda.id_constructora.nombre : "N/A"}</td>
                            <td>{vivienda.id_cliente ? vivienda.id_cliente.nombre : "Sin cliente"}</td>
                            <td>
                              {vivienda.foto ? (
                                <img
                                  src={`http://localhost:5000/uploads/${vivienda.foto}`}
                                  alt="Foto"
                                  width="50"
                                />
                              ) : (
                                "No disponible"
                              )}
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn btn-primary btn-sm me-2"
                                  onClick={() => handleEditar(vivienda._id)}
                                >
                                  ✏️
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleEliminar(vivienda._id)}
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
      <style>
        {`
          .main-wrap {
            padding: 20px;
            margin-left: 250px;
          }
          @media (max-width: 768px) {
            .main-wrap {
              margin-left: 0;
            }
          }
          .contact-text {
            max-width: 100%;
            margin: auto;
          }
          .table-responsive {
            overflow-x: auto;
          }
        `}
      </style>
    </div>
  );
};

export default ListarViviendas;
