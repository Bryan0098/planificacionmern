import React, { useState } from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { crearCliente } from "../services/clienteService";

const NuevoCliente = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [subiendo, setSubiendo] = useState(false);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("nombre", data.nombre);
        formData.append("telefono", data.telefono);
        formData.append("email", data.email);
        if (data.foto[0]) {
            formData.append("foto", data.foto[0]);
        }

        setSubiendo(true);
        try {
            const response = await crearCliente(formData);
            iziToast.success({
                title: "Éxito",
                message: response.message || "Cliente creado con éxito.",
                position: "topRight",
            });
            reset();
        } catch (error) {
            iziToast.error({
                title: "Error",
                message: "Ocurrió un error al crear el cliente.",
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
                                <hr /> <br /><br /><br /><br /><br />
                                  
                                <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="text-center mb-3">Registrar Nuevo Cliente</h2>
                                    <div className="mb-4">
                                        <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                        <input type="text" id="nombre" {...register("nombre", { required: "Campo obligatorio." })} className={`form-control ${errors.nombre ? "is-invalid" : ""}`} />
                                        {errors.nombre && <div className="error-message">{errors.nombre.message}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                                        <input type="text" id="telefono" {...register("telefono", { required: "Campo obligatorio." })} className={`form-control ${errors.telefono ? "is-invalid" : ""}`} />
                                        {errors.telefono && <div className="error-message">{errors.telefono.message}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-bold">Email</label>
                                        <input type="email" id="email" {...register("email", { required: "Campo obligatorio." })} className={`form-control ${errors.email ? "is-invalid" : ""}`} />
                                        {errors.email && <div className="error-message">{errors.email.message}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="foto" className="form-label fw-bold">Foto</label>
                                        <input id="foto" type="file" accept="image/*" {...register("foto")} className="form-control" />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-2" disabled={subiendo}>
                                        {subiendo ? "Subiendo..." : "Registrar Cliente"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default NuevoCliente;
