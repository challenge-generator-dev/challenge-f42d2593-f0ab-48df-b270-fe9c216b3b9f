import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationException } from '../../domain/exceptions/ValidationException';
import { DuplicateProductException } from '../../domain/exceptions/DuplicateProductException';
import { ProductNotFoundException } from '../../domain/exceptions/ProductNotFoundException';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${err.message}`);
  console.error('[STACK]', err.stack);

  if (err instanceof ValidationException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: 'ValidationError',
        message: err.message,
        details: err.errors,
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err instanceof DuplicateProductException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: 'DuplicateProductError',
        message: err.message,
        details: err.errors,
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err instanceof ProductNotFoundException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: 'ProductNotFoundError',
        message: err.message,
        details: err.errors,
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: {
        type: 'AuthenticationError',
        message: 'Token de autenticación inválido o expirado',
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err.name === 'CastError' && err.message.includes('ObjectId')) {
    res.status(400).json({
      success: false,
      error: {
        type: 'InvalidIdError',
        message: 'El formato del ID proporcionado no es válido',
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  if (err.code === 11000 || err.code === 11001) {
    res.status(409).json({
      success: false,
      error: {
        type: 'ConflictError',
        message: 'Conflicto de datos: el recurso ya existe',
        timestamp: new Date().toISOString()
      }
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      type: 'InternalServerError',
      message: process.env.NODE_ENV === 'production' 
        ? 'Error interno del servidor' 
        : err.message,
      timestamp: new Date().toISOString()
    }
  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      type: 'NotFoundError',
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
      timestamp: new Date().toISOString()
    }
  });
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[REQUEST] ${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
    );
  });
  
  next();
};