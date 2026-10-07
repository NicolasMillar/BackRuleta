import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db.js';
import { routes } from './routes.js';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Registrar rutas
routes.forEach((route) => {
  route.routes('/api/', app);
});

// Conectar a la base de datos e iniciar servidor
const startServer = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();

export default app;