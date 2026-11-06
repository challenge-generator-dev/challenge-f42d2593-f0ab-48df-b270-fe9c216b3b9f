import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export interface DatabaseConfig {
  uri: string;
  options: mongoose.ConnectOptions;
}

export const databaseConfig: DatabaseConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fintech-products',
  options: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  },
};

let isConnected = false;
let connectionAttempts = 0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 3000;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    console.log('Ya existe una conexión activa a MongoDB');
    return mongoose;
  }

  try {
    console.log(`Intentando conectar a MongoDB: ${databaseConfig.uri}`);
    
    await mongoose.connect(databaseConfig.uri, databaseConfig.options);
    
    isConnected = true;
    connectionAttempts = 0;
    
    console.log('Conexión a MongoDB establecida correctamente');
    setupConnectionHandlers();
    
    return mongoose;
  } catch (error) {
    connectionAttempts++;
    console.error(`Error al conectar a MongoDB (intento ${connectionAttempts}/${MAX_RETRY_ATTEMPTS}):`, error);
    
    if (connectionAttempts < MAX_RETRY_ATTEMPTS) {
      console.log(`Reintentando en ${RETRY_DELAY_MS}ms...`);
      await sleep(RETRY_DELAY_MS);
      return connectToDatabase();
    }
    
    console.error('Se agotaron los intentos de conexión. La aplicación continuará sin conexión a la base de datos.');
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!isConnected) {
    console.log('No hay conexión activa a MongoDB para cerrar');
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Conexión a MongoDB cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar la conexión a MongoDB:', error);
    throw error;
  }
}

export function getConnectionStatus(): { isConnected: boolean; readyState: string } {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  } as const;
  
  return {
    isConnected,
    readyState: states[mongoose.connection.readyState] || 'unknown',
  };
}

function setupConnectionHandlers(): void {
  mongoose.connection.on('connected', () => {
    console.log('Evento: MongoDB conectado');
    isConnected = true;
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Evento: MongoDB desconectado');
    isConnected = false;
  });

  mongoose.connection.on('error', (err) => {
    console.error('Evento: Error en MongoDB:', err);
  });

  mongoose.connection.on('reconnected', () => {
    console.log('Evento: MongoDB reconectado');
    isConnected = true;
  });

  mongoose.connection.on('close', () => {
    console.log('Evento: Conexión a MongoDB cerrada');
    isConnected = false;
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isDatabaseConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

export const mongooseInstance = mongoose;