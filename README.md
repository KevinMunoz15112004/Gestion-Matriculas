# Sistema de Gestión de Matrículas - Backend

Backend desarrollado en Node.js con Express y MongoDB para gestionar un sistema de matrículas universitarias.

## 📋 Características

- ✅ Autenticación de usuarios con JWT
- ✅ CRUD completo de Estudiantes
- ✅ CRUD completo de Materias
- ✅ CRUD completo de Matrículas
- ✅ Validación de datos con Express Validator
- ✅ Arquitectura MVC
- ✅ Módulos ES6
- ✅ Manejo de errores por controlador
- ✅ Relaciones entre colecciones (Matrículas - Estudiantes - Materias)

## 🛠️ Tecnologías

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación mediante tokens
- **bcryptjs** - Hash de contraseñas
- **Express Validator** - Validación de datos

## 📁 Estructura del Proyecto

```
├── config/
│   └── database.js          # Configuración de MongoDB
├── controllers/
│   ├── authController.js    # Lógica de autenticación
│   ├── estudianteController.js
│   ├── materiaController.js
│   └── matriculaController.js
├── middlewares/
│   └── authMiddleware.js    # Verificación de JWT
├── models/
│   ├── Usuario.js
│   ├── Estudiante.js
│   ├── Materia.js
│   └── Matricula.js
├── routes/
│   ├── authRoutes.js        # Rutas públicas de auth
│   ├── estudianteRoutes.js  # Rutas privadas
│   ├── materiaRoutes.js     # Rutas privadas
│   └── matriculaRoutes.js   # Rutas privadas
├── .env                     # Variables de entorno
├── .gitignore
├── app.js                   # Configuración de Express
├── server.js                # Punto de entrada
└── package.json
```

## ⚙️ Instalación

1. **Clonar el repositorio**

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Editar el archivo `.env`:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/gestion_matriculas
   JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion
   JWT_EXPIRE=24h
   ```

4. **Asegurarse de que MongoDB esté ejecutándose**
   ```bash
   mongod
   ```

5. **Iniciar el servidor**
   ```bash
   npm start
   ```

   El servidor estará disponible en: `http://localhost:3000`

## 📡 API Endpoints

### Autenticación (Rutas Públicas)

#### Registrar Usuario
```http
POST /api/auth/registrar
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta:**
```json
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "...",
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com"
  }
}
```

#### Obtener Perfil
```http
GET /api/auth/perfil
Authorization: Bearer {token}
```

---

### Estudiantes (Rutas Privadas)

#### Crear Estudiante
```http
POST /api/estudiantes
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "María",
  "apellido": "García",
  "cedula": "1234567890",
  "fecha_nacimiento": "2000-05-15",
  "ciudad": "Quito",
  "direccion": "Av. Principal 123",
  "telefono": "0999999999",
  "email": "maria@example.com"
}
```

#### Obtener Todos los Estudiantes
```http
GET /api/estudiantes
Authorization: Bearer {token}
```

#### Obtener Estudiante por ID
```http
GET /api/estudiantes/:id
Authorization: Bearer {token}
```

#### Actualizar Estudiante
```http
PUT /api/estudiantes/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "María Actualizada",
  "apellido": "García",
  ...
}
```

#### Eliminar Estudiante
```http
DELETE /api/estudiantes/:id
Authorization: Bearer {token}
```

---

### Materias (Rutas Privadas)

#### Crear Materia
```http
POST /api/materias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Programación Web",
  "codigo": "PW101",
  "descripcion": "Curso de programación web con Node.js",
  "creditos": 5
}
```

#### Obtener Todas las Materias
```http
GET /api/materias
Authorization: Bearer {token}
```

#### Obtener Materia por ID
```http
GET /api/materias/:id
Authorization: Bearer {token}
```

#### Actualizar Materia
```http
PUT /api/materias/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Programación Web Avanzada",
  "codigo": "PW101",
  ...
}
```

#### Eliminar Materia
```http
DELETE /api/materias/:id
Authorization: Bearer {token}
```

---

### Matrículas (Rutas Privadas)

#### Crear Matrícula
```http
POST /api/matriculas
Authorization: Bearer {token}
Content-Type: application/json

{
  "codigo": "MAT001",
  "descripcion": "Matrícula Semestre 2024-1",
  "creditos": 5,
  "materia": "60d5f484f1b2c8b1f8e4e1a1",
  "estudiante": "60d5f484f1b2c8b1f8e4e1a2"
}
```

#### Obtener Todas las Matrículas
```http
GET /api/matriculas
Authorization: Bearer {token}
```

#### Obtener Matrícula por ID
```http
GET /api/matriculas/:id
Authorization: Bearer {token}
```

#### Obtener Matrículas por Estudiante
```http
GET /api/matriculas/estudiante/:estudianteId
Authorization: Bearer {token}
```

#### Obtener Matrículas por Materia
```http
GET /api/matriculas/materia/:materiaId
Authorization: Bearer {token}
```

#### Actualizar Matrícula
```http
PUT /api/matriculas/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "codigo": "MAT001",
  "descripcion": "Actualizada",
  ...
}
```

#### Eliminar Matrícula
```http
DELETE /api/matriculas/:id
Authorization: Bearer {token}
```

---

## 🗄️ Modelos de Datos

### Usuario
```javascript
{
  nombre: String,
  apellido: String,
  email: String (unique),
  password: String (hasheado)
}
```

### Estudiante
```javascript
{
  nombre: String,
  apellido: String,
  cedula: String (unique),
  fecha_nacimiento: Date,
  ciudad: String,
  direccion: String,
  telefono: String,
  email: String (unique)
}
```

### Materia
```javascript
{
  nombre: String,
  codigo: String (unique),
  descripcion: String,
  creditos: Number (1-10)
}
```

### Matrícula
```javascript
{
  codigo: String (unique),
  descripcion: String,
  creditos: Number,
  materia: ObjectId (ref: Materia),
  estudiante: ObjectId (ref: Estudiante)
}
```

---

## 🔐 Autenticación

Todas las rutas excepto `/api/auth/registrar` y `/api/auth/login` requieren autenticación mediante JWT.

Para acceder a rutas protegidas, incluir el token en el header:
```
Authorization: Bearer {tu_token_jwt}
```

---

## ⚠️ Manejo de Errores

El sistema maneja los siguientes tipos de errores:

- **400 Bad Request**: Datos de entrada inválidos
- **401 Unauthorized**: No autorizado o token inválido
- **404 Not Found**: Recurso no encontrado
- **500 Internal Server Error**: Error del servidor

Ejemplo de respuesta de error:
```json
{
  "mensaje": "Error al crear el estudiante",
  "error": "Detalles del error..."
}
```

---

## 🧪 Validaciones

Todas las rutas de creación y actualización incluyen validaciones:

- Campos obligatorios
- Formato de email válido
- Longitud mínima de campos
- Valores numéricos en rangos válidos
- IDs de MongoDB válidos
- Unicidad de códigos y cédulas

---

## 📝 Notas

- Los códigos de materia y matrícula se convierten automáticamente a MAYÚSCULAS
- Las contraseñas se hashean usando bcryptjs antes de guardarse
- Los tokens JWT expiran según la configuración en `.env`
- Las relaciones en matrículas usan `populate()` para mostrar datos completos

---

## 👨‍💻 Desarrollo

```bash
# Iniciar el servidor
npm start
```
