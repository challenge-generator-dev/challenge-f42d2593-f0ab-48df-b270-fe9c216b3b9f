import 'reflect-metadata';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import { AppModule } from './app.module';
import { connectDatabase } from './config/database';
import { errorHandler } from './application/middlewares/errorHandler';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  credentials: true,
  maxAge: 86400,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

const swaggerDocument = yaml.load('./swagger.yaml') as object;

if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Fintech Product Catalog API',
    customfavIcon: '/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      showExtensions: true,
      showCommonExtensions: true,
    },
  }));

  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.json(swaggerDocument);
  });
}

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  });
});

app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

const appModule = new AppModule();
appModule.app = app;
appModule.initializeRoutes();
app.use(errorHandler);

async function bootstrap(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fintech-products';
    await connectDatabase(mongoUri);
    console.log('[BOOTSTRAP] Database connected successfully');

    app.listen(PORT, () => {
      console.log(`[SERVER] Running on http://localhost:${PORT}`);
      console.log(`[SERVER] Swagger UI available at http://localhost:${PORT}/api-docs`);
      console.log(`[SERVER] Health check at http://localhost:${PORT}/health`);
      console.log(`[CONFIG] Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`[CONFIG] Max requests per minute: 10000`);
      console.log(`[CONFIG] Max latency: 500ms`);
    });
  } catch (error) {
    console.error('[BOOTSTRAP] Failed to start application:', error);
    process.exit(1);
  }
}

bootstrap();

process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error: Error) => {
  console.error('[FATAL] Uncaught Exception:', error);
  process.exit(1);
});