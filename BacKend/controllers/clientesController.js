const Cliente = require("../models/Cliente");
const mongoose = require("mongoose");

// 📌 Función para crear un cliente
exports.crearCliente = async (req, res) => {
    try {
        console.log("📌 Datos recibidos en req.body:", req.body);
        console.log("📌 Archivo recibido:", req.file);

        const { nombre, telefono, email } = req.body;
        const foto = req.file ? req.file.filename : null;

        if (!nombre || !telefono || !email) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Crear el nuevo cliente con los datos recibidos
        const cliente = new Cliente({
            id_cliente: Math.random().toString(36).substr(2, 9), // Generación del ID corto
            nombre,
            telefono,
            email,
            foto,
            fechaCreacion: new Date()  // Fecha de creación por defecto
        });

        await cliente.save();
        res.status(201).json({ message: "Cliente creado con éxito", cliente });
    } catch (error) {
        console.error("🚨 Error al crear cliente:", error);
        res.status(500).json({ error: "Error al crear cliente", detalle: error.message });
    }
};

// 📌 Función para obtener todos los clientes
// Función para obtener todos los clientes con paginación
exports.obtenerClientes = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;  // Establecer valores predeterminados
        const clientes = await Cliente.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const totalClientes = await Cliente.countDocuments();

        res.status(200).json({
            clientes,
            totalClientes,
            totalPages: Math.ceil(totalClientes / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("🚨 Error al obtener los clientes:", error);
        res.status(500).json({ error: "Error al obtener los clientes" });
    }
};


// 📌 Función para obtener un cliente por id_cliente
exports.obtenerClientePorId = async (req, res) => {
    try {
        const { id_cliente } = req.params;  // Usamos id_cliente en la URL

        // Verifica si el id_cliente es válido
        if (!id_cliente || id_cliente.length !== 9) {  // Ajusta esta validación según el formato del ID
            return res.status(400).json({ error: "ID de cliente no válido." });
        }

        // Busca por id_cliente en lugar de _id
        const cliente = await Cliente.findOne({ id_cliente });

        if (!cliente) {
            return res.status(404).json({ error: "Cliente no encontrado." });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error("🚨 Error al obtener cliente:", error);
        res.status(500).json({ error: "Error interno al obtener el cliente." });
    }
};

// 📌 Función para actualizar un cliente por id_cliente
exports.actualizarCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;  // Usamos id_cliente en la URL

        // Verifica si el id_cliente es válido
        if (!id_cliente || id_cliente.length !== 9) {  // Ajusta esta validación según el formato del ID
            return res.status(400).json({ error: "ID de cliente no válido." });
        }

        const datosActualizados = req.body;
        if (req.file) {
            datosActualizados.foto = req.file.filename;  // Solo actualiza la foto si se sube una nueva
        }

        // Busca y actualiza el cliente usando id_cliente
        const clienteActualizado = await Cliente.findOneAndUpdate({ id_cliente }, datosActualizados, { new: true });

        if (!clienteActualizado) {
            return res.status(404).json({ error: "Cliente no encontrado." });
        }

        res.status(200).json({ message: "Cliente actualizado con éxito", cliente: clienteActualizado });
    } catch (error) {
        console.error("🚨 Error al actualizar cliente:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

// 📌 Función para eliminar un cliente por id_cliente
exports.eliminarCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;  // Usamos id_cliente en la URL

        // Verifica si el id_cliente es válido
        if (!id_cliente || id_cliente.length !== 9) {  // Ajusta esta validación según el formato del ID
            return res.status(400).json({ error: "ID de cliente no válido." });
        }

        // Elimina el cliente usando id_cliente
        const clienteEliminado = await Cliente.findOneAndDelete({ id_cliente });

        if (!clienteEliminado) {
            return res.status(404).json({ error: "Cliente no encontrado." });
        }

        res.status(200).json({ message: "Cliente eliminado correctamente." });
    } catch (error) {
        console.error("🚨 Error al eliminar cliente:", error);
        res.status(500).json({ error: "Error interno al eliminar el cliente." });
    }
};
