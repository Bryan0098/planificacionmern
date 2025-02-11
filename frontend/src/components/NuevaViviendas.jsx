import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { crearVivienda } from "../services/viviendaService";

const NuevaVivienda = () => {
    const [constructoras, setConstructoras] = useState([]);
    const [clientes, setClientes] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [subiendo, setSubiendo] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch('http://localhost:5000/api/constructoras').then(res => res.json()),
            fetch('http://localhost:5000/api/clientes').then(res => res.json())
        ])
        .then(([constructorasData, clientesData]) => {
            console.log('Constructoras:', constructorasData);
            console.log('Clientes:', clientesData);
    
            setConstructoras(constructorasData.constructoras);
            setClientes(clientesData.clientes); // Ajusta si viene dentro de un objeto
        })
        .catch(error => console.error('Error al obtener datos:', error));
    }, []);
        
    
    

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("nombre", data.nombre);
        formData.append("direccion", data.direccion);
        formData.append("tipo", data.tipo);
        formData.append("estado", data.estado);
        formData.append("id_constructora", data.id_constructora);
        if (data.id_cliente) formData.append("id_cliente", data.id_cliente);
        if (data.foto[0]) formData.append("foto", data.foto[0]);

        setSubiendo(true);
        try {
            const response = await crearVivienda(formData);
            iziToast.success({
                title: "Éxito",
                message: response.message || "Vivienda registrada con éxito.",
                position: "topRight",
            });
            reset();
        } catch (error) {
            iziToast.error({
                title: "Error",
                message: error.response?.data?.message || "Ocurrió un error al registrar la vivienda.",
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
                                    <h2 className="text-center mb-3">Registrar Nueva Vivienda</h2>

                                    <div className="mb-4">
                                        <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                        <input type="text" id="nombre" {...register("nombre", { required: "Campo obligatorio." })} className={`form-control ${errors.nombre ? "is-invalid" : ""}`} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="direccion" className="form-label fw-bold">Dirección</label>
                                        <input type="text" id="direccion" {...register("direccion", { required: "Campo obligatorio." })} className={`form-control ${errors.direccion ? "is-invalid" : ""}`} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="tipo" className="form-label fw-bold">Tipo</label>
                                        <select id="tipo" {...register("tipo", { required: "Campo obligatorio." })} className={`form-control ${errors.tipo ? "is-invalid" : ""}`}>
                                            <option value="">Selecciona un tipo</option>
                                            <option value="Departamento">Departamento</option>
                                            <option value="Casa">Casa</option>
                                            <option value="Dúplex">Dúplex</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="estado" className="form-label fw-bold">Estado</label>
                                        <select id="estado" {...register("estado", { required: "Campo obligatorio." })} className={`form-control ${errors.estado ? "is-invalid" : ""}`}>
                                            <option value="">Selecciona un estado</option>
                                            <option value="En construcción">En construcción</option>
                                            <option value="Terminada">Terminada</option>
                                            <option value="Vendida">Vendida</option>
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
                                            {constructoras.length > 0 ? (
                                                constructoras.map(constructora => (
                                                    <option key={constructora._id} value={constructora._id}>
                                                        {constructora.nombre}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>Cargando constructoras...</option>
                                            )}
                                        </select>
                                    </div>


                                    <div className="mb-4">
                                        <label htmlFor="id_cliente" className="form-label fw-bold">Cliente (Opcional)</label>
                                        <select id="id_cliente" {...register("id_cliente")} className="form-control">
                                            <option value="">Selecciona un cliente</option>
                                            {Array.isArray(clientes) && clientes.length > 0 ? (
                                                clientes.map(cliente => (
                                                    <option key={cliente._id} value={cliente._id}>
                                                        {cliente.nombre}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No hay clientes disponibles</option>
                                            )}
                                        </select>
                                    </div>


                                    <div className="mb-4">
                                        <label htmlFor="foto" className="form-label fw-bold">Foto</label>
                                        <input type="file" id="foto" {...register("foto")} className="form-control" />
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary px-5" disabled={subiendo}>{subiendo ? "Cargando..." : "Registrar Vivienda"}</button>
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

export default NuevaVivienda;
