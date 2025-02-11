import React, { useEffect, useState } from "react";
import { listarClientes, eliminarCliente } from "../services/clienteService";
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

const ListarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await listarClientes();
        setClientes(data);
      } catch (error) {
        console.error("🚨 Error al obtener clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  useEffect(() => {
    if (!loading && clientes.length > 0) {
      if (!$.fn.DataTable.isDataTable("#tbl_clientes")) {
        $("#tbl_clientes").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
          responsive: true,
        });
      }
    }
  }, [loading, clientes]);

  const handleEliminar = (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      title: "Confirmación",
      message: "¿Estás seguro de eliminar este cliente?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarCliente(id);
              iziToast.success({
                title: "Éxito",
                message: "Cliente eliminado con éxito.",
                position: "topRight",
              });

              setClientes((prevClientes) =>
                prevClientes.filter((cliente) => cliente.id_cliente !== id)
              );
            } catch (error) {
              iziToast.error({
                title: "Error",
                message: "No se pudo eliminar el cliente.",
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
    navigate(`/clientes/editar/${id}`);
  };

  const handleAgregarCliente = () => {
    navigate("/clientes/nuevo");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando clientes...</p>
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
                    <h2 className="text-center mb-0">Listado de Clientes</h2>
                    <button
                      className="btn btn-success"
                      onClick={handleAgregarCliente}
                    >
                      ➕ Agregar Cliente
                    </button>
                  </div>
                  {clientes.length === 0 ? (
                    <div className="alert alert-warning text-center">
                      No hay clientes disponibles.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-bordered"
                        id="tbl_clientes"
                      >
                        <thead className="table-light">
                          <tr>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Foto</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                              <td>{cliente.nombre}</td>
                              <td>{cliente.telefono}</td>
                              <td className="text-break">{cliente.email}</td>
                              <td>
                                {cliente.foto ? (
                                  <img
                                    src={`/media/images/${cliente.foto}`}
                                    alt="Foto"
                                    width="50"
                                  />
                                ) : (
                                  "No disponible"
                                )}
                              </td>
                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleEditar(cliente.id_cliente)}
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminar(cliente.id_cliente)}
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
          overflow-y: auto;
          margin-left: 250px;
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

export default ListarClientes;
