import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import Yaml from 'yamljs';
import path from 'path';
import { ProductController } from './application/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductRepository } from './infrastructure/repositories/ProductRepository';
import { errorHandler } from './application/middlewares/errorHandler';
import { validateRequest } from './application/middlewares/validateRequest';

dotenv.config();

export class AppModule {
  private app: Application;
  private productController: ProductController;
  private productService: ProductService;
  private productRepository: ProductRepository;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
    
    this.productRepository = new ProductRepository();
    this.productService = new ProductService(this.productRepository);
    this.productController = new ProductController(this.productService);
    
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
      credentials: true,
      maxAge: 86400
    }));
    
    this.app.use((req: Request, res: Response, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${req.method}] ${req.path} - ${res.statusCode} - ${duration}ms`);
      });
      next();
    });
  }

  private setupRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    this.app.get('/api', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Fintech Product Catalog API',
        version: '1.0.0',
        endpoints: [
          'GET /api/products',
          'GET /api/products/:id',
          'POST /api/products',
          'PUT /api/products/:id',
          'DELETE /api/products/:id',
          'PATCH /api/products/:id/stock'
        ]
      });
    });

    this.app.use('/api/products', validateRequest, this.productController.getAll);
    this.app.use('/api/products', validateRequest, this.productController.getById);
    this.app.use('/api/products', validateRequest, this.productController.create);
    this.app.use('/api/products', validateRequest, this.productController.update);
    this.app.use('/api/products', validateRequest, this.productController.delete);
    this.app.use('/api/products', validateRequest, this.productController.updateStock);

    this.setupSwagger();

    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        errors: [`El endpoint ${req.method} ${req.path} no existe`],
        timestamp: new Date().toISOString()
      });
    });
  }

  private setupSwagger(): void {
    try {
      const swaggerPath = path.join(__dirname, '..', 'docs', 'swagger.yaml');
      const swaggerDocument = Yaml.load(swaggerPath);
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      console.log('Swagger configurado en /api-docs');
    } catch (error) {
      console.log('Swagger no configurado: archivo swagger.yaml no encontrado');
    }
  }

  private setupErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public getApp(): Application {
    return this.app;
  }

  public getPort(): number {
    return this.port;
  }
}