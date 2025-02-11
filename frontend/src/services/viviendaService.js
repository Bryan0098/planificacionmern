import axios from "axios";

// URL base del API
const API_BASE_URL = "http://localhost:5000/api";
const API_VIVIENDAS_URL = `${API_BASE_URL}/viviendas`;
const API_CONSTRUCTORAS_URL = `${API_BASE_URL}/constructoras`;


// Crear nueva vivienda
export const crearVivienda = async (formData) => {
    try {
        const response = await axios.post(API_VIVIENDAS_URL, formData);
        return response.data;
    } catch (error) {
        console.error('Error al crear vivienda', error);
        throw error;
    }
};

// Obtener todas las viviendas
export const obtenerViviendas = async () => {
    try {
        const response = await axios.get(API_VIVIENDAS_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener viviendas", error);
        throw error;
    }
};

// Obtener vivienda por ID
export const obtenerViviendaPorId = async (id) => {
    try {
        const response = await axios.get(`${API_VIVIENDAS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener vivienda", error);
        throw error;
    }
};

// Actualizar vivienda
export const actualizarVivienda = async (id, formData) => {
    try {
        const response = await axios.put(`${API_VIVIENDAS_URL}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar vivienda", error);
        throw error;
    }
};

// Eliminar vivienda por ID
export const eliminarVivienda = async (id) => {
    try {
        const response = await axios.delete(`${API_VIVIENDAS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar vivienda", error);
        throw error;
    }
};

// ✅ Agrega esta función para obtener constructoras

export const obtenerConstructoras = async () => {
    try {
        const response = await axios.get(API_CONSTRUCTORAS_URL);
        
        // Verifica que la respuesta contiene el array de constructoras
        if (response.data.constructoras && Array.isArray(response.data.constructoras)) {
            console.log("Constructoras obtenidas:", response.data.constructoras);
            return response.data.constructoras;
        } else {
            console.error("Respuesta inesperada al obtener constructoras");
            return [];  // Devuelve un array vacío si no es la respuesta esperada
        }
    } catch (error) {
        console.error("Error al obtener constructoras", error);
        throw error;
    }
};
