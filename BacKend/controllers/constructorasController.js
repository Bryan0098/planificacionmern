const Constructora = require("../models/Constructora");
const mongoose = require("mongoose");

// 📌 Función para crear una constructora
exports.crearConstructora = async (req, res) => {
    try {
        const { nombre, telefono, email, ciudad, direccion } = req.body;

        if (!nombre || !telefono || !email || !ciudad || !direccion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si ya existe una constructora con el mismo nombre o email
        const constructoraExistente = await Constructora.findOne({ email });
        if (constructoraExistente) {
            return res.status(400).json({ error: "Ya existe una constructora con este correo electrónico." });
        }

        const constructora = new Constructora({
            nombre,
            telefono,
            email,
            ciudad,
            direccion,
            fechaCreacion: new Date(),
        });

        await constructora.save();
        res.status(201).json({ message: "Constructora creada con éxito", constructora });
    } catch (error) {
        console.error("🚨 Error al crear constructora:", error);
        res.status(500).json({ error: "Error al crear constructora", detalle: error.message });
    }
};

// 📌 Función para obtener todas las constructoras
// Función para obtener todas las constructoras con paginación
exports.obtenerConstructoras = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Establecer valores predeterminados
        const constructoras = await Constructora.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalConstructoras = await Constructora.countDocuments();

        res.status(200).json({
            constructoras,
            totalConstructoras,
            totalPages: Math.ceil(totalConstructoras / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("🚨 Error al obtener las constructoras:", error);
        res.status(500).json({ error: "Error al obtener las constructoras" });
    }
};


// 📌 Función para obtener una constructora por ID
exports.obtenerConstructoraPorId = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de constructora no válido." });
        }

        const constructora = await Constructora.findById(id);
        if (!constructora) {
            return res.status(404).json({ error: "Constructora no encontrada." });
        }

        res.status(200).json(constructora);
    } catch (error) {
        console.error("🚨 Error al obtener constructora:", error);
        res.status(500).json({ error: "Error interno al obtener la constructora." });
    }
};

// 📌 Función para actualizar una constructora por ID
exports.actualizarConstructora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, email, ciudad, direccion } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de constructora no válido." });
        }

        const constructoraExistente = await Constructora.findById(id);
        if (!constructoraExistente) {
            return res.status(404).json({ error: "Constructora no encontrada." });
        }

        const constructoraActualizada = await Constructora.findByIdAndUpdate(
            id,
            { nombre, telefono, email, ciudad, direccion },
            { new: true }
        );

        res.status(200).json({ message: "Constructora actualizada con éxito.", constructora: constructoraActualizada });
    } catch (error) {
        console.error("🚨 Error al actualizar constructora:", error);
        res.status(500).json({ error: "Error interno al actualizar la constructora." });
    }
};

// 📌 Función para eliminar una constructora por ID
exports.eliminarConstructora = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de constructora no válido." });
        }

        const constructoraEliminada = await Constructora.findByIdAndDelete(id);

        if (!constructoraEliminada) {
            return res.status(404).json({ error: "Constructora no encontrada." });
        }

        res.status(200).json({ message: "Constructora eliminada correctamente." });

    } catch (error) {
        console.error("🚨 Error al eliminar constructora:", error);
        res.status(500).json({ error: "Error interno al eliminar la constructora." });
    }
};
