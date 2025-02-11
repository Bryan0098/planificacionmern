import React, { useState } from "react";
import { useForm } from "react-hook-form";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { crearConstructora } from "../services/constructoraService"; // Importamos el servicio

const NuevaConstructora = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [subiendo, setSubiendo] = useState(false);

  const onSubmit = async (data) => {
    setSubiendo(true);
    try {
      // Enviar directamente los datos como objeto JSON
      const response = await crearConstructora(data);
      iziToast.success({
        title: "Éxito",
        message: response.message || "Constructora creada con éxito.",
        position: "topRight",
      });
      reset();
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "Ocurrió un error al crear la constructora.",
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
                  <h2 className="text-center mb-3">Registrar Nueva Constructora</h2>

                  <div className="mb-4">
                    <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                    <input
                      type="text"
                      id="nombre"
                      {...register("nombre", { required: "Campo obligatorio." })}
                      className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                    />
                    {errors.nombre && <div className="error-message">{errors.nombre.message}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                    <input
                      type="text"
                      id="telefono"
                      {...register("telefono", { required: "Campo obligatorio." })}
                      className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                    />
                    {errors.telefono && <div className="error-message">{errors.telefono.message}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", { required: "Campo obligatorio." })}
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    />
                    {errors.email && <div className="error-message">{errors.email.message}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ciudad" className="form-label fw-bold">Ciudad</label>
                    <input
                      type="text"
                      id="ciudad"
                      {...register("ciudad", { required: "Campo obligatorio." })}
                      className={`form-control ${errors.ciudad ? "is-invalid" : ""}`}
                    />
                    {errors.ciudad && <div className="error-message">{errors.ciudad.message}</div>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="direccion" className="form-label fw-bold">Dirección</label>
                    <input
                      type="text"
                      id="direccion"
                      {...register("direccion", { required: "Campo obligatorio." })}
                      className={`form-control ${errors.direccion ? "is-invalid" : ""}`}
                    />
                    {errors.direccion && <div className="error-message">{errors.direccion.message}</div>}
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={subiendo}>
                    {subiendo ? "Subiendo..." : "Registrar Constructora"}
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

export default NuevaConstructora;
