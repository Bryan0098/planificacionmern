const mongoose = require("mongoose");

const ConstructoraSchema = new mongoose.Schema({
    id_constructora: { type: Number, unique: true },
    nombre: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true },
    ciudad: { type: String, required: true },
    direccion: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now }
});

// 📌 Generar un `id_constructora` único antes de guardar
ConstructoraSchema.pre("save", async function (next) {
    if (!this.id_constructora) {
        const lastConstructora = await this.constructor.findOne().sort({ id_constructora: -1 });
        this.id_constructora = lastConstructora ? lastConstructora.id_constructora + 1 : 1;
    }
    next();
});

module.exports = mongoose.model("Constructora", ConstructoraSchema);
