import dotenv from 'dotenv';
import app from './app.js';
import conectarDB from './config/database.js';

dotenv.config();

await conectarDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});