import { validationResult } from 'express-validator';
import Materia from '../models/Materia.js';

// Crear una nueva materia
export const crearMateria = async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        mensaje: 'Errores de validación',
        errores: errors.array() 
      });
    }

    const { nombre, codigo, descripcion, creditos } = req.body;

    // Verificar si la materia ya existe por código
    const materiaExistente = await Materia.findOne({ codigo: codigo.toUpperCase() });
    if (materiaExistente) {
      return res.status(400).json({ 
        mensaje: 'El código de materia ya está registrado' 
      });
    }

    // Crear la nueva materia
    const nuevaMateria = new Materia({
      nombre,
      codigo: codigo.toUpperCase(),
      descripcion,
      creditos
    });

    await nuevaMateria.save();

    res.status(201).json({ 
      mensaje: 'Materia creada exitosamente',
      materia: nuevaMateria
    });
  } catch (error) {
    console.error('Error al crear materia:', error);
    res.status(500).json({ 
      mensaje: 'Error al crear la materia',
      error: error.message 
    });
  }
};

// Obtener todas las materias
export const obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      mensaje: `Bienvenido - ${req.usuario.nombre} ${req.usuario.apellido}`,
      total: materias.length,
      materias
    });
  } catch (error) {
    console.error('Error al obtener materias:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener las materias',
      error: error.message 
    });
  }
};

// Obtener una materia por ID
export const obtenerMateriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const materia = await Materia.findById(id);

    if (!materia) {
      return res.status(404).json({ 
        mensaje: 'Materia no encontrada' 
      });
    }

    res.status(200).json({ 
      materia
    });
  } catch (error) {
    console.error('Error al obtener materia:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de materia inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al obtener la materia',
      error: error.message 
    });
  }
};

// Actualizar una materia
export const actualizarMateria = async (req, res) => {
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
    const { nombre, codigo, descripcion, creditos } = req.body;

    // Verificar si la materia existe
    const materia = await Materia.findById(id);
    if (!materia) {
      return res.status(404).json({ 
        mensaje: 'Materia no encontrada' 
      });
    }

    // Verificar si el código ya existe en otra materia
    if (codigo) {
      const materiaExistente = await Materia.findOne({ 
        _id: { $ne: id },
        codigo: codigo.toUpperCase()
      });

      if (materiaExistente) {
        return res.status(400).json({ 
          mensaje: 'El código de materia ya está registrado en otra materia' 
        });
      }
    }

    // Actualizar la materia
    const materiaActualizada = await Materia.findByIdAndUpdate(
      id,
      { 
        nombre, 
        codigo: codigo ? codigo.toUpperCase() : undefined, 
        descripcion, 
        creditos 
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      mensaje: 'Materia actualizada exitosamente',
      materia: materiaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar materia:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de materia inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al actualizar la materia',
      error: error.message 
    });
  }
};

// Eliminar una materia
export const eliminarMateria = async (req, res) => {
  try {
    const { id } = req.params;

    const materia = await Materia.findByIdAndDelete(id);

    if (!materia) {
      return res.status(404).json({ 
        mensaje: 'Materia no encontrada' 
      });
    }

    res.status(200).json({ 
      mensaje: 'Materia eliminada exitosamente',
      materia
    });
  } catch (error) {
    console.error('Error al eliminar materia:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de materia inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al eliminar la materia',
      error: error.message 
    });
  }
};
