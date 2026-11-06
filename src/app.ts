import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as yaml from 'yamljs';
import * as path from 'path';
import { ProductController } from './application/controllers/ProductController';
import { ProductService } from './application/services/ProductService';
import { ProductRepository } from './infrastructure/repositories/ProductRepository';
import { errorHandler } from './application/middlewares/errorHandler';
import { successResponse, errorResponse } from './utils/response';
import { ValidationException } from './domain/exceptions/ValidationException';
import { ProductNotFoundException } from './domain/exceptions/ProductNotFoundException';
import { DuplicateProductException } from './domain/exceptions/DuplicateProductException';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateProductValidator, UpdateProductValidator, StockUpdateValidator } from './domain/validators/ProductValidator';

dotenv.config();

export class App {
  public app: Express;
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
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID', 'X-Correlation-ID'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      credentials: true,
      maxAge: 86400,
    }));

    this.app.use(express.json({ 
      limit: '10mb',
      strict: true,
    }));
    
    this.app.use(express.urlencoded({ 
      extended: true, 
      limit: '10mb',
      parameterLimit: 1000,
    }));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      const requestId = req.headers['x-request-id'] || req.headers['x-correlation-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      (req as any).requestId = requestId;
      
      res.on('finish', () => {
        const duration = Date.now() - start;
        const logLevel = duration > 500 ? 'WARN' : 'INFO';
        console.log(`[${logLevel}] ${requestId} ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
        
        if (duration > 500) {
          console.warn(`[PERFORMANCE] Slow request detected: ${req.method} ${req.path} took ${duration}ms (threshold: 500ms)`);
        }
      });
      
      next();
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path === '/health' || req.path.startsWith('/api-docs')) {
        return next();
      }
      console.log(`[REQUEST] ${req.method} ${req.path} from ${req.ip} - RequestID: ${(req as any).requestId}`);
      next();
    });

    this.initializeSwagger();
  }

  private initializeSwagger(): void {
    const swaggerPath = path.resolve(process.cwd(), 'swagger.yaml');
    
    try {
      const swaggerDocument = yaml.load(swaggerPath) as object;
      
      if (swaggerDocument) {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
          customCss: `
            .swagger-ui .topbar { display: none }
            .swagger-ui .info { margin: 30px 0 }
            .swagger-ui .scheme-container { padding: 20px 0 }
          `,
          customSiteTitle: 'Fintech Product Catalog API - Documentación',
          customfavIcon: '/favicon.ico',
          swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: 'list',
            filter: true,
            showExtensions: true,
            showCommonExtensions: true,
            operationsSorter: 'alpha',
            tagsSorter: 'alpha',
            tryItOutEnabled: true,
          },
        }));

        this.app.get('/api-docs.json', (req: Request, res: Response) => {
          res.setHeader('Content-Type', 'application/json');
          res.json(swaggerDocument);
        });

        this.app.get('/api-docs.yaml', (req: Request, res: Response) => {
          res.setHeader('Content-Type', 'text/yaml');
          res.send(yaml.stringify(swaggerDocument));
        });

        console.log('[SWAGGER] Documentation loaded successfully at /api-docs');
      }
    } catch (error) {
      console.warn('[SWAGGER] Could not load swagger.yaml - documentation endpoints will not be available');
      console.warn('[SWAGGER] Error:', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private initializeRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        requestId: (req as any).requestId,
      });
    });

    this.app.get('/', (req: Request, res: Response) => {
      res.redirect('/api-docs');
    });

    const productRouter = express.Router();

    productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { page, limit, sortBy, sortOrder, category, status, minPrice, maxPrice, search, available } = req.query;
        
        const pageNum = page ? parseInt(page as string, 10) : 1;
        const limitNum = limit ? parseInt(limit as string, 10) : 10;
        
        const filters: any = {};
        if (category) filters.category = category;
        if (status) filters.status = status;
        if (minPrice) filters.minPrice = parseFloat(minPrice as string);
        if (maxPrice) filters.maxPrice = parseFloat(maxPrice as string);
        if (search) filters.search = search;
        if (available !== undefined) filters.available = available === 'true';

        const result = await this.productController.getAll(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.productController.getById(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validator = plainToInstance(CreateProductValidator, req.body);
        const errors = await validate(validator);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(err => 
            Object.values(err.constraints || {}).join(', ')
          );
          throw new ValidationException('Validation failed', errorMessages);
        }

        const existingProduct = await this.productRepository.findByName(req.body.name);
        if (existingProduct) {
          throw new DuplicateProductException(req.body.name);
        }

        await this.productController.create(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validator = plainToInstance(UpdateProductValidator, req.body);
        const errors = await validate(validator);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(err => 
            Object.values(err.constraints || {}).join(', ')
          );
          throw new ValidationException('Validation failed', errorMessages);
        }

        await this.productController.update(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.productController.delete(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    productRouter.patch('/:id/stock', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validator = plainToInstance(StockUpdateValidator, req.body);
        const errors = await validate(validator);
        
        if (errors.length > 0) {
          const errorMessages = errors.map(err => 
            Object.values(err.constraints || {}).join(', ')
          );
          throw new ValidationException('Validation failed', errorMessages);
        }

        await this.productController.updateStock(req, res, next);
      } catch (error) {
        next(error);
      }
    });

    this.app.use('/api/products', productRouter);

    this.app.use((req: Request, res: Response) => {
      errorResponse(res, 'Endpoint not found', [`Route ${req.method} ${req.path} not found`], 404);
    });
  }

  private initializeErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`[SERVER] Application started successfully`);
      console.log(`[SERVER] Listening on port ${this.port}`);
      console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`[SERVER] Health check: http://localhost:${this.port}/health`);
      console.log(`[SERVER] API Documentation: http://localhost:${this.port}/api-docs`);
      console.log(`[CONFIG] Max requests/minute: 10000`);
      console.log(`[CONFIG] Max latency: 500ms`);
    });
  }
}

const application = new App();
application.start();