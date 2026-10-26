# Backend Ruleta (TypeScript)

API REST desarrollada con **Node.js 20.11.1**, **Express**, **CORS**, **MongoDB Atlas** y **TypeScript**, implementada bajo una arquitectura limpia y modular.

---

## 🛠️ Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo (recarga automática)
npm run dev

# Compilar proyecto a JavaScript (dist/)
npm run build

# Iniciar en producción
npm start
```

---

## 🔐 Variables de Entorno (.env)

Crear un archivo `.env` en la raíz con las siguientes variables:

```env
PORT=3001
MONGODB_USERNAME=tu_usuario
MONGODB_PASSWORD=tu_contraseña
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/ruleta?retryWrites=true&w=majority
```

---

## 📡 Endpoints de la API

### 1. Obtener todos los participantes
- **Método**: `GET`
- **Ruta**: `/api/participants`
- **Body**: *No requiere*
- **Respuesta**: Lista de todos los participantes con sus victorias.

---

### 2. Crear un nuevo participante
- **Método**: `POST`
- **Ruta**: `/api/participants`
- **Body**:
  ```json
  {
    "name": "Nico"
  }
  ```
- **Descripción**: Crea un participante con `wins: 0` por defecto.

---

### 3. Actualizar el nombre de un participante
- **Método**: `PUT`
- **Ruta**: `/api/participants/:name` *(ejemplo: `/api/participants/Nico`)*
- **Body**:
  ```json
  {
    "newName": "Nicolas"
  }
  ```
- **Descripción**: Modifica únicamente el nombre del participante buscado por `:name`.

---

### 4. Registrar victoria diaria (con Middleware)
- **Método**: `POST`
- **Ruta**: `/api/participants/win`
- **Body**:
  ```json
  {
    "name": "Nicolas"
  }
  ```
- **Descripción**: 
  - Interceptado por `DailyWinnerMiddleware`.
  - Si ya existe un ganador para el día de hoy, rechaza con `409 Conflict`.
  - Si no existe ganador hoy, crea un nuevo registro con fecha en el historial diario (`daily-winner`) y suma `+1` a las victorias del participante.

---

### 5. Obtener historial de ganadores diarios (para Calendario o Gráfico)
- **Método**: `GET`
- **Ruta**: `/api/daily-winner`
- **Body**: *No requiere*
- **Respuesta**: Lista de todos los ganadores históricos ordenados de más reciente a más antiguo:
  ```json
  [
    {
      "_id": "671da...",
      "name": "Nicolas",
      "date": "2026-10-26T22:15:00.000Z",
      "createdAt": "2026-10-26T22:15:00.000Z",
      "updatedAt": "2026-10-26T22:15:00.000Z"
    }
  ]
  ```

---

### 6. Obtener último ganador diario
- **Método**: `GET`
- **Ruta**: `/api/daily-winner/latest`
- **Body**: *No requiere*
- **Respuesta**: El documento del último ganador registrado o `null` si no hay registros.

---

### 7. Reiniciar victorias y ganadores (Reset con Middleware)
- **Método**: `POST`
- **Ruta**: `/api/participants/reset`
- **Body**: *No requiere*
- **Descripción**:
  - Interceptado por `ResetMiddleware`.
  - Valida que exista al menos un participante con victorias y un registro en el historial de ganadores diarios.
  - Elimina todos los registros de ganadores diarios y restablece todas las victorias de los participantes a `0`.

---

### 8. Eliminar un participante
- **Método**: `DELETE`
- **Ruta**: `/api/participants/:name` *(ejemplo: `/api/participants/Nicolas`)*
- **Body**: *No requiere*
- **Descripción**: Elimina permanentemente al participante de la base de datos por su nombre.

---

## ☁️ Despliegue en Render

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **MongoDB Atlas**: En la sección *Network Access*, agregar `0.0.0.0/0` (*Allow Access From Anywhere*) para permitir conexiones desde los servidores de Render.

- **MongoDB Atlas**: En la sección *Network Access*, agregar `0.0.0.0/0` (*Allow Access From Anywhere*) para permitir conexiones desde los servidores de Render.
