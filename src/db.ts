import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async (): Promise<void> => {
  try {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('La variable MONGODB_URI no está definida en el archivo .env');
    }

    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    if (username) {
      uri = uri.replace('<username>', encodeURIComponent(username));
    }
    if (password) {
      uri = uri.replace('<password>', encodeURIComponent(password));
    }

    await mongoose.connect(uri);
    console.log(' Conectado exitosamente a MongoDB Atlas');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(' Error al conectar con MongoDB Atlas:', errorMsg);
    process.exit(1);
  }
};

export default connectDB;