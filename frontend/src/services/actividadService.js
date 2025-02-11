import axios from "axios";

// URL base del API
const API_BASE_URL = "http://localhost:5000/api";
const API_ACTIVIDADES_URL = `${API_BASE_URL}/actividades`;

// Crear nueva actividad
export const crearActividad = async (formData) => {
    try {
        const response = await axios.post(API_ACTIVIDADES_URL, formData);
        return response.data;
    } catch (error) {
        console.error('Error al crear actividad', error);
        throw error;
    }
};

// Obtener todas las actividades
export const obtenerActividades = async () => {
    try {
        const response = await axios.get(API_ACTIVIDADES_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener actividades", error);
        throw error;
    }
};

// Obtener actividad por ID
export const obtenerActividadPorId = async (id) => {
    try {
        const response = await axios.get(`${API_ACTIVIDADES_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener actividad", error);
        throw error;
    }
};

// Actualizar actividad
export const actualizarActividad = async (id, formData) => {
    try {
        const response = await axios.put(`${API_ACTIVIDADES_URL}/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar actividad", error);
        throw error;
    }
};

// Eliminar actividad por ID
export const eliminarActividad = async (id) => {
    try {
        const response = await axios.delete(`${API_ACTIVIDADES_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar actividad", error);
        throw error;
    }
};
