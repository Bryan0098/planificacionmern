const express = require("express");
const router = express.Router();
const { uploadImagen } = require("../config/multerConfig");
const viviendasController = require("../controllers/viviendasController"); 

// 📌 Ruta para crear vivienda
router.post("/", uploadImagen.single("foto"), viviendasController.crearVivienda);

// 📌 Ruta para obtener todas las viviendas
router.get("/", viviendasController.obtenerViviendas);

// 📌 Ruta para obtener una vivienda por ID
router.get("/:id", viviendasController.obtenerViviendaPorId);

// 📌 Ruta para actualizar una vivienda por ID
router.put("/:id", uploadImagen.single("foto"), viviendasController.actualizarVivienda);

// 📌 Ruta para eliminar una vivienda por ID
router.delete("/:id", viviendasController.eliminarVivienda);

module.exports = router;
