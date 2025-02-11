import axios from "axios";

const API_URL = "http://localhost:5000/api/constructoras"; // URL del backend para constructoras

// 📌 Crear una nueva constructora sin imagen
export const crearConstructora = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/`, data, {
      headers: { "Content-Type": "application/json" }, // Usamos JSON en lugar de multipart/form-data
    });
    return response.data;
  } catch (error) {
    console.error("🚨 Error en la petición al servidor:", error);
    throw error;
  }
};

// 📌 Obtener todas las constructoras
export const listarConstructoras = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("🚨 Error al obtener las constructoras:", error);
    throw error;
  }
};

// 📌 Eliminar constructora por ID (id_constructora)
export const eliminarConstructora = async (id_constructora) => {
  try {
    // Usamos id_constructora para la eliminación
    await axios.delete(`${API_URL}/${id_constructora}`);
  } catch (error) {
    console.error("🚨 Error al eliminar constructora:", error);
    throw error;
  }
};

// 📌 Obtener constructora por ID (id_constructora)
export const obtenerConstructoraPorId = async (id_constructora) => {
  if (!id_constructora) {
    console.error("🚨 ID de constructora inválido:", id_constructora);
    throw new Error("ID de constructora inválido");
  }

  try {
    console.log(`🔍 Buscando constructora con ID: ${id_constructora}`);
    const response = await axios.get(`${API_URL}/${id_constructora}`);
    console.log("🟢 Datos de la constructora obtenidos:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 Error al obtener constructora:", error.response?.data || error);
    throw error;
  }
};

// 📌 Actualizar constructora por ID (id_constructora)
export const actualizarConstructora = async (id_constructora, constructoraData) => {
  try {
    console.log("📤 Enviando datos de actualización:", constructoraData);

    const response = await axios.put(`${API_URL}/${id_constructora}`, constructoraData, {
      headers: {
        "Content-Type": "application/json", // Usamos JSON en lugar de multipart/form-data
      },
    });
    console.log("🟢 Respuesta de actualización:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 Error al actualizar constructora:", error.response?.data || error);
    throw error;
  }
};
