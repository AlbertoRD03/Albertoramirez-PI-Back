import mongoose from 'mongoose';

const setSchema = new mongoose.Schema({
    reps: { type: Number, required: true },
    peso: { type: Number, required: true }, // en kg
    rpe: { type: Number, min: 1, max: 10 }  // Esfuerzo percibido
});

const ejercicioRealizadoSchema = new mongoose.Schema({
    ejercicio_id: { type: Number, required: true }, // Referencia al ID de MySQL
    nombre_ejercicio: { type: String, required: true }, // Denormalizado para lectura rápida
    sets: [setSchema] // Array de series
});

const sessionSchema = new mongoose.Schema({
    usuario_id: { type: Number, required: true, index: true }, // Referencia al ID de MySQL
    fecha: { type: Date, default: Date.now },
    tipo_rutina: { type: String, required: true }, // Ej: "Pecho y Tríceps"
    ejercicios_realizados: [ejercicioRealizadoSchema],
    notas: { type: String },
    duracion_minutos: { type: Number }
}, {
    timestamps: true // Crea createdAt y updatedAt
});

export default mongoose.model('Session', sessionSchema);
