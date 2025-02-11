const mongoose = require("mongoose");

const ViviendaSchema = new mongoose.Schema({
    id_vivienda: { type: Number, unique: true },
    nombre: { type: String, required: false, maxlength: 100 },
    direccion: { type: String, required: true, maxlength: 255 },
    tipo: {
        type: String,
        required: true,
        enum: ['Departamento', 'Casa', 'Dúplex'],
    },
    estado: {
        type: String,
        required: true,
        enum: ['En construcción', 'Terminada', 'Vendida'],
    },
    id_constructora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constructora', // Relacionado con el modelo Constructora
        required: true,
    },
    id_cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente', // Relacionado con el modelo Cliente
        default: null, // Puede ser null si no tiene cliente asignado
    },
    foto: { type: String, default: null }, // Guardamos el nombre de archivo de la foto de la vivienda
    fechaCreacion: { type: Date, default: Date.now }
});

// 📌 Generar un `id_vivienda` único antes de guardar
ViviendaSchema.pre("save", async function (next) {
    if (!this.id_vivienda) {
        const lastVivienda = await this.constructor.findOne().sort({ id_vivienda: -1 });
        this.id_vivienda = lastVivienda ? lastVivienda.id_vivienda + 1 : 1;
    }
    next();
});

module.exports = mongoose.model("Vivienda", ViviendaSchema);
