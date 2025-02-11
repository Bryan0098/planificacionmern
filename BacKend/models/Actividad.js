const mongoose = require("mongoose");

const ActividadSchema = new mongoose.Schema({
    id_actividad: { type: Number, unique: true },
    descripcion: { type: String, required: true, maxlength: 255 },
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    id_vivienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vivienda', // Relación con el modelo Vivienda
        required: true,
    },
    id_constructora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Constructora', // Relación con el modelo Constructora
        required: true,
    },
    fechaCreacion: { type: Date, default: Date.now }
});

// 📌 Generar un `id_actividad` único antes de guardar
ActividadSchema.pre("save", async function (next) {
    if (!this.id_actividad) {
        const lastActividad = await this.constructor.findOne().sort({ id_actividad: -1 });
        this.id_actividad = lastActividad ? lastActividad.id_actividad + 1 : 1;
    }
    next();
});

module.exports = mongoose.model("Actividad", ActividadSchema);
