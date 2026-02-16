import { validationResult } from 'express-validator';
import Estudiante from '../models/Estudiante.js';

// Crear un nuevo estudiante
export const crearEstudiante = async (req, res) => {
  try {
    // Validar los datos de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        mensaje: 'Errores de validación',
        errores: errors.array() 
      });
    }

    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

    // Verificar si el estudiante ya existe (por cédula o email)
    const estudianteExistente = await Estudiante.findOne({ 
      $or: [{ cedula }, { email }] 
    });

    if (estudianteExistente) {
      if (estudianteExistente.cedula === cedula) {
        return res.status(400).json({ 
          mensaje: 'La cédula ya está registrada' 
        });
      }
      if (estudianteExistente.email === email) {
        return res.status(400).json({ 
          mensaje: 'El email ya está registrado' 
        });
      }
    }

    // Crear el nuevo estudiante
    const nuevoEstudiante = new Estudiante({
      nombre,
      apellido,
      cedula,
      fecha_nacimiento,
      ciudad,
      direccion,
      telefono,
      email
    });

    await nuevoEstudiante.save();

    res.status(201).json({ 
      mensaje: 'Estudiante creado exitosamente',
      estudiante: nuevoEstudiante
    });
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ 
      mensaje: 'Error al crear el estudiante',
      error: error.message 
    });
  }
};

// Obtener todos los estudiantes
export const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      mensaje: `Bienvenido - ${req.usuario.nombre} ${req.usuario.apellido}`,
      total: estudiantes.length,
      estudiantes
    });
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener los estudiantes',
      error: error.message 
    });
  }
};

// Obtener un estudiante por ID
export const obtenerEstudiantePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findById(id);

    if (!estudiante) {
      return res.status(404).json({ 
        mensaje: 'Estudiante no encontrado' 
      });
    }

    res.status(200).json({ 
      estudiante
    });
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de estudiante inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al obtener el estudiante',
      error: error.message 
    });
  }
};

// Actualizar un estudiante
export const actualizarEstudiante = async (req, res) => {
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
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

    // Verificar si el estudiante existe
    const estudiante = await Estudiante.findById(id);
    if (!estudiante) {
      return res.status(404).json({ 
        mensaje: 'Estudiante no encontrado' 
      });
    }

    // Verificar si la cédula o email ya existen en otro estudiante
    if (cedula || email) {
      const estudianteExistente = await Estudiante.findOne({ 
        _id: { $ne: id },
        $or: [
          ...(cedula ? [{ cedula }] : []),
          ...(email ? [{ email }] : [])
        ]
      });

      if (estudianteExistente) {
        if (estudianteExistente.cedula === cedula) {
          return res.status(400).json({ 
            mensaje: 'La cédula ya está registrada en otro estudiante' 
          });
        }
        if (estudianteExistente.email === email) {
          return res.status(400).json({ 
            mensaje: 'El email ya está registrado en otro estudiante' 
          });
        }
      }
    }

    // Actualizar el estudiante
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(
      id,
      { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({ 
      mensaje: 'Estudiante actualizado exitosamente',
      estudiante: estudianteActualizado
    });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de estudiante inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al actualizar el estudiante',
      error: error.message 
    });
  }
};

// Eliminar un estudiante
export const eliminarEstudiante = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findByIdAndDelete(id);

    if (!estudiante) {
      return res.status(404).json({ 
        mensaje: 'Estudiante no encontrado' 
      });
    }

    res.status(200).json({ 
      mensaje: 'Estudiante eliminado exitosamente',
      estudiante
    });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ 
        mensaje: 'ID de estudiante inválido' 
      });
    }
    res.status(500).json({ 
      mensaje: 'Error al eliminar el estudiante',
      error: error.message 
    });
  }
};
