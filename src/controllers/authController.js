import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

export const registrarUsuario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        mensaje: 'Errores de validación',
        errores: errors.array() 
      });
    }

    const { nombre, apellido, email, password } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        mensaje: 'El email ya está registrado' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      password: passwordHash
    });

    await nuevoUsuario.save();

    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        email: nuevoUsuario.email
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
      mensaje: 'Error al registrar el usuario',
      error: error.message 
    });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        mensaje: 'Errores de validación',
        errores: errors.array() 
      });
    }

    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ 
        mensaje: 'Usuario o contraseña incorrectos' 
      });
    }

    const esPasswordValida = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValida) {
      return res.status(401).json({ 
        mensaje: 'Usuario o contraseña incorrectos' 
      });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({ 
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ 
      mensaje: 'Error al iniciar sesión',
      error: error.message 
    });
  }
};

export const obtenerPerfil = async (req, res) => {
  try {
    res.status(200).json({ 
      mensaje: `Bienvenido - ${req.usuario.nombre} ${req.usuario.apellido}`,
      usuario: req.usuario
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ 
      mensaje: 'Error al obtener el perfil',
      error: error.message 
    });
  }
};