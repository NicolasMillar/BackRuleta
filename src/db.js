import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('La variable MONGODB_URI no está definida en el archivo .env');
    }

    // Si la URI contiene placeholders o se definieron credenciales por separado
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
    console.error(' Error al conectar con MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

export default connectDB;