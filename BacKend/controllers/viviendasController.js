const Vivienda = require("../models/Vivienda");
const Constructora = require("../models/Constructora");
const Cliente = require("../models/Cliente");
const mongoose = require("mongoose");
// Crear nueva vivienda
exports.crearVivienda = async (req, res) => {
    try {
        const { nombre, direccion, tipo, estado, id_constructora, id_cliente } = req.body;
        const foto = req.file ? req.file.filename : null;

        // Verificar que la constructora existe
        const constructora = await Constructora.findById(id_constructora);
        if (!constructora) {
            return res.status(400).json({ message: "La constructora no existe." });
        }

        // Si se proporciona, verificar que el cliente existe
        let cliente = null;
        if (id_cliente) {
            cliente = await Cliente.findById(id_cliente);
            if (!cliente) {
                return res.status(400).json({ message: "El cliente no existe." });
            }
        }

        // Crear la vivienda
        const nuevaVivienda = new Vivienda({
            nombre,
            direccion,
            tipo,
            estado,
            id_constructora,
            id_cliente: cliente ? cliente._id : null,
            foto,
        });

        await nuevaVivienda.save();
        res.status(201).json({ message: "Vivienda registrada con éxito", vivienda: nuevaVivienda });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear vivienda." });
    }
};



// Obtener todas las viviendas con sus relaciones
exports.obtenerViviendas = async (req, res) => {
    try {
        const viviendas = await Vivienda.find()
            .populate('id_constructora')  // Esto llena los datos de la constructora
            .populate('id_cliente');  // Esto llena los datos del cliente
        res.status(200).json(viviendas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener viviendas." });
    }
};


// Obtener vivienda por ID

exports.obtenerViviendaPorId = async (req, res) => {
    const { id } = req.params;

    // Validar que el ID tenga el formato correcto de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID de vivienda no válido." });
    }

    try {
        const vivienda = await Vivienda.findById(id)
            .populate('id_constructora')
            .populate('id_cliente');
        
        if (!vivienda) {
            return res.status(404).json({ message: "Vivienda no encontrada." });
        }

        res.status(200).json(vivienda);
    } catch (error) {
        console.error("Error al obtener la vivienda:", error);
        res.status(500).json({ message: "Error al obtener la vivienda." });
    }
};


// Actualizar vivienda
exports.actualizarVivienda = async (req, res) => {
    try {
        const { nombre, direccion, tipo, estado, id_constructora, id_cliente } = req.body;
        const foto = req.file ? req.file.filename : null;

        // Verificar que la constructora existe
        const constructora = await Constructora.findById(id_constructora);
        if (!constructora) {
            return res.status(400).json({ message: "La constructora no existe." });
        }

        // Si se proporciona, verificar que el cliente existe
        let cliente = null;
        if (id_cliente) {
            cliente = await Cliente.findById(id_cliente);
            if (!cliente) {
                return res.status(400).json({ message: "El cliente no existe." });
            }
        }

        // Actualizar vivienda
        const vivienda = await Vivienda.findByIdAndUpdate(
            req.params.id,
            {
                nombre,
                direccion,
                tipo,
                estado,
                id_constructora,
                id_cliente: cliente ? cliente._id : null,
                foto,
            },
            { new: true }
        );

        if (!vivienda) {
            return res.status(404).json({ message: "Vivienda no encontrada." });
        }

        res.status(200).json({ message: "Vivienda actualizada con éxito.", vivienda });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar vivienda." });
    }
};

// Eliminar vivienda
exports.eliminarVivienda = async (req, res) => {
    try {
        const vivienda = await Vivienda.findByIdAndDelete(req.params.id);
        if (!vivienda) {
            return res.status(404).json({ message: "Vivienda no encontrada." });
        }
        res.status(200).json({ message: "Vivienda eliminada con éxito." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar vivienda." });
    }
};
