const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  id_cliente: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  foto: { type: String },
  fechaCreacion: { type: Date, default: Date.now }
});

// Generar un `id_cliente` único antes de guardar
clienteSchema.pre("save", function(next) {
  if (!this.id_cliente) {
    this.id_cliente = Math.random().toString(36).substr(2, 9); // Genera un ID corto
  }
  next();
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
