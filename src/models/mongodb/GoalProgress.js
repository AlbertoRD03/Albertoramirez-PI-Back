import mongoose from 'mongoose';

const goalProgressSchema = new mongoose.Schema({
  objetivo_id: { type: Number, required: true, index: true },
  usuario_id: { type: Number, required: true, index: true },
  valor_registrado: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model('GoalProgress', goalProgressSchema);
