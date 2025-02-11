import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { crearActividad } from "../services/actividadService";
import { obtenerViviendas } from "../services/viviendaService";
import { obtenerConstructoras } from "../services/viviendaService";

const NuevaActividad = () => {
    const [viviendas, setViviendas] = useState([]);
    const [constructoras, setConstructoras] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [subiendo, setSubiendo] = useState(false);

    useEffect(() => {
        // Cargar viviendas y constructoras al montar el componente
        Promise.all([
            obtenerViviendas(),
            obtenerConstructoras()
        ])
        .then(([viviendasData, constructorasData]) => {
            setViviendas(viviendasData);
            setConstructoras(constructorasData);
        })
        .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const onSubmit = async (data) => {
        setSubiendo(true);
        try {
            const response = await crearActividad(data);
            iziToast.success({
                title: "Éxito",
                message: response.message || "Actividad registrada con éxito.",
                position: "topRight",
            });
            reset();
        } catch (error) {
            iziToast.error({
                title: "Error",
                message: error.response?.data?.message || "Ocurrió un error al registrar la actividad.",
                position: "topRight",
            });
        } finally {
            setSubiendo(false);
        }
    };

    return (
        <div className="main-wrap">
            <div className="page-section contact-page">
                <div className="contact-wrap">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-10 col-md-12">
                            <div className="contact-text bg-white p-5 rounded shadow">
                                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="text-center mb-3">Registrar Nueva Actividad</h2>

                                    <div className="mb-4">
                                        <label htmlFor="descripcion" className="form-label fw-bold">Descripción</label>
                                        <input type="text" id="descripcion" {...register("descripcion", { required: "Campo obligatorio." })} className={`form-control ${errors.descripcion ? "is-invalid" : ""}`} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fecha_inicio" className="form-label fw-bold">Fecha de Inicio</label>
                                        <input type="date" id="fecha_inicio" {...register("fecha_inicio", { required: "Campo obligatorio." })} className={`form-control ${errors.fecha_inicio ? "is-invalid" : ""}`} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fecha_fin" className="form-label fw-bold">Fecha de Fin</label>
                                        <input type="date" id="fecha_fin" {...register("fecha_fin", { required: "Campo obligatorio." })} className={`form-control ${errors.fecha_fin ? "is-invalid" : ""}`} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="id_vivienda" className="form-label fw-bold">Vivienda</label>
                                        <select id="id_vivienda" {...register("id_vivienda", { required: "Campo obligatorio." })} className={`form-control ${errors.id_vivienda ? "is-invalid" : ""}`}>
                                            <option value="">Selecciona una vivienda</option>
                                            {viviendas.map(vivienda => (
                                                <option key={vivienda._id} value={vivienda._id}>{vivienda.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="id_constructora" className="form-label fw-bold">Constructora</label>
                                        <select id="id_constructora" {...register("id_constructora", { required: "Campo obligatorio." })} className={`form-control ${errors.id_constructora ? "is-invalid" : ""}`}>
                                            <option value="">Selecciona una constructora</option>
                                            {constructoras.map(constructora => (
                                                <option key={constructora._id} value={constructora._id}>{constructora.nombre}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary px-5" disabled={subiendo}>{subiendo ? "Cargando..." : "Registrar Actividad"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NuevaActividad;
