const express = require("express");
const router = express.Router();
const { uploadImagen } = require("../config/multerConfig");
const constructorasController = require("../controllers/constructorasController"); 

// 📌 Ruta para crear constructora
router.post("/", constructorasController.crearConstructora);

// 📌 Ruta para obtener todas las constructoras
router.get("/", constructorasController.obtenerConstructoras);

// 📌 Ruta para obtener una constructora por ID
router.get("/:id", constructorasController.obtenerConstructoraPorId);

// 📌 Ruta para actualizar una constructora por ID
router.put("/:id", constructorasController.actualizarConstructora);

// 📌 Ruta para eliminar una constructora por ID
router.delete("/:id", constructorasController.eliminarConstructora);

module.exports = router;
