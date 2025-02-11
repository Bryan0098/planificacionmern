import axios from "axios";

const API_URL = "http://localhost:5000/api/clientes"; // URL del backend

// 📌 Crear un cliente con imagen de perfil
export const crearCliente = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("🚨 Error en la petición al servidor:", error);
    throw error;
  }
};

// 📌 Obtener todos los clientes
export const listarClientes = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/clientes');
    const data = await response.json();
    console.log("Datos recibidos de la API:", data);
    
    // Accede al array dentro de la propiedad 'clientes'
    return data.clientes;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return [];  // Retorna un array vacío en caso de error
  }
};



// 📌 Eliminar cliente por ID (id_cliente)
export const eliminarCliente = async (id_cliente) => {
  try {
    // Usamos id_cliente para la eliminación
    await axios.delete(`${API_URL}/${id_cliente}`);
  } catch (error) {
    console.error("🚨 Error al eliminar cliente:", error);
    throw error;
  }
};

// 📌 Obtener cliente por ID (id_cliente)
export const obtenerClientePorId = async (id_cliente) => {
  if (!id_cliente) {
    console.error("🚨 ID de cliente inválido:", id_cliente);
    throw new Error("ID de cliente inválido");
  }

  try {
    console.log(`🔍 Buscando cliente con ID: ${id_cliente}`);
    // Cambiamos _id por id_cliente en la URL
    const response = await axios.get(`${API_URL}/${id_cliente}`);
    console.log("🟢 Datos del cliente obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 Error al obtener cliente:", error.response?.data || error);
    throw error;
  }
};

// 📌 Actualizar cliente por ID (id_cliente)
export const actualizarCliente = async (id_cliente, clienteData) => {
  try {
    console.log("📤 Enviando datos de actualización:", clienteData);

    const response = await axios.put(`${API_URL}/${id_cliente}`, clienteData, {
      headers: {
        "Content-Type": clienteData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    console.log("🟢 Respuesta de actualización:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 Error al actualizar cliente:", error.response?.data || error);
    throw error;
  }
};
