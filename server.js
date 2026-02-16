import dotenv from 'dotenv';
import app from './app.js';
import conectarDB from './src/config/database.js';

// Configurar variables de entorno
dotenv.config();

// Conectar a la base de datos
await conectarDB();

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
