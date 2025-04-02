import mongoose from 'mongoose';
const { Schema } = mongoose;

const eventoSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    capacidad: { type: Number, required: true },
    disponible: { type: Boolean, default: true },
    creador: { type: Schema.Types.ObjectId, ref: 'Administrador', required: true },
    participantes: [{ type: Schema.Types.ObjectId, ref: 'Cliente' }],
    estado: { type: String, enum: ['disponible', 'completo', 'cancelado'], default: 'disponible' },
    createdAt: { type: Date, default: Date.now }
});

export const Evento = mongoose.model('Evento', eventoSchema);