const express = require("express");
const router = express.Router();
const actividadesController = require("../controllers/actividadesController"); 

// 📌 Ruta para crear actividad
router.post("/", actividadesController.crearActividad);

// 📌 Ruta para obtener todas las actividades
router.get("/", actividadesController.obtenerActividades);

// 📌 Ruta para obtener una actividad por ID
router.get("/:id", actividadesController.obtenerActividadPorId);

// 📌 Ruta para actualizar una actividad por ID
router.put("/:id", actividadesController.actualizarActividad);

// 📌 Ruta para eliminar una actividad por ID
router.delete("/:id", actividadesController.eliminarActividad);

module.exports = router;
