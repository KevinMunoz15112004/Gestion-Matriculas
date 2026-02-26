import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    unique: true,
    trim: true,
    uppercase: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  creditos: {
    type: Number,
    required: [true, 'Los créditos son obligatorios'],
    min: [1, 'Los créditos deben ser al menos 1'],
    max: [10, 'Los créditos no pueden ser más de 10']
  }
}, {
  timestamps: true,
  versionKey: false
});

const Materia = mongoose.model('Materia', materiaSchema);

export default Materia;