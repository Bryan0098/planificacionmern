import React, { useEffect, useState } from "react";
import { obtenerClientePorId, actualizarCliente } from "../services/clienteService";
import { useNavigate, useParams } from "react-router-dom";

const EditarCliente = () => {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [foto, setFoto] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const { id_cliente } = useParams(); // Cambié 'id' a 'id_cliente'
    const navigate = useNavigate(); // Usamos useNavigate

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                console.log(`🟢 Cargando cliente con ID: ${id_cliente}`);
                const data = await obtenerClientePorId(id_cliente); // Usamos 'id_cliente' aquí
                console.log("🟢 Datos del cliente:", data);
                setNombre(data.nombre);
                setTelefono(data.telefono);
                setEmail(data.email);
                setFoto(data.foto); 
            } catch (error) {
                console.error("🚨 Error al obtener cliente:", error);
                setMensaje("Error al obtener los datos del cliente.");
            }
        };
    
        if (id_cliente) { // Cambié 'id' a 'id_cliente'
            fetchCliente();
        }
    }, [id_cliente]); // Cambié 'id' a 'id_cliente'
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("telefono", telefono);
        formData.append("email", email);
        if (foto) formData.append("foto", foto);

        try {
            const data = await actualizarCliente(id_cliente, formData); // Usamos 'id_cliente' aquí
            setMensaje(data.message || "Cliente actualizado con éxito");
            navigate("/clientes"); // Redirigir a la lista de clientes después de actualizar
        } catch (error) {
            console.error("🚨 Error al actualizar el cliente:", error);
            setMensaje(error.response?.data?.error || "Hubo un error al actualizar el cliente.");
        }
    };

    return (
        <div>
            <h2>Editar Cliente</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Foto:</label>
                    {foto && <img src={`http://localhost:5000/uploads/${foto}`} alt="Foto del cliente" width="100" />}
                    <input type="file" onChange={(e) => setFoto(e.target.files[0])} />
                </div>

                <button type="submit">Actualizar Cliente</button>
            </form>
            {mensaje && <p>{mensaje}</p>}

            <style>
                {`
                .main-warp {
                    background-color:rgb(28, 130, 231);
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

export default EditarCliente;
