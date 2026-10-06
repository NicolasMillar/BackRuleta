import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db.js';

const app = express();
const PORT: number | string = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Servidor backend en TypeScript corriendo correctamente' });
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