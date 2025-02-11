const Actividad = require("../models/Actividad");
const mongoose = require("mongoose");

// 📌 Función para crear una actividad
exports.crearActividad = async (req, res) => {
    try {
        console.log("📌 Datos recibidos en req.body:", req.body);

        const { descripcion, fecha_inicio, fecha_fin, id_vivienda, id_constructora } = req.body;

        if (!descripcion || !fecha_inicio || !fecha_fin || !id_vivienda || !id_constructora) {
            return res.status(400).json({ error: "Los campos 'descripcion', 'fecha_inicio', 'fecha_fin', 'id_vivienda' y 'id_constructora' son obligatorios." });
        }

        const actividad = new Actividad({
            descripcion,
            fecha_inicio,
            fecha_fin,
            id_vivienda,
            id_constructora,
            fechaCreacion: new Date()
        });

        await actividad.save();
        res.status(201).json({ message: "Actividad creada con éxito", actividad });
    } catch (error) {
        console.error("🚨 Error al crear actividad:", error);
        res.status(500).json({ error: "Error al crear actividad", detalle: error.message });
    }
};

// 📌 Función para obtener todas las actividades
exports.obtenerActividades = async (req, res) => {
    try {
        const actividades = await Actividad.find()
            .populate('id_vivienda')
            .populate('id_constructora');
        res.status(200).json(actividades);
    } catch (error) {
        console.error("🚨 Error al obtener las actividades:", error);
        res.status(500).json({ error: "Error al obtener las actividades" });
    }
};

// 📌 Función para obtener una actividad por ID
exports.obtenerActividadPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de actividad no válido." });
        }

        const actividad = await Actividad.findById(id)
            .populate('id_vivienda')
            .populate('id_constructora');

        if (!actividad) {
            return res.status(404).json({ error: "Actividad no encontrada." });
        }

        res.status(200).json(actividad);
    } catch (error) {
        console.error("🚨 Error al obtener actividad:", error);
        res.status(500).json({ error: "Error interno al obtener la actividad." });
    }
};

// 📌 Función para actualizar una actividad por ID
exports.actualizarActividad = async (req, res) => {
    try {
        const { id } = req.params;
        const { descripcion, fecha_inicio, fecha_fin, id_vivienda, id_constructora } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de actividad no válido." });
        }

        const actividadActualizada = await Actividad.findByIdAndUpdate(
            id,
            { descripcion, fecha_inicio, fecha_fin, id_vivienda, id_constructora },
            { new: true }
        );

        if (!actividadActualizada) {
            return res.status(404).json({ error: "Actividad no encontrada." });
        }

        res.status(200).json({ message: "Actividad actualizada con éxito.", actividad: actividadActualizada });

    } catch (error) {
        console.error("🚨 Error al actualizar actividad:", error);
        res.status(500).json({ error: "Error interno al actualizar la actividad." });
    }
};

// 📌 Función para eliminar una actividad por ID
exports.eliminarActividad = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de actividad no válido." });
        }

        const actividadEliminada = await Actividad.findByIdAndDelete(id);

        if (!actividadEliminada) {
            return res.status(404).json({ error: "Actividad no encontrada." });
        }

        res.status(200).json({ message: "Actividad eliminada correctamente." });

    } catch (error) {
        console.error("🚨 Error al eliminar actividad:", error);
        res.status(500).json({ error: "Error interno al eliminar la actividad." });
    }
};
