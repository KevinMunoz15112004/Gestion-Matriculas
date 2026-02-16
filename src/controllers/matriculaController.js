import { validationResult } from 'express-validator';
import Matricula from '../models/Matricula.js';
import Estudiante from '../models/Estudiante.js';
import Materia from '../models/Materia.js';

// Crear una nueva matrícula
export const crearMatricula = async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        mensaje: 'Errores de validación',
        errores: errors.array() 
      });
    }

    const { codigo, descripcion, creditos, materia, estudiante } = req.body;

    // Verificar si el código ya existe
    const matriculaExistente = await Matricula.findOne({ codigo: codigo.toUpperCase() });
    if (matriculaExistente) {
      return res.status(400).json({ 
        mensaje: 'El código de matrícula ya está registrado' 
      });
    }

    // Verificar si la materia existe
    const materiaExiste = await Materia.findById(materia);
    if (!materiaExiste) {
      return res.status(404).json({ 
        mensaje: 'La materia especificada no existe' 
      });
    }

    // Verificar si el estudiante existe
    const estudianteExiste = await Estudiante.findById(estudiante);
    if (!estudianteExiste) {
      return res.status(404).json({ 
        mensaje: 'El estudiante especificado no existe' 
      });
    }

    // Verificar si ya existe una matrícula para este estudiante en esta materia
    const matriculaDuplicada = await Matricula.findOne({ 
      materia, 
      estudiante 
    });

    if (matriculaDuplicada) {
      return res.status(400).json({ 
        mensaje: 'El estudiante ya está matriculado en esta materia' 
      });
    }

    // Crear la nueva matrícula
    const nuevaMatricula = new Matricula({
      codigo: codigo.toUpperCase(),
      descripcion,
      creditos,
      materia,
      estudiante
    });

    await nuevaMatricula.save();

    // Poblar los datos para la respuesta
    await nuevaMatricula.populate('materia');
    await nuevaMatricula.populate('estudiante');

    res.status(201).json({ 
      mensaje: 'Matrícula creada exitosamente',
      matricula: nuevaMatricula
    });
  } catch (error) {
    console.error('Error al crear matrícula:', error);
    res.status(500).json({ 
      mensaje: 'Error al crear la matrícula',
      error: error.message 
    });
  }
};

// Obtener todas las matrículas
export const obtenerMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.find()
      .populate('materia')
      .populate('estudiante')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ 
      mensaje: `Bienvenido - ${req.usuario.nombre} ${req.usuario.apellido}`,
      total: matriculas.length,
      matriculas
    });
  } catch (error) {
    console.error('Error al obtener matrículas:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener las matrículas',
      error: error.message 
    });
  }
};

// Obtener una matrícula por ID
export const obtenerMatriculaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const matricula = await Matricula.findById(id)
      .populate('materia')
      .populate('estudiante');

    if (!matricula) {
      return res.status(404).json({ 
        mensaje: 'Matrícula no encontrada' 
      });
    }

    res.status(200).json({ 
      matricula
    });
  } catch (error) {
    console.error('Error al obtener matrícula:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de matrícula inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al obtener la matrícula',
      error: error.message 
    });
  }
};

// Obtener matrículas por estudiante
export const obtenerMatriculasPorEstudiante = async (req, res) => {
  try {
    const { estudianteId } = req.params;

    // Verificar si el estudiante existe
    const estudiante = await Estudiante.findById(estudianteId);
    if (!estudiante) {
      return res.status(404).json({ 
        mensaje: 'Estudiante no encontrado' 
      });
    }

    const matriculas = await Matricula.find({ estudiante: estudianteId })
      .populate('materia')
      .populate('estudiante')
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      total: matriculas.length,
      estudiante,
      matriculas
    });
  } catch (error) {
    console.error('Error al obtener matrículas por estudiante:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de estudiante inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al obtener las matrículas del estudiante',
      error: error.message 
    });
  }
};

// Obtener matrículas por materia
export const obtenerMatriculasPorMateria = async (req, res) => {
  try {
    const { materiaId } = req.params;

    // Verificar si la materia existe
    const materia = await Materia.findById(materiaId);
    if (!materia) {
      return res.status(404).json({ 
        mensaje: 'Materia no encontrada' 
      });
    }

    const matriculas = await Matricula.find({ materia: materiaId })
      .populate('materia')
      .populate('estudiante')
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      total: matriculas.length,
      materia,
      matriculas
    });
  } catch (error) {
    console.error('Error al obtener matrículas por materia:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de materia inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al obtener las matrículas de la materia',
      error: error.message 
    });
  }
};

// Actualizar una matrícula
export const actualizarMatricula = async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        mensaje: 'Errores de validación',
        errores: errors.array() 
      });
    }

    const { id } = req.params;
    const { codigo, descripcion, creditos, materia, estudiante } = req.body;

    // Verificar si la matrícula existe
    const matricula = await Matricula.findById(id);
    if (!matricula) {
      return res.status(404).json({ 
        mensaje: 'Matrícula no encontrada' 
      });
    }

    // Verificar si el código ya existe en otra matrícula
    if (codigo) {
      const matriculaExistente = await Matricula.findOne({ 
        _id: { $ne: id },
        codigo: codigo.toUpperCase()
      });

      if (matriculaExistente) {
        return res.status(400).json({ 
          mensaje: 'El código de matrícula ya está registrado en otra matrícula' 
        });
      }
    }

    // Si se actualiza la materia, verificar que exista
    if (materia) {
      const materiaExiste = await Materia.findById(materia);
      if (!materiaExiste) {
        return res.status(404).json({ 
          mensaje: 'La materia especificada no existe' 
        });
      }
    }

    // Si se actualiza el estudiante, verificar que exista
    if (estudiante) {
      const estudianteExiste = await Estudiante.findById(estudiante);
      if (!estudianteExiste) {
        return res.status(404).json({ 
          mensaje: 'El estudiante especificado no existe' 
        });
      }
    }

    // Verificar duplicados si se actualiza materia o estudiante
    if (materia || estudiante) {
      const matriculaDuplicada = await Matricula.findOne({ 
        _id: { $ne: id },
        materia: materia || matricula.materia, 
        estudiante: estudiante || matricula.estudiante 
      });

      if (matriculaDuplicada) {
        return res.status(400).json({ 
          mensaje: 'Ya existe una matrícula para este estudiante en esta materia' 
        });
      }
    }

    // Actualizar la matrícula
    const matriculaActualizada = await Matricula.findByIdAndUpdate(
      id,
      { 
        codigo: codigo ? codigo.toUpperCase() : undefined, 
        descripcion, 
        creditos, 
        materia, 
        estudiante 
      },
      { new: true, runValidators: true }
    ).populate('materia').populate('estudiante');

    res.status(200).json({ 
      mensaje: 'Matrícula actualizada exitosamente',
      matricula: matriculaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar matrícula:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al actualizar la matrícula',
      error: error.message 
    });
  }
};

// Eliminar una matrícula
export const eliminarMatricula = async (req, res) => {
  try {
    const { id } = req.params;

    const matricula = await Matricula.findByIdAndDelete(id)
      .populate('materia')
      .populate('estudiante');

    if (!matricula) {
      return res.status(404).json({ 
        mensaje: 'Matrícula no encontrada' 
      });
    }

    res.status(200).json({ 
      mensaje: 'Matrícula eliminada exitosamente',
      matricula
    });
  } catch (error) {
    console.error('Error al eliminar matrícula:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de matrícula inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al eliminar la matrícula',
      error: error.message 
    });
  }
};
