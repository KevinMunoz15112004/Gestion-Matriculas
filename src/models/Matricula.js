import mongoose from 'mongoose';

const matriculaSchema = new mongoose.Schema({
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
    min: [1, 'Los créditos deben ser al menos 1']
  },
  materia: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: [true, 'La materia es obligatoria']
  }],
  estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    required: [true, 'El estudiante es obligatorio']
  }
}, {
  timestamps: true,
  versionKey: false
});

const Matricula = mongoose.model('Matricula', matriculaSchema);

export default Matricula;
