import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // Añadir el token de autenticación
  },
});

export default API;
