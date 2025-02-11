const express = require("express");
const router = express.Router();
const { uploadImagen } = require("../config/multerConfig");
const clientesController = require("../controllers/clientesController");  // Verifica que esta ruta esté correcta

// 📌 Ruta para crear cliente con foto
router.post("/", uploadImagen.single("foto"), clientesController.crearCliente);  // Aquí se hace referencia a la función exportada

// 📌 Ruta para obtener todos los clientes
router.get("/", clientesController.obtenerClientes);

// 📌 Ruta para obtener un cliente por ID
router.get("/:id", clientesController.obtenerClientePorId);

// 📌 Ruta para actualizar un cliente por ID
router.put("/:id", uploadImagen.single("foto"), clientesController.actualizarCliente);

// 📌 Ruta para eliminar un cliente por ID
router.delete("/:id", clientesController.eliminarCliente);

module.exports = router;
