import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { obtenerActividadPorId, actualizarActividad } from "../services/actividadService";
import { obtenerViviendas } from "../services/viviendaService";
import { obtenerConstructoras } from "../services/viviendaService";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const EditarActividad = () => {
    const { id_actividad } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [viviendas, setViviendas] = useState([]);
    const [constructoras, setConstructoras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [actividadData, viviendasData, constructorasData] = await Promise.all([
                    obtenerActividadPorId(id_actividad),
                    obtenerViviendas(),
                    obtenerConstructoras()
                ]);

                setViviendas(viviendasData);
                setConstructoras(constructorasData);

                setValue("descripcion", actividadData.descripcion);
                setValue("fecha_inicio", new Date(actividadData.fecha_inicio).toISOString().split('T')[0]);
                setValue("fecha_fin", new Date(actividadData.fecha_fin).toISOString().split('T')[0]);
                setValue("id_vivienda", actividadData.id_vivienda?._id || "");
                setValue("id_constructora", actividadData.id_constructora?._id || "");
            } catch (error) {
                console.error("Error al obtener datos de la actividad:", error);
                iziToast.error({
                    title: "Error",
                    message: "No se pudieron cargar los datos de la actividad.",
                    position: "topRight"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id_actividad, setValue]);

    const onSubmit = async (data) => {
        try {
            await actualizarActividad(id_actividad, data);
            iziToast.success({
                title: "Éxito",
                message: "Actividad actualizada con éxito.",
                position: "topRight"
            });
            navigate("/actividades");
        } catch (error) {
            console.error("Error al actualizar actividad:", error);
            iziToast.error({
                title: "Error",
                message: "Ocurrió un error al actualizar la actividad.",
                position: "topRight"
            });
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando datos de la actividad...</p>
            </div>
        );
    }

    return (
        <div className="main-wrap">
            <div className="page-section contact-page">
                <div className="contact-wrap">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10 col-md-12">
                            <div className="contact-text bg-white p-5 rounded shadow">
                                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="text-center mb-3">Editar Actividad</h2>

                                    <div className="mb-4">
                                        <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
                                        <input
                                            type="text"
                                            id="descripcion"
                                            {...register("descripcion", { required: "Campo obligatorio." })}
                                            className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fecha_inicio" className="form-label fw-bold">Fecha de Inicio</label>
                                        <input
                                            type="date"
                                            id="fecha_inicio"
                                            {...register("fecha_inicio", { required: "Campo obligatorio." })}
                                            className={`form-control ${errors.fecha_inicio ? "is-invalid" : ""}`}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fecha_fin" className="form-label fw-bold">Fecha de Fin</label>
                                        <input
                                            type="date"
                                            id="fecha_fin"
                                            {...register("fecha_fin", { required: "Campo obligatorio." })}
                                            className={`form-control ${errors.fecha_fin ? "is-invalid" : ""}`}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="id_vivienda" className="form-label fw-bold">Vivienda</label>
                                        <select
                                            id="id_vivienda"
                                            {...register("id_vivienda", { required: "Campo obligatorio." })}
                                            className={`form-control ${errors.id_vivienda ? "is-invalid" : ""}`}
                                        >
                                            <option value="">Selecciona una vivienda</option>
                                            {viviendas.map(vivienda => (
                                                <option key={vivienda._id} value={vivienda._id}>{vivienda.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="id_constructora" className="form-label fw-bold">Constructora</label>
                                        <select
                                            id="id_constructora"
                                            {...register("id_constructora", { required: "Campo obligatorio." })}
                                            className={`form-control ${errors.id_constructora ? "is-invalid" : ""}`}
                                        >
                                            <option value="">Selecciona una constructora</option>
                                            {constructoras.map(constructora => (
                                                <option key={constructora._id} value={constructora._id}>{constructora.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary px-5">Actualizar Actividad</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
        {`
          .main-warp {
            background-color: rgb(28, 130, 231);
            min-height: 100vh;
            padding: 20px;
          }
          .contact-page {
            margin-left: 420px;
            padding: 280px;
          }
          .contact-text {
            max-width: 900px;
            margin: auto;
          }
          .error-message {
            color: red;
            font-size: 0.9rem;
            margin-top: 0.3rem;
            display: block;
          }
          .is-invalid {
            border-color: red;
          }
        `}
      </style>
        </div>
    );
};

export default EditarActividad;
