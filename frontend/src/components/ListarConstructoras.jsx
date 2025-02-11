import React, { useEffect, useState } from "react";
import { listarConstructoras, eliminarConstructora } from "../services/constructoraService";
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

const ListarConstructoras = () => {
  const [constructoras, setConstructoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConstructoras = async () => {
      try {
        const data = await listarConstructoras();
        if (data && Array.isArray(data.constructoras)) {
          setConstructoras(data.constructoras);
        } else {
          console.error("La propiedad 'constructoras' no está presente o no es un arreglo");
        }
      } catch (error) {
        console.error("🚨 Error al obtener constructoras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructoras();
  }, []);

  useEffect(() => {
    if (!loading && constructoras.length > 0) {
      if (!$.fn.DataTable.isDataTable("#tbl_constructoras")) {
        $("#tbl_constructoras").DataTable({
          dom: "Bfrtip",
          buttons: ["copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
          },
          responsive: true,
        });
      }
    }
  }, [loading, constructoras]);

  const handleEliminar = (id) => {
    iziToast.question({
      timeout: 20000,
      close: false,
      overlay: true,
      displayMode: "once",
      title: "Confirmación",
      message: "¿Estás seguro de eliminar esta constructora?",
      position: "center",
      buttons: [
        [
          "<button><b>SÍ</b></button>",
          async function (instance, toast) {
            try {
              await eliminarConstructora(id);
              iziToast.success({
                title: "Éxito",
                message: "Constructora eliminada con éxito.",
                position: "topRight",
              });

              setConstructoras((prevConstructoras) =>
                prevConstructoras.filter((constructora) => constructora._id !== id)
              );
            } catch (error) {
              iziToast.error({
                title: "Error",
                message: "No se pudo eliminar la constructora.",
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
    navigate(`/editar-constructora/${id}`);
  };

  const handleAgregarConstructora = () => {
    navigate("/constructoras/nueva");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando constructoras...</p>
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
                    <h2 className="text-center mb-0">Listado de Constructoras</h2>
                    <button
                      className="btn btn-success"
                      onClick={handleAgregarConstructora}
                    >
                      ➕ Agregar Constructora
                    </button>
                  </div>
                  {constructoras.length === 0 ? (
                    <div className="alert alert-warning text-center">
                      No hay constructoras disponibles.
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table table-striped table-bordered"
                        id="tbl_constructoras"
                      >
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Ciudad</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {constructoras.map((constructora) => (
                            <tr key={constructora._id}>
                              <td className="text-break">{constructora._id}</td>
                              <td>{constructora.nombre}</td>
                              <td>{constructora.telefono}</td>
                              <td className="text-break">{constructora.email}</td>
                              <td>{constructora.ciudad}</td>
                              <td className="text-break">{constructora.direccion}</td>
                              <td>
                                <div className="d-flex justify-content-center gap-2">
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleEditar(constructora._id)}
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleEliminar(constructora._id)}
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

export default ListarConstructoras;
